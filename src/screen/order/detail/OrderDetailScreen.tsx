'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
  Tabs,
  TabProps,
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
  MetaobjectReferenceIcon,
  LabelPrinterIcon,
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
import Image from 'next/image';
import { useUser } from '@/service/UserProvider';
import { PrintForKitchen } from '../components/PrintForKitchen';
import { DiscountOrder } from '../components/DiscountOrder';
import { useToggle } from '@/service/ToggleProvider';
import { useWindowSize } from '@/hook/useWindowSize';
import { FormSetPaymentType } from '../components/FormSetPaymentType';

const tabs: TabProps[] = [
  {
    content: 'New Order',
    id: '0',
  },
  {
    content: 'Order History',
    id: '1',
  },
];

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

export default function OrderDetailScreen() {
  const user = useUser();
  const { setOpen: setToggle } = useToggle();
  const [select, setSelect] = useState(0);
  const { width, height } = useWindowSize();
  const params = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<any>();
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

  useEffect(() => {
    if ((width || 0) < 1000 && (width || 0) > 770) {
      setToggle(false);
    }
    return () => {
      setToggle(true);
    };
  }, [setToggle, width]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('invoice');
      if (local) {
        const inv = JSON.parse(local);
        if (moment(new Date(inv.date)).date() === moment(new Date()).date()) {
          setInvoice(inv);
        } else {
          setInvoice({ date: moment(new Date()).format('YYYY-MM-DD'), count: 1 });
        }
      } else {
        setInvoice({ date: moment(new Date()).format('YYYY-MM-DD'), count: 1 });
      }
    }
  }, []);

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

  if (loading || typeof window === 'undefined') {
    <Page title="Order Detail">
      <Frame>
        <Loading />
      </Frame>
    </Page>;
  }

  const total =
    Number(data?.order?.total || 0) > 0
      ? Number(data?.order?.total)
      : data?.order?.items?.reduce((a: any, b: any) => {
          const dis_price = Number(b.price) * (Number(b.discount) / 100);
          const amount = Number(b.qty) * (Number(b.price) - dis_price);
          return (a = a + amount);
        }, 0);

  const vatPer = setting.find((f) => f.option === 'TAX')?.value;
  const lastUpdate = data?.order?.log?.find((f) => f?.text === 'Last Updated')?.date;
  const orderItems = data?.order?.items?.filter((f: any) => f.status === 'PENDING').length || 0;
  const orderHistory = data?.order?.items?.filter((f: any) => f.status !== 'PENDING').length || 0;

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
      fullWidth
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
      {invoice && (
        <FormCheckout
          data={data?.order || {}}
          open={paid}
          setOpen={setPaid}
          invoice={invoice}
          setInvoice={setInvoice}
          total={Number((total - (total * Number(data?.order?.discount)) / 100).toFixed(2))}
        />
      )}
      <Layout>
        <Layout.Section variant="oneThird">
          <Card padding={'0'}>
            <Box padding={'0'}>
              <PolarisProductPickerAddCart type="LAYOUT" refetch={refetch} order={data?.order || {}} />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant={(width || 0) > 600 && (width || 0) < 770 ? 'oneThird' : 'oneHalf'}>
          <Card padding={'0'}>
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <PrintOrder order={data?.order} subtotal={total} vat={vatPer + ''} total={total} />
                    {/* <PrintOrder order={data?.order} subtotal={total} vat={vat + ''} total={totalAfterVat} kitchen /> */}
                    {/* <PrintOrderToKitchen order={data?.order} /> */}
                    <SignatureOrder order={data?.order || {}} size="micro" />
                  </div>
                  <div className="flex flex-row gap-4">
                    {/* {data?.order?.status === StatusOrder.Verify && (
                      <Button
                        onClick={() => handleUpdate(StatusOrder.Pending)}
                        size="micro"
                        tone="success"
                        variant="primary"
                      >
                        Pending
                      </Button>
                    )} */}
                    {(data?.order?.status === StatusOrder.Pending || orderItems > 0) && (
                      <Button
                        onClick={() => handleUpdate(StatusOrder.Verify)}
                        size="micro"
                        tone="success"
                        variant="primary"
                        disabled={data?.order?.items?.length === 0}
                      >
                        Send to kitchen
                      </Button>
                    )}
                    {[StatusOrder.Delivery, StatusOrder.Checkout, StatusOrder.Verify].includes(
                      data?.order?.status as any,
                    ) &&
                      Number(data?.order?.paid || 0) <= 0 && (
                        <Button
                          size="micro"
                          tone="success"
                          variant="primary"
                          onClick={() => handleUpdate(StatusOrder.Checkout)}
                          disabled={![1, 2, 6].includes(user?.role?.id || 0)}
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
                  <b className="bg-emerald-500 text-white p-1 rounded-md">
                    <small>TABLE: {data?.order?.set}</small>
                  </b>
                  <b className="mb-2">
                    <small>{data?.order?.uuid || ''}</small>
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
            <Box padding={'300'}>
              <div className="flex flex-row justify-between items-start">
                <div></div>
                <DiscountOrder total={total} data={data?.order || {}} />
              </div>
            </Box>
            <Divider />
            <Box>
              <div
                className="overflow-x-auto scroll-smooth snap-y snap-mandatory"
                style={{ height: (height || 0) / 1.9 }}
              >
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
                    <IndexTable.Cell colSpan={6} flush>
                      <div>
                        <Tabs
                          tabs={tabs.map((x) => {
                            return {
                              ...x,
                              content: `${x.content} ${x.id === '0' ? `(${orderItems})` : `(${orderHistory})`}`,
                            };
                          })}
                          selected={select}
                          onSelect={setSelect}
                        />
                      </div>
                      {/* <PolarisProductPickerAddCart refetch={refetch} order={data?.order || {}} /> */}
                    </IndexTable.Cell>
                  </IndexTable.Row>
                  {data?.order?.items
                    ?.filter((f: any) =>
                      select === 1
                        ? !![StatusOrderItem.Completed, StatusOrderItem.Making].includes(f.status)
                        : ![StatusOrderItem.Completed, StatusOrderItem.Making].includes(f.status),
                    )
                    .map((item, index) => {
                      const priceAfterDis = Number(item?.price) - (Number(item?.price) * Number(item?.discount)) / 100;
                      return (
                        <React.Fragment key={index}>
                          <IndexTable.Row position={index} id={item?.id + ''}>
                            <IndexTable.Cell>{index + 1}</IndexTable.Cell>
                            <IndexTable.Cell>
                              <div className="flex flex-row gap-2">
                                <Image
                                  alt=""
                                  src={item?.sku?.image || item?.product?.images || ''}
                                  width={40}
                                  height={40}
                                  objectFit="contain"
                                  style={{ width: 40, borderRadius: 5, maxHeight: 40, objectFit: 'cover' }}
                                  loading="lazy"
                                />
                                {/* <Thumbnail alt="" source={item?.product?.images + ''} size="small" /> */}
                                <div className="flex flex-col justify-between">
                                  <Text as="p" variant="bodySm" truncate>
                                    {item?.product?.title} {/* <small> */}
                                    <strong>({item?.sku?.name})</strong>
                                    {/* </small> */}
                                  </Text>
                                  <div className="flex flex-row">
                                    <Text as="strong" variant="bodySm" tone="base">
                                      {item?.status} x{item?.qty}
                                    </Text>
                                  </div>
                                  <div>
                                    <small className="text-pink-700">
                                      From last updated ({moment(new Date(item?.createdDate as any)).fromNow(true)})
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
                                  <div className="flex flex-row items-center gap-1">
                                    <div>
                                      <Button
                                        size="slim"
                                        variant="primary"
                                        tone="critical"
                                        disabled={
                                          ![1, 2, 6].includes(user?.role?.id || 0) &&
                                          item?.status !== StatusOrderItem.Pending
                                        }
                                        onClick={() => {
                                          Modal.dialog({
                                            title: 'Confirmation',
                                            body: [
                                              <div key={1}>
                                                {'Are you sure to remove this item: ' + item?.product?.title}
                                              </div>,
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
                                    </div>
                                    <div>
                                      <PrintForKitchen item={item || {}} order={data.order || {}} />
                                    </div>
                                  </div>
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
              </div>
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
                          ${((Number(total || 0) * Number(data.order?.discount)) / 100).toFixed(2)} (
                          {data.order?.discount?.toFixed(2)}%)
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
                        ${((total || 0) - (Number(total || 0) * Number(data?.order?.discount || 0)) / 100).toFixed(2)}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                </IndexTable.Row>
              </IndexTable>
            </Box>
          </Card>
          <br />
          {data?.order && (
            <Card padding={'0'}>
              <Box padding={'400'}>
                <div className="flex flex-row justify-between items-center">
                  <div>Payment: {data?.order?.bankType}</div>
                  <FormSetPaymentType order={data?.order || {}} />
                </div>
              </Box>
            </Card>
          )}
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
                    <IndexTable.Row key={i} position={i} id={x?.text + ''}>
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
