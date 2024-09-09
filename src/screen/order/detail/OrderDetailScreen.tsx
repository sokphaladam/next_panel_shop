'use client';
import React, { useCallback, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Frame,
  IndexTable,
  Layout,
  Loading,
  Page,
  Text,
  Thumbnail,
  Modal as Modals,
  TextField,
  Icon,
} from '@shopify/polaris';
import {
  StatusOrder,
  StatusOrderItem,
  useChangeOrderStatusMutation,
  useMarkOrderItemStatusMutation,
  useOrderQuery,
  useOrderSubscriptSubscription,
} from '@/gql/graphql';
import {
  InfoIcon,
  CheckCircleIcon,
  ClipboardCheckFilledIcon,
  XCircleIcon,
  DeleteIcon,
  StatusActiveIcon,
} from '@shopify/polaris-icons';
import { useCustomToast } from '@/components/custom/CustomToast';
import { Modal } from '@/hook/modal';
import { useSetting } from '@/service/useSettingProvider';
import { PrintOrder } from '../components/PrintOrder';
import { SignatureOrder } from '../components/SignatureOrder';
import { DeliveryPickup } from '../components/DeliveryPickup';
import { PrintOrderToKitchen } from '../components/PrintOrderToKitchen';
import moment from 'moment';
import { FormCheckout } from '../components/FormCheckout';
import { PolarisProductPickerAddCart } from '@/components/polaris/PolarisProductPickerAddCart';
import { ControllChangeQty } from './ControllChangeQty';
import { ControllPerson } from './ControllPerson';
import { useParams } from 'next/navigation';

const toneStatus: any = {
  [StatusOrder.Pending]: 'attention-strong',
  [StatusOrder.Verify]: 'info-strong',
  [StatusOrder.Delivery]: 'success',
  [StatusOrder.Checkout]: 'success-strong',
  [StatusOrder.Cancelled]: 'critical-strong',
};

const toneIcon: any = {
  [StatusOrder.Pending]: InfoIcon,
  [StatusOrder.Verify]: CheckCircleIcon,
  [StatusOrder.Delivery]: StatusActiveIcon,
  [StatusOrder.Checkout]: ClipboardCheckFilledIcon,
  [StatusOrder.Cancelled]: XCircleIcon,
};

export function OrderDetailScreen() {
  const params = useParams<{ id: string }>();
  const local = process.browser
    ? localStorage.getItem('invoice')
      ? JSON.parse(localStorage.getItem('invoice') || '')
      : { date: moment(new Date()).format('YYYY-MM-DD'), count: 1 }
    : { date: moment(new Date()).format('YYYY-MM-DD'), count: 1 };
  const [invoice, setInvoice] = useState(
    new Date(local.date).getTime() === new Date(moment(new Date()).format('YYYY-MM-DD')).getTime()
      ? local
      : { date: moment(new Date()).format('YYYY-MM-DD'), count: 1 },
  );
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [paid, setPaid] = useState(false);
  const setting = useSetting();
  const [reasonInput, setReasonInput] = useState('');
  const toggelOpen = useCallback(() => setOpen(!open), [open]);
  const toggleActive = useCallback(() => setActive(!active), [active]);
  const togglePaid = useCallback(() => setPaid(!paid), [paid]);

  const { data, loading, refetch } = useOrderQuery({
    variables: {
      orderId: Number(params.id),
    },
  });
  const [mark] = useMarkOrderItemStatusMutation();
  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (res.data.data?.orderSubscript.status === 2 || !!res.data.data?.orderSubscript.uuid) {
        refetch();
      }
    },
  });

  const handleUpdate = useCallback(
    (status: StatusOrder) => {
      toggelOpen();
      if (status === StatusOrder.Cancelled) {
        toggleActive();
        return;
      }
      if (status === StatusOrder.Checkout) {
        togglePaid();
        return;
      } else {
        Modal.dialog({
          title: 'Confirmation',
          body: [
            <div key={1}>
              You are select order <b>#{data?.order?.id}</b> to <b>{status.toLowerCase()}</b>.
            </div>,
          ],
          buttons: [
            { title: 'No' },
            {
              title: 'Yes',
              class: 'primary',
              onPress: () => {
                change({
                  variables: {
                    data: {
                      orderId: Number(data?.order?.id),
                      status,
                    },
                  },
                })
                  .then((res) => {
                    if (res.data?.changeOrderStatus) {
                      setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                    } else {
                      setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                    }
                  })
                  .catch(() => {
                    setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                  });
              },
            },
          ],
        });
      }
    },
    [change, data?.order?.id, setToasts, toasts, toggelOpen, toggleActive, togglePaid],
  );

  if (loading) {
    <Page title="Order Detail">
      <Frame>
        <Loading />
      </Frame>
    </Page>;
  }

  const total = data?.order?.items?.reduce((a: any, b: any) => {
    const dis_price = Number(b.price) * (Number(b.discount) / 100);
    const amount = Number(b.qty) * (Number(b.price) - dis_price);
    return (a = a + amount);
  }, 0);

  const vatPer = setting.find((f) => f.option === 'TAX')?.value;
  const lastUpdate = data?.order?.log?.find((f) => f?.text === 'Last Updated')?.date;

  return (
    <Page
      title={`Order Detail #${params.id}`}
      subtitle={
        data?.order?.status === StatusOrder.Checkout && Number(data?.order?.paid || 0)
          ? ((
              <div className="flex flex-row gap-2">
                <Badge tone="success-strong">{(<small>PAID</small>) as any}</Badge>
                {data.order.bankType && (
                  <Badge tone="info-strong">{(<small>{data.order.bankType}</small>) as any}</Badge>
                )}
              </div>
            ) as any)
          : ''
      }
    >
      {/* Cancel */}
      <Modals
        open={active}
        onClose={toggleActive}
        title={`Cancel Order #${data?.order?.id}`}
        primaryAction={{
          content: 'Yes',
          onAction: () => {
            if (!reasonInput) {
              setToasts([...toasts, { content: 'Please input the reason!', status: 'error' }]);
              return;
            }
            change({
              variables: {
                data: {
                  orderId: Number(data?.order?.id),
                  status: StatusOrder.Cancelled,
                  reason: reasonInput,
                },
              },
            })
              .then((res) => {
                if (res.data?.changeOrderStatus) {
                  setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                  setReasonInput('');
                  toggleActive();
                } else {
                  setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
                }
              })
              .catch(() => {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
              });
          },
        }}
      >
        <Modals.Section>
          <TextField
            autoComplete="off"
            label="Why do you want to cancel the order?"
            multiline={5}
            placeholder="Please give me a reason..."
            value={reasonInput}
            onChange={setReasonInput}
            requiredIndicator
          />
        </Modals.Section>
      </Modals>
      {/* Checkout */}
      <FormCheckout
        data={data?.order || {}}
        open={paid}
        setOpen={setPaid}
        invoice={invoice}
        setInvoice={setInvoice}
        total={total}
      />
      <Layout>
        <Layout.Section variant="oneHalf">
          <Card padding={'0'}>
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <PrintOrder order={data?.order} subtotal={total} vat={vatPer + ''} total={total} />
                    {/* <PrintOrder order={data?.order} subtotal={total} vat={vat + ''} total={totalAfterVat} kitchen /> */}
                    <PrintOrderToKitchen order={data?.order} />
                    <SignatureOrder order={data?.order || {}} size="micro" />
                  </div>
                  <div className="flex flex-row gap-4">
                    {data?.order?.status === StatusOrder.Verify && (
                      <Button
                        onClick={() => handleUpdate(StatusOrder.Pending)}
                        size="micro"
                        tone="success"
                        variant="primary"
                      >
                        Pending
                      </Button>
                    )}
                    {data?.order?.status === StatusOrder.Pending && (
                      <Button
                        onClick={() => handleUpdate(StatusOrder.Verify)}
                        size="micro"
                        tone="success"
                        variant="primary"
                      >
                        Verify
                      </Button>
                    )}
                    {data?.order?.status === StatusOrder.Verify && (
                      <Button
                        size="micro"
                        tone="success"
                        variant="primary"
                        onClick={() => handleUpdate(StatusOrder.Delivery)}
                      >
                        Deliver
                      </Button>
                    )}
                    {[StatusOrder.Delivery, StatusOrder.Checkout].includes(data?.order?.status as any) &&
                      Number(data?.order?.paid || 0) <= 0 && (
                        <Button
                          size="micro"
                          tone="success"
                          variant="primary"
                          onClick={() => handleUpdate(StatusOrder.Checkout)}
                        >
                          Checkout
                        </Button>
                      )}
                    <Button
                      size="micro"
                      tone="critical"
                      variant="primary"
                      onClick={() => handleUpdate(StatusOrder.Cancelled)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <b>
                    <small>{data?.order?.uuid || ''}</small>
                  </b>
                  <b className="mb-2">
                    <small>
                      TABLE: {data?.order?.set} (#{data?.order?.code})
                    </small>
                  </b>
                  <Badge tone={toneStatus[data?.order?.status || '']} size="small">
                    {
                      (
                        <small className="flex flex-row justify-between items-center p-1">
                          <div className="mr-1">
                            <Icon source={toneIcon[data?.order?.status || '']} />
                          </div>
                          {data?.order?.status === 'DELIVERY' ? 'Deliver' : data?.order?.status || ''}
                        </small>
                      ) as any
                    }
                  </Badge>
                </div>
              </div>
            </Box>
            <Divider />
            <Box>
              <IndexTable
                headings={[
                  { title: '#' },
                  { title: 'Info' },
                  { title: 'Price' },
                  { title: 'Amount' },
                  { title: '' },
                  { title: '' },
                ]}
                itemCount={data?.order?.items?.length || 1}
                selectable={false}
              >
                <IndexTable.Row position={-1} id="New">
                  <IndexTable.Cell colSpan={6}>
                    <PolarisProductPickerAddCart refetch={refetch} order={data?.order || {}} />
                  </IndexTable.Cell>
                </IndexTable.Row>
                {data?.order?.items?.map((item, index) => {
                  const priceAfterDis = Number(item?.price) - (Number(item?.price) * Number(item?.discount)) / 100;
                  return (
                    <React.Fragment key={index}>
                      <IndexTable.Row position={index} id={item?.id + ''}>
                        <IndexTable.Cell>{index + 1}</IndexTable.Cell>
                        <IndexTable.Cell>
                          <div className="flex flex-row gap-2">
                            <Thumbnail alt="" source={item?.product?.images + ''} size="small" />
                            <div className="flex flex-col justify-between">
                              <Text as="p" variant="bodySm" truncate>
                                {item?.product?.title}{' '}
                                <small>
                                  <strong>({item?.status})</strong>
                                </small>
                              </Text>
                              <div className="flex flex-row">
                                <Text as="strong" variant="bodySm" tone="base">
                                  {item?.sku?.name} x{item?.qty}
                                </Text>
                              </div>
                              <div>
                                <small className="text-pink-700">
                                  From last updated ({moment(new Date(lastUpdate as any)).fromNow(true)})
                                </small>
                              </div>
                            </div>
                          </div>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as="strong" variant="bodySm">
                            ${priceAfterDis.toFixed(2)}
                          </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as="strong" variant="bodySm" fontWeight="bold" tone="success">
                            ${(priceAfterDis * Number(item?.qty)).toFixed(2)}
                          </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <ControllChangeQty item={item || {}} />
                        </IndexTable.Cell>
                        {[StatusOrderItem.Pending, StatusOrderItem.Making, StatusOrderItem.Completed].includes(
                          item?.status as any,
                        ) && (
                          <IndexTable.Cell>
                            <div className="flex flex-col items-center">
                              <Button
                                size="slim"
                                variant="primary"
                                tone="critical"
                                onClick={() => {
                                  Modal.dialog({
                                    title: 'Confirmation',
                                    body: [
                                      <div key={1}>{'Are you sure to remove this item: ' + item?.product?.title}</div>,
                                    ],
                                    buttons: [
                                      {
                                        title: 'Yes',
                                        onPress: () => {
                                          mark({
                                            variables: {
                                              markOrderItemStatusId: Number(item?.id),
                                              status: StatusOrderItem.Deleted,
                                            },
                                          });
                                        },
                                      },
                                    ],
                                  });
                                }}
                              >
                                {(<Icon source={DeleteIcon} />) as any}
                              </Button>
                              {item?.isPrint ? (
                                <div>
                                  <small className="text-pink-700">Already to kitchen</small>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </IndexTable.Cell>
                        )}
                      </IndexTable.Row>
                      {(item?.addons || item?.remark) && (
                        <IndexTable.Row position={index} id={item?.id + ''}>
                          <IndexTable.Cell></IndexTable.Cell>
                          <IndexTable.Cell colSpan={5} className="bg-yellow-200">
                            {item.addons && <div>Addon: {item.addons}</div>}
                            {item.remark && <div>Remark: {item.remark}</div>}
                          </IndexTable.Cell>
                        </IndexTable.Row>
                      )}
                    </React.Fragment>
                  );
                })}
              </IndexTable>
            </Box>
            <Divider />
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-start">
                <div>
                  <div>
                    {data?.order?.delivery && (
                      <Text as="h4" variant="bodyMd" fontWeight="bold">
                        Delivery Pickup
                      </Text>
                    )}
                  </div>
                  {data?.order?.delivery && (
                    <div className="mt-3">
                      <Text as="p" variant="bodySm" tone="base">
                        {data?.order?.delivery?.name}
                      </Text>
                      <Text as="p" variant="bodySm" tone="base">
                        #{data?.order?.deliveryCode}
                      </Text>
                    </div>
                  )}
                </div>
                <DeliveryPickup order={data?.order || {}} />
              </div>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card padding={'0'}>
            <Box>
              <IndexTable
                headings={[
                  { title: (<div className="ml-1">Description</div>) as any },
                  { title: 'Amount', alignment: 'end' },
                ]}
                itemCount={1}
                selectable={false}
              >
                <IndexTable.Row id="1" position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Item(s) Total
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {data && (
                      <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${total.toFixed(2)}
                        </Text>
                      </div>
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id="1" position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Vat.
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {data && (
                      <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ({vatPer || 0}%)
                        </Text>
                      </div>
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id="1" position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Discount
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {data && (
                      <div className="mr-1">
                        <Text as="strong" variant="bodySm" alignment="end">
                          ${((Number(data.order?.total || 0) * Number(data.order?.discount)) / 100).toFixed(2)}
                        </Text>
                      </div>
                    )}
                  </IndexTable.Cell>
                </IndexTable.Row>
                <IndexTable.Row id={'1'} position={1}>
                  <IndexTable.Cell>
                    <div className="ml-1">
                      <Text as="strong" variant="bodySm">
                        Total
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="mr-1">
                      <Text as="strong" variant="bodySm" alignment="end" tone="critical" fontWeight="bold">
                        $
                        {(
                          (total || 0) -
                          (Number(data?.order?.total || 0) * Number(data?.order?.discount)) / 100
                        ).toFixed(2)}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                </IndexTable.Row>
              </IndexTable>
            </Box>
          </Card>
          <br />
          <Card padding={'0'}>
            <Box padding={'400'}>
              <div className="flex flex-row justify-between items-center">
                <div>People in order: {data?.order?.person || 0}</div>
                <ControllPerson orderId={data?.order?.id || 0} />
              </div>
            </Box>
          </Card>
          <br />
          <Card padding={'0'}>
            <Box>
              <IndexTable
                headings={[{ title: '#' }, { title: 'Date', alignment: 'end' }]}
                itemCount={1}
                selectable={false}
              >
                {data?.order?.log?.map((x, i) => {
                  return (
                    <IndexTable.Row key={x?.text} position={i} id={x?.text + ''}>
                      <IndexTable.Cell>
                        <small>{x?.text}</small>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <div className="text-end">
                          <small>{x?.date}</small>
                          {x?.by && (
                            <div>
                              <small>({x?.by?.display})</small>
                            </div>
                          )}
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
