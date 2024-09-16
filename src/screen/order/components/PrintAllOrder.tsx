/* eslint-disable @next/next/no-img-element */
'use client';

import { StatusOrder, useOrderListQuery } from '@/gql/graphql';
import { Button, Modal } from '@shopify/polaris';
import React, { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './style.css';
import { useSetting } from '@/service/useSettingProvider';
import { config_app } from '@/lib/config_app';
import { useUser } from '@/service/UserProvider';
import moment from 'moment';

function formatKHR(value: number) {
  const formatter = new Intl.NumberFormat('km-Kh', {
    style: 'currency',
    currency: 'KHR',
    currencySign: 'standard',
    currencyDisplay: 'narrowSymbol',
  });

  return formatter.format(value);
}

export function PrintAllOrder() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const contentToPrint = useRef(null);
  const setting = useSetting();
  const { data, loading, refetch } = useOrderListQuery({
    variables: {
      offset: 0,
      limit: 10000,
      status: [StatusOrder.Checkout],
    },
  });
  const toggleOpen = useCallback(() => {
    setOpen(!open);
    refetch();
  }, [open, refetch]);

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  if (loading) {
    return <></>;
  }

  const activator = (
    <Button size="micro" onClick={toggleOpen} variant="primary">
      Print all checkout recipt
    </Button>
  );

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value;

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      activator={activator}
      title={'Print Recipt'}
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
            {data?.orderList?.map((order, index) => {
              const signature = order ? order?.log?.find((f) => f?.text === 'Signature')?.by?.display : '';
              const total = order?.items?.reduce((a: any, b: any) => {
                const dis_price = Number(b.price) * (Number(b.discount) / 100);
                const amount = Number(b.qty) * (Number(b.price) - dis_price);
                return (a = a + amount);
              }, 0);
              const created_date = order ? order?.log?.find((f) => f?.text === 'Created')?.date : '';
              const last_date = order ? order?.log?.find((f) => f?.text === 'Last Updated')?.date : '';
              const discount = (Number(order?.total || 0) * Number(order?.discount)) / 100;
              return (
                <div key={index} className="pagebreak">
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
                        <div className="text-end">#{String(order?.id).padStart(5, '0')}</div>
                      </p>
                      <p className="flex flex-row items-center justify-end">
                        <div className="w-[45px] text-left">Table</div>
                        <div className="mx-1">:</div>
                        <div className="text-end">
                          {order?.set} ({order?.person || 0} P)
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
                        <div className="text-end">{order?.bankType}</div>
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
                        <div className="w-[90px] text-end">
                          {moment(new Date(created_date + '')).format('DD-MMM-YYYY')}
                        </div>
                      </p>
                      {order?.delivery && (
                        <p className="flex flex-row items-center justify-between">
                          <div className="w-[25px] text-left">Delivery</div>
                          <div className="mx-2">:</div>
                          <div className="w-[90px] text-end">
                            {order?.delivery.name} ({order?.deliveryCode})
                          </div>
                        </p>
                      )}
                    </div>
                  </div>
                  <table id="print_table" key={index}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className="text-right">Qty</th>
                        <th className="text-left">Price</th>
                        <th className="!text-center">Dis</th>
                        <th className="!text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.items?.map((x, i) => {
                        const disPrice = Number(x?.price) * (Number(x?.discount) / 100);
                        const amount = Number(x?.qty) * (Number(x?.price) - Number(disPrice));
                        return (
                          <tr key={i}>
                            <td className="text-start">
                              {i + 1}. {x?.product?.title} ({x?.sku?.name})
                              {x?.addons && (
                                <>
                                  <br />
                                  <span className="ml-3">Addon: {x.addons}</span>
                                </>
                              )}
                              {x?.remark && (
                                <>
                                  <br />
                                  <span className="ml-3">Remark: {x.remark}</span>
                                </>
                              )}
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
                                  {/* {formatKHR(Math.round(Number(exchangeRate) * Number(props.subtotal)))} */}
                                </div>
                                <div className="h-8">
                                  {formatKHR(Math.round(Number(exchangeRate) * Number(discount)))}
                                </div>
                              </>
                            )}
                            <div className="font-bold h-8" style={{ marginLeft: '20%' }}>
                              {formatKHR(
                                Math.round(
                                  Number(exchangeRate) * Number(total) - Number(exchangeRate) * Number(discount),
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
                                <div className="h-8">${Number(total).toFixed(2)}</div>
                                <div className="h-8">${Number(discount).toFixed(2)}</div>
                              </>
                            )}
                            <div className="h-8">${(Number(total) - Number(discount)).toFixed(2)}</div>
                            <div className="h-8">$(10%)</div>
                            {signature && <div className="h-8">{signature || ''}</div>}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
