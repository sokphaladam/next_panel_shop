/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
'use client';
import { Order, OrderItem } from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { useSetting } from '@/service/useSettingProvider';
import { useRef, useState } from 'react';
import { formatKHR } from './PrintOrder';
import { config_app } from '@/lib/config_app';
import moment from 'moment';
import { QRcode } from '@/components/QRcode';

interface Props {
  order?: Order | null;
  subtotal?: string;
  vat?: string;
  total?: string;
  kitchen?: boolean;
  firstCall?: boolean;
}

export function PrintV2(props: Props) {
  const user = useUser();
  const setting = useSetting();
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState('');

  const verify_date = props.order ? props.order?.log?.find((f) => f?.text === 'Verifed')?.by?.display : '';
  const created_date = props.order ? props.order?.log?.find((f) => f?.text === 'Created')?.date : '';
  const last_date = props.order ? props.order?.log?.find((f) => f?.text === 'Last Updated')?.date : '';
  const discount = (Number(props.total || 0) * Number(props.order?.discount)) / 100;
  const signature = props.order ? props.order?.log?.find((f) => f?.text === 'Signature')?.by?.display : '';
  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value;
  const totalAfterDiscount = Number((Number(props.total) - Number(discount)).toFixed(2));
  const vat = setting.find((f) => f.option === 'TAX')?.value;

  const onPrintClicked = () => {
    if (ref.current && iframeRef.current) {
      setDoc(
        `<div>` + ref.current.innerHTML + '</div><script>window.print(); /*' + Math.random().toString() + '*/</script>',
      );
    }
  };

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
    <>
      <button onClick={onPrintClicked} className="bg-indigo-800 p-1 text-white rounded-md max-h-[24px] text-[0.75rem]">
        Print Recipt(Beta)
      </button>
      <div
        style={{
          position: 'fixed',
          backgroundColor: '#fff',
          top: -1000,
          left: -1000,
          width: 1,
          height: 1,
          // top: 100,
          // left: 300,
        }}
      >
        <div ref={ref}>
          <link type="text/css" rel="stylesheet" href="/printing.css" />
          <div className="noto-sans-khmer" style={{ width: '100%', color: 'black' }}>
            <div
              style={{
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <img
                src={config_app.public.assets.logo}
                alt=""
                style={{ width: 'auto', height: 35, objectFit: 'contain' }}
              />
            </div>
            <br />
            <div className="info-grid">
              <div className="info-block-left">
                <div className="display">
                  <div>Invoice</div>
                  <div>:</div>
                  <div>#{String(props.order?.invoice).padStart(5, '0')}</div>
                </div>
                <div className="display">
                  <div>Order</div>
                  <div>:</div>
                  <div>{verify_date}</div>
                </div>
                <div className="display">
                  <div>Cashier</div>
                  <div>:</div>
                  <div>{user?.display || ''}</div>
                </div>
                <div className="display">
                  <div> Paid</div>
                  <div>:</div>
                  <div>{props.order?.bankType}</div>
                </div>
              </div>
              <div>
                <div className="display-right">
                  <div>Table</div>
                  <div>:</div>
                  <div>
                    {props.order?.set} ({props.order?.person || 0} P)
                  </div>
                </div>
                <div className="display-right">
                  <div>In</div>
                  <div>:</div>
                  <div>{moment(new Date(created_date + '')).format('LTS')}</div>
                </div>
                <div className="display-right">
                  <div>Out</div>
                  <div>:</div>
                  <div>{moment(new Date(last_date + '')).format('LTS')}</div>
                </div>
                <div className="display-right">
                  <div>Date</div>
                  <div>:</div>
                  <div>{moment(new Date(created_date + '')).format('DD-MMM-YYYY')}</div>
                </div>
                {props.order?.delivery && (
                  <div className="display-right">
                    <div>Delivery</div>
                    <div>:</div>
                    <div>
                      {props.order?.delivery.name} ({props.order?.deliveryCode})
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <table className="print_table">
                <thead>
                  <tr className="border_header">
                    <th>Item</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                    <th style={{ textAlign: 'left' }}>Price</th>
                    <th style={{ textAlign: 'center' }}>Dis</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((x, i) => {
                    const disPrice = Number(x?.price) * (Number(x?.discount) / 100);
                    const amount = Number(x?.qty) * (Number(x?.price) - Number(disPrice));
                    return (
                      <tr
                        key={i}
                        className="border_x"
                        style={
                          i === groups.length - 1
                            ? {
                                borderBottomWidth: 1,
                              }
                            : {}
                        }
                      >
                        <td
                          style={{ textAlign: 'start', display: 'flex', flexDirection: 'row' }}
                          // className="text-start flex flex-row !border-y-0"
                        >
                          <div className="w-[10px]" style={{ width: 10 }}>
                            {i + 1}
                          </div>
                          <div className="w-[5px]" style={{ width: 5 }}>
                            .
                          </div>
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
                        <td
                          style={{ textAlign: 'center', borderTopWidth: 0, borderBottomWidth: 0 }}
                          // className="!text-center !border-y-0"
                        >
                          {x?.qty}
                        </td>
                        <td
                          style={{ textAlign: 'left', borderTopWidth: 0, borderBottomWidth: 0 }}
                          // className="text-left !border-y-0"
                        >
                          ${x?.price?.toFixed(2)}
                        </td>
                        <td
                          style={{ textAlign: 'left', borderTopWidth: 0, borderBottomWidth: 0 }}
                          // className="text-left !border-y-0"
                        >
                          {x?.discount
                            ? `$${disPrice.toFixed(2)} (${x?.discount?.toFixed(2)}%)`
                            : `${x?.discount?.toFixed(2)}%`}
                        </td>
                        <td
                          style={{ textAlign: 'right', borderTopWidth: 0, borderBottomWidth: 0 }}
                          // className="text-right !border-y-0"
                        >
                          ${amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td
                      colSpan={2}
                      style={{ textAlign: 'right', border: 'none' }}
                      // className="text-right border-none"
                    >
                      <div className="display-sub">
                        {discount > 0 && (
                          <>
                            <div style={{ height: '2rem' }}>Sub Total</div>
                            <div style={{ height: '2rem' }}>Discount ({props.order?.discount?.toFixed(2)}%)</div>
                          </>
                        )}
                        <div style={{ height: '2rem' }}>TOTAL</div>
                        <div style={{ height: '2rem' }}>VAT (Included)</div>
                        <div style={{ height: '2rem' }}>Recevied</div>
                        <div style={{ height: '2rem' }}>Return to Customer</div>
                        {signature && <div style={{ height: '2rem' }}>Signature</div>}
                      </div>
                    </td>
                    <td colSpan={2} suppressHydrationWarning style={{ textAlign: 'right', border: 'none' }}>
                      <div className="display-sub">
                        {discount > 0 && (
                          <>
                            <div style={{ height: '2rem' }}>
                              {formatKHR(Math.round(Number(exchangeRate) * Number(props.subtotal)))}
                            </div>
                            <div style={{ height: '2rem' }}>
                              {formatKHR(Math.round(Number(exchangeRate) * Number(discount)))}
                            </div>
                          </>
                        )}
                        <div style={{ marginLeft: '20%', height: '2rem', fontWeight: 'bold' }}>
                          {formatKHR(Math.round(Number(exchangeRate) * totalAfterDiscount))}
                        </div>
                        <div style={{ height: '2rem' }}></div>
                        <div style={{ height: '2rem' }}>
                          {formatKHR(Math.round(Number(exchangeRate) * Number(props.order?.customerPaid)))}
                        </div>
                        <div style={{ height: '2rem' }}>
                          {Number(props.order?.customerPaid) > 0
                            ? formatKHR(
                                Math.round(
                                  Number(exchangeRate) * (Number(props.order?.customerPaid) - totalAfterDiscount),
                                ),
                              )
                            : 0}
                        </div>
                        {signature && (
                          <div style={{ height: '2rem' }}>
                            {/* <div className="yellowtail-regular text-[12pt]">{signature || ''}</div> */}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', border: 'none' }}>
                      <div className="display-sub">
                        {/* <div className="h-8">${Number(props.subtotal).toFixed(2)}</div> */}
                        {discount > 0 && (
                          <>
                            <div style={{ height: '2rem' }}>${Number(props.total).toFixed(2)}</div>
                            <div style={{ height: '2rem' }}>${Number(discount).toFixed(2)}</div>
                          </>
                        )}
                        <div style={{ height: '2rem' }}>${totalAfterDiscount.toFixed(2)}</div>
                        <div style={{ height: '2rem' }}>$({vat}%)</div>
                        <div style={{ height: '2rem' }}>${Number(props.order?.customerPaid).toFixed(2)}</div>
                        <div style={{ height: '2rem' }}>
                          $
                          {Number(props.order?.customerPaid) > 0
                            ? (Number(props.order?.customerPaid) - totalAfterDiscount).toFixed(2)
                            : 0}
                        </div>
                        {signature && <div style={{ height: '2rem' }}>{signature || ''}</div>}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div></div>
            </div>
            {/* <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <QRcode value={`https://app.mood.international/?token=${props.order?.set}@${props.order?.uuid}`} />
            </div> */}
            <div style={{ textAlign: 'center' }}>Contact us: 093988143</div>
            {!props.kitchen && <div style={{ textAlign: 'center' }}>Thank you, see you again!</div>}
          </div>
        </div>
      </div>
      <iframe
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          left: -1000,
          top: -1000,
        }}
        srcDoc={doc}
        ref={iframeRef}
      ></iframe>
    </>
  );
}
