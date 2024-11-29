/* eslint-disable @next/next/no-img-element */
'use client';
import { Order, OrderItem } from '@/gql/graphql';
import { Button, Modal, Text } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.css';
import { useSetting } from '@/service/useSettingProvider';
import { useReactToPrint } from 'react-to-print';
import { config_app } from '@/lib/config_app';
import { useUser } from '@/service/UserProvider';

interface Props {
  order?: Order | null;
  subtotal?: string;
  vat?: string;
  total?: string;
  kitchen?: boolean;
  firstCall?: boolean;
}

export function formatKHR(value: number) {
  const formatter = new Intl.NumberFormat('km-Kh', {
    style: 'currency',
    currency: 'KHR',
    currencySign: 'standard',
    currencyDisplay: 'narrowSymbol',
  });

  return formatter.format(value);
}

export function PrintOrder(props: Props) {
  const contentToPrint = useRef(null);
  const contentToPrintx2 = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  useEffect(() => {
    if (!!props.firstCall) {
      setOpen(true);
    }
  }, [props.firstCall]);

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  const handlePrintx2 = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  const activator = (
    <Button size="micro" onClick={toggleOpen}>
      {props.kitchen ? 'Print to Kitchen' : 'Print Recipt'}
    </Button>
  );

  // console.log('customer paid ======>', props.order?.customerPaid);
  // console.log('total after discount ======>', totalAfterDiscount);

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      activator={activator}
      title={props.kitchen ? 'Print to Kitchen' : 'Print Recipt'}
      size="small"
      primaryAction={{
        content: 'Print',
        onAction: () => {
          handlePrint(null, () => contentToPrint.current);
        },
      }}
      secondaryActions={[
        {
          content: 'Print X2',
          onAction: () => {
            handlePrint(null, () => contentToPrintx2.current);
          },
        },
      ]}
    >
      <Modal.Section flush>
        <div className="flex flex-row justify-center relative overflow-x-hidden">
          <div ref={contentToPrint}>
            <DispalyInvoice {...props} />
          </div>
        </div>
        <div className="flex flex-row justify-center relative overflow-x-hidden hidden">
          <div ref={contentToPrintx2}>
            <div>
              <div className="pagebreak">
                <DispalyInvoice {...props} />
              </div>
              <div className="pagebreak">
                <DispalyInvoice {...props} />
              </div>
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}

export function DispalyInvoice(props: Props) {
  const user = useUser();
  const setting = useSetting();

  const created_date = props.order ? props.order?.log?.find((f) => f?.text === 'Created')?.date : '';
  const last_date = props.order ? props.order?.log?.find((f) => f?.text === 'Last Updated')?.date : '';
  const verify_date = props.order ? props.order?.log?.find((f) => f?.text === 'Verifed')?.by?.display : '';
  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value;
  const vat = setting.find((f) => f.option === 'TAX')?.value;
  const discount = (Number(props.total || 0) * Number(props.order?.discount)) / 100;
  const signature = props.order ? props.order?.log?.find((f) => f?.text === 'Signature')?.by?.display : '';
  const totalAfterDiscount = Number((Number(props.total) - Number(discount)).toFixed(2));

  let groups: OrderItem[] = [];

  for (const x of props.order?.items || []) {
    const find = groups.findIndex((f) => {
      return (
        f.sku?.id === x?.sku?.id && f.addons?.trim() === x?.addons?.trim() && f.remark?.trim() === x?.remark?.trim()
      );
    });
    if (find >= 0) {
      groups[find].qty = Number(groups[find].qty || 0) + (x?.qty || 0);
      if (groups[find].addons) {
        const currentAdd: any = groups[find].addons?.split('x');
        const newAdd: any = x?.addons?.split('x');
        const v = Number((currentAdd[1] || '').split(')')[0]) + Number(newAdd[1].split(')')[0]);
        groups[find].addons = `${currentAdd[0]} x${v})`;
      }
    } else {
      groups.push({
        ...x,
      });
    }
  }
  return (
    <div
      className="text-center noto-sans-khmer p-1"
      style={{ width: '80mm', color: 'black' }}
      // ref={contentToPrint}
    >
      <div className="w-full flex flex-row justify-center">
        <img src={config_app.public.assets.logo} alt="" style={{ width: 'auto', height: 35, objectFit: 'contain' }} />
      </div>
      <br />
      {/* <div className="yellowtail-regular absolute top-1/2 left-1/2 -rotate-45 -translate-x-1/2 -translate-y-1/2 scale-150 text-[50pt]">
        {signature || ''}
      </div> */}
      <div className="flex flex-row justify-between gap-1">
        <div className="flex flex-col items-start">
          <p className="flex flex-row items-center justify-end">
            <div className="w-[45px] text-left">Invoice</div>
            <div className="mx-1">:</div>
            <div className="text-end">#{String(props.order?.invoice).padStart(5, '0')}</div>
          </p>
          <p className="flex flex-row items-center justify-end">
            <div className="w-[45px] text-left">Order</div>
            <div className="mx-1">:</div>
            <div className="text-end overflow-hidden text-nowrap max-w-[100px]">{verify_date}</div>
          </p>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[45px] text-left">Cashier</div>
            <div className="mx-1">:</div>
            <div className="text-end overflow-hidden text-nowrap text-ellipsis max-w-[100px]">
              {user?.display || ''}
            </div>
          </p>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[45px] text-left"> Paid</div>
            <div className="mx-1">:</div>
            <div className="text-end">{props.order?.bankType}</div>
          </p>
        </div>
        <div>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[25px] text-left">Table</div>
            <div className="mx-2​">:</div>
            <div className="w-[90px] text-right">
              {props.order?.set} ({props.order?.person || 0} P)
            </div>
          </p>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[25px] text-left">In</div>
            <div className="mx-2">:</div>
            <div className="w-[90px] text-right">{moment(new Date(created_date + '')).format('LTS')}</div>
          </p>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[25px] text-left">Out</div>
            <div className="mx-2">:</div>
            <div className="w-[90px] text-end">{moment(new Date(last_date + '')).format('LTS')}</div>
          </p>
          <p className="flex flex-row items-center justify-between">
            <div className="w-[25px] text-left">Date</div>
            <div className="mx-2">:</div>
            <div className="w-[90px] text-end">{moment(new Date(created_date + '')).format('DD-MMM-YYYY')}</div>
          </p>
          {props.order?.delivery && (
            <p className="flex flex-row items-center justify-between">
              <div className="w-[25px] text-left">Delivery</div>
              <div className="mx-2">:</div>
              <div className="w-[90px] text-end">
                {props.order?.delivery.name} ({props.order?.deliveryCode})
              </div>
            </p>
          )}
        </div>
      </div>
      <div>
        <table id="print_table" className="mt-3">
          <thead>
            <tr className="border-solid border-black border-x border-y-0">
              <th>Item</th>
              <th className="text-right">Qty</th>
              <th className="text-left">Price</th>
              <th className="!text-center">Dis</th>
              <th className="!text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((x, i) => {
              const disPrice = Number(x?.price) * (Number(x?.discount) / 100);
              const amount = Number(x?.qty) * (Number(x?.price) - Number(disPrice));
              return (
                <tr key={i} className="border-solid border-black border-x">
                  <td className="text-start flex flex-row !border-y-0">
                    <div className="w-[10px]">{i + 1}</div>
                    <div className="w-[5px]">.</div>
                    <div>
                      {x?.product?.title} ({x?.sku?.name})
                      {x?.addons && (
                        <>
                          <br />
                          <span>បន្ថែម: {x.addons}</span>
                        </>
                      )}
                      {x?.remark && (
                        <>
                          <br />
                          <span>Remark: {x.remark}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="!text-center !border-y-0">{x?.qty}</td>
                  <td className="text-left !border-y-0">${x?.price?.toFixed(2)}</td>
                  <td className="text-left !border-y-0">
                    {x?.discount
                      ? `$${disPrice.toFixed(2)} (${x?.discount?.toFixed(2)}%)`
                      : `${x?.discount?.toFixed(2)}%`}
                  </td>
                  <td className="text-right !border-y-0">${amount.toFixed(2)}</td>
                </tr>
              );
            })}
            {!props.kitchen && (
              <tr>
                <td colSpan={2} className="text-right border-none">
                  <div className="flex flex-col justify-between">
                    {discount > 0 && (
                      <>
                        <div className="h-8">Sub Total</div>
                        <div className="h-8">Discount ({props.order?.discount?.toFixed(2)}%)</div>
                      </>
                    )}
                    <div className="h-8">TOTAL</div>
                    <div className="h-8">VAT (Included)</div>
                    <div className="h-8">Recevied</div>
                    <div className="h-8">Return to Customer</div>
                    {signature && <div className="h-8">Signature</div>}
                  </div>
                </td>
                <td colSpan={2} suppressHydrationWarning className="text-right border-none">
                  <div className="flex flex-col justify-between">
                    {discount > 0 && (
                      <>
                        <div className="h-8">
                          {formatKHR(Math.round(Number(exchangeRate) * Number(props.subtotal)))}
                        </div>
                        <div className="h-8">{formatKHR(Math.round(Number(exchangeRate) * Number(discount)))}</div>
                      </>
                    )}
                    <div className="font-bold h-8" style={{ marginLeft: '20%' }}>
                      {formatKHR(Math.round(Number(exchangeRate) * totalAfterDiscount))}
                    </div>
                    <div className="h-8"></div>
                    <div className="h-8">
                      {formatKHR(Math.round(Number(exchangeRate) * Number(props.order?.customerPaid)))}
                    </div>
                    <div className="h-8">
                      {Number(props.order?.customerPaid) > 0
                        ? formatKHR(
                            Math.round(Number(exchangeRate) * (Number(props.order?.customerPaid) - totalAfterDiscount)),
                          )
                        : 0}
                    </div>
                    {signature && (
                      <div className="h-8">
                        {/* <div className="yellowtail-regular text-[12pt]">{signature || ''}</div> */}
                      </div>
                    )}
                  </div>
                </td>
                <td className="text-right border-none">
                  <div className="flex flex-col justify-between">
                    {/* <div className="h-8">${Number(props.subtotal).toFixed(2)}</div> */}
                    {discount > 0 && (
                      <>
                        <div className="h-8">${Number(props.total).toFixed(2)}</div>
                        <div className="h-8">${Number(discount).toFixed(2)}</div>
                      </>
                    )}
                    <div className="h-8">${totalAfterDiscount.toFixed(2)}</div>
                    <div className="h-8">$({vat}%)</div>
                    <div className="h-8">${Number(props.order?.customerPaid).toFixed(2)}</div>
                    <div className="h-8">
                      $
                      {Number(props.order?.customerPaid) > 0
                        ? (Number(props.order?.customerPaid) - totalAfterDiscount).toFixed(2)
                        : 0}
                    </div>
                    {signature && <div className="h-8">{signature || ''}</div>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div></div>
      </div>
      <div className="text-center">Contact us: 093988143</div>
      {!props.kitchen && <div className="text-center">Thank you, see you again!</div>}
    </div>
  );
}
