/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
'use client';
import { Shift } from '@/gql/graphql';
import { config_app } from '@/lib/config_app';
import { useSetting } from '@/service/useSettingProvider';
import { Button, Icon } from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Props {
  data: Shift;
  refBtn: any;
}

function RenderItemList({ value, text, bold }: { value: string; text: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: bold ? 'bold' : 'normal' }}>
      <div style={{ padding: 2, width: 150 }}>{text}</div>
      <div style={{ width: 50, border: 'solid black 0.1px', borderWidth: '0 0 0 0.1px' }}></div>
      <div style={{ padding: 2, width: 150, textAlign: 'right' }}>{value}</div>
    </div>
  );
}

export function PrintShift(props: Props) {
  const setting = useSetting();
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState('');
  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  const exchange = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value;
  const banks: any[] = props.data.bank || [];
  const bankTotal = banks.reduce((a, b) => (a = a + Number(b.value)), 0);
  const usd = Number(props.data.closeCurrency?.usd) - Number(props.data.openCurrency?.usd);
  const khr = (Number(props.data.closeCurrency?.khr) - Number(props.data.openCurrency?.khr)) / Number(exchange);

  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={contentToPrint} style={{ width: '70mm', color: '#000' }}>
          <div className="w-full flex flex-row justify-center">
            <img
              src={config_app.public.assets.logo}
              alt=""
              style={{ width: 'auto', height: 35, objectFit: 'contain' }}
            />
          </div>
          <br />
          <div style={{ fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
            {'Minutes of shift handover'.toUpperCase()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', color: '#000' }}>
            <small>Shift on {moment(new Date(props.data.open + '')).format('DD/MMM/YYYY')}</small>
          </div>
          <br />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 11, width: '70mm' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 100, textAlign: 'left' }}>Opening shift:</div>
              <small>{moment(new Date(props.data.open as any)).format('YYYY-MMM-DD HH:mm:ss')}</small>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 100, textAlign: 'left' }}>Closing shift:</div>
              <small>{moment(new Date(props.data.close as any)).format('YYYY-MMM-DD HH:mm:ss')}</small>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 100, textAlign: 'left' }}>Handover person:</div>
              <small>{props.data.user?.display}</small>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-2">
            <h6>HANDOVER CONTENT</h6>
          </div>
          <div style={{ borderWidth: '0.1px', border: 'solid black 0.1px', fontSize: 11 }}>
            <div style={{ padding: 2 }}>
              <strong style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>✔️ Cash</strong>
            </div>
            <hr style={{ borderColor: 'black' }} />
            <div style={{ padding: 2 }}>
              <strong>Cash (USD)</strong>
            </div>
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Opening Shift" value={props.data.openCurrency?.usd?.toFixed(2) + '$'} />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Closing Shift" value={props.data.closeCurrency?.usd?.toFixed(2) + '$'} />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Handover amount" value={props.data.closeCurrency?.usd?.toFixed(2) + '$'} bold />
            <hr style={{ borderColor: 'black' }} />
            <div style={{ padding: 2 }}>
              <strong>Cash (KHR)</strong>
            </div>
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Opening Shift" value={Number(props.data.openCurrency?.khr).toFixed(2) + ''} />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Closing Shift" value={Number(props.data.closeCurrency?.khr).toFixed(2) + ''} />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Handover amount" value={Number(props.data.closeCurrency?.khr).toFixed(2) + ''} bold />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="✔️ Credit/Debit card" value={Number(bankTotal).toFixed(2) + '$'} bold />
            <hr style={{ borderColor: 'black' }} />
            {banks.map((x) => {
              return (
                <div key={x.name}>
                  <RenderItemList value={Number(x.value).toFixed(2) + '$'} text={`${x.name}(${x.qty})`} />
                  <hr style={{ borderColor: 'black' }} />
                </div>
              );
            })}
            <RenderItemList text="✔️ Sales" value={Number(bankTotal + usd + khr).toFixed(2) + '$'} bold />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Total number of Customers" value={Number(props.data.customer || 0).toFixed(0)} bold />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Average Spending" value={Number(props.data.customerAvgCost || 0).toFixed(2) + '$'} />
            <hr style={{ borderColor: 'black' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <div style={{ padding: 2, width: 150 }}>✔️ Other</div>
            </div>
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Qty. of bills" value={props.data.bill + ''} />
            <hr style={{ borderColor: 'black' }} />
            <RenderItemList text="Qty. of card slips" value={props.data.card + ''} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, margin: '0 20px' }}>
            <div>
              <div>
                <strong>Handover person</strong>
                <div style={{ marginTop: 75 }}>{props.data.user?.display}</div>
              </div>
            </div>
            <div>
              <strong>Takeover person</strong>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: 11, margin: 10 }}>
            <strong>Manager/Head</strong>
          </div>
        </div>
      </div>
      <div style={{ display: 'block' }}>
        <div
          ref={props.refBtn}
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          {'Print Shift'}
        </div>
      </div>
    </div>
  );
}
