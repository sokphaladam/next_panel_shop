/* eslint-disable @next/next/no-img-element */
'use client';
import { Order } from '@/gql/graphql';
import { Button, Modal, Text } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
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
}

function formatKHR(value: number) {
  const formatter = new Intl.NumberFormat('km-Kh', {
    style: 'currency',
    currency: 'KHR',
    currencySign: 'standard',
    currencyDisplay: 'narrowSymbol',
  });

  return formatter.format(value);
}

export function PrintOrder(props: Props) {
  const user = useUser();
  const contentToPrint = useRef(null);
  const setting = useSetting();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const handlePrint = useReactToPrint({
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

  const created_date = props.order ? props.order?.log?.find((f) => f?.text === 'Created')?.date : '';
  const last_date = props.order ? props.order?.log?.find((f) => f?.text === 'Last Updated')?.date : '';
  const verify_date = props.order ? props.order?.log?.find((f) => f?.text === 'Verifed')?.by?.display : '';
  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value;
  const vat = setting.find((f) => f.option === 'TAX')?.value;
  const discount = (Number(props.order?.total || 0) * Number(props.order?.discount)) / 100;
  const signature = props.order ? props.order?.log?.find((f) => f?.text === 'Signature')?.by?.display : '';

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
    >
      <Modal.Section flush>
        <div className="flex flex-row justify-center relative overflow-x-hidden">
          <div className='text-center font-["Lato"] p-1' style={{ width: '80mm', color: 'black' }} ref={contentToPrint}>
            <div className="w-full flex flex-row justify-center">
              <img
                src={config_app.public.assets.logo}
                alt=""
                style={{ width: 'auto', height: 35, objectFit: 'contain' }}
              />
            </div>
            <br />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start">
                <p className="flex flex-row items-center justify-end">
                  <div className="w-[45px] text-left">Invoice</div>
                  <div className="mx-1">:</div>
                  <div className="text-end">#{String(props.order?.invoice).padStart(5, '0')}</div>
                </p>
                <p className="flex flex-row items-center justify-end">
                  <div className="w-[45px] text-left">Table</div>
                  <div className="mx-1">:</div>
                  <div className="text-end">
                    {props.order?.set} ({props.order?.person || 0} P)
                  </div>
                </p>
                <p className="flex flex-row items-center justify-between">
                  <div className="w-[45px] text-left">Cashier</div>
                  <div className="mx-1">:</div>
                  <div className="text-end">{user?.display || ''}</div>
                </p>

                <p className="flex flex-row items-center justify-between">
                  <div className="w-[45px] text-left"> Paid</div>
                  <div className="mx-1">:</div>
                  <div className="text-end">{props.order?.bankType}</div>
                </p>
              </div>
              <div>
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
              <table id="print_table">
                <thead>
                  {props.kitchen ? (
                    <tr>
                      <th>Item</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Addons</th>
                      <th className="text-right">Note</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Item</th>
                      <th className="text-right">Qty</th>
                      <th className="text-left">Price</th>
                      <th className="!text-center">Dis</th>
                      <th className="!text-right">Amount</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {props.order?.items?.map((x, i) => {
                    const disPrice = Number(x?.price) * (Number(x?.discount) / 100);
                    const amount = Number(x?.qty) * (Number(x?.price) - Number(disPrice));
                    if (props.kitchen) {
                      return (
                        <tr key={i}>
                          <td className="text-start">
                            {i + 1}. {x?.product?.title} ({x?.sku?.name})
                          </td>
                          <td className="!text-center">{x?.qty}</td>
                          <td className="text-right">{x?.addons}</td>
                          <td className="text-right">{x?.remark}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={i}>
                        <td className="text-start">
                          {i + 1}. {x?.product?.title}
                        </td>
                        <td className="!text-center">{x?.qty}</td>
                        <td className="text-left">${x?.price?.toFixed(2)}</td>
                        <td className="text-left">
                          {x?.discount
                            ? `$${disPrice.toFixed(2)} (${x?.discount?.toFixed(2)}%)`
                            : `${x?.discount?.toFixed(2)}%`}
                        </td>
                        <td className="text-right">${amount.toFixed(2)}</td>
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
                              <div className="h-8">Discount</div>
                            </>
                          )}
                          <div className="h-8">TOTAL</div>
                          <div className="h-8">VAT (Include.)</div>
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
                              <div className="h-8">
                                {formatKHR(Math.round(Number(exchangeRate) * Number(discount)))}
                              </div>
                            </>
                          )}
                          <div className="font-bold h-8" style={{ marginLeft: '20%' }}>
                            {formatKHR(
                              Math.round(
                                Number(exchangeRate) * Number(props.total) - Number(exchangeRate) * Number(discount),
                              ),
                            )}
                          </div>
                          <div className="h-8"></div>
                          {signature && <div className="h-8"></div>}
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
                          <div className="h-8">${(Number(props.total) - Number(discount)).toFixed(2)}</div>
                          <div className="h-8">$({vat}%)</div>
                          {signature && <div className="h-8">{signature || ''}</div>}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div></div>
            </div>
            {!props.kitchen && <div className="text-center">Thank you, see you again!</div>}
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
