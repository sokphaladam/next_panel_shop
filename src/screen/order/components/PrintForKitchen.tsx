'use client';
import { Order, OrderItem } from '@/gql/graphql';
import { Button, Icon, Modal } from '@shopify/polaris';
import { LabelPrinterIcon } from '@shopify/polaris-icons';
import React, { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export function PrintForKitchen({ order, item, noPreview }: { item: OrderItem; order: Order; noPreview?: boolean }) {
  const [open, setOpen] = useState(false);
  const contentToPrint = useRef(null);
  const toggleOpen = useCallback(() => setOpen(!open), [open]);
  const activator = <Button onClick={toggleOpen}>{(<Icon source={LabelPrinterIcon} />) as any}</Button>;

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  return (
    <Modal
      title="Print for kitchen"
      open={open}
      onClose={toggleOpen}
      activator={activator}
      size="small"
      primaryAction={
        !noPreview
          ? {
              content: 'Print',
              onAction: () => {
                handlePrint(null, () => contentToPrint.current);
              },
            }
          : undefined
      }
    >
      <Modal.Section flush>
        <div className="flex flex-row justify-center relative overflow-x-hidden">
          <div
            className='text-center font-["Lato"] p-1'
            style={{ width: '80mm', color: 'black', fontSize: '11pt' }}
            ref={contentToPrint}
          >
            <div className="flex flex-col text-left">
              <div>តុលេខ៖ {order.set}</div>
              <div>---------------------</div>
              {order.delivery ? (
                <>
                  <div>
                    ដឹកជញ្ជូន៖ {order.delivery.name} ({order.deliveryCode})
                  </div>
                  <div>---------------------</div>
                </>
              ) : (
                ''
              )}
              <div>កាលបរិច្ឆេទ៖ {item.createdDate}</div>
              <div>---------------------</div>
              <div>
                ទំនិញ៖ {item.product?.title} ({item.sku?.name}) X{item.qty}
              </div>
              {item.addons ? (
                <>
                  <div>---------------------</div>
                  <div>បន្ថែម៖ {item.addons}</div>
                </>
              ) : (
                ''
              )}
              {item.remark ? (
                <>
                  <div>---------------------</div>
                  <div>ចំណាំ {item.remark}</div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
