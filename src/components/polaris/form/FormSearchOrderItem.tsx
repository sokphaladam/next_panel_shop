'use client';
import { useOrderItemLazyQuery, useOrderItemQuery } from '@/gql/graphql';
import { PrintForKitchen } from '@/screen/order/components/PrintForKitchen';
import { PrintOrderToKitchen } from '@/screen/order/components/PrintOrderToKitchen';
import { Button, Icon, Modal, TextField } from '@shopify/polaris';
import { LabelPrinterIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import react, { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export function FormSearchOrderItem(props: Props) {
  const [searchInput, setSearchInput] = useState('');
  const contentToPrint = useRef(null);
  const [query, { loading, data }] = useOrderItemLazyQuery();

  const handleSearch = useCallback(() => {
    query({
      variables: {
        orderItemId: Number(searchInput || 0),
      },
    });
  }, [query, searchInput]);

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)} title="Search Order item">
      <Modal.Section>
        <div
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleSearch();
            }
          }}
        >
          <TextField
            value={searchInput}
            onChange={setSearchInput}
            label=""
            labelHidden
            placeholder="Input code number scan from QR code"
            autoComplete="off"
            loading={loading}
            disabled={loading}
            type="number"
            connectedRight={
              <Button size="micro" onClick={handleSearch}>
                Search
              </Button>
            }
          />
        </div>
      </Modal.Section>
      {data && (
        <Modal.Section>
          <div
            className="text-center p-1"
            style={{ width: '80mm', color: 'black', fontSize: '11pt' }}
            ref={contentToPrint}
          >
            <div className="flex flex-col text-left">
              <div>តុលេខ៖ {data?.orderItem.order.set}</div>
              <div>----------------------------------</div>
              <div>កាលបរិច្ឆេទ៖ {moment(data?.orderItem.order.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div>----------------------------------</div>
              <div>
                ទំនិញ៖ {data?.orderItem.product.title} ({data?.orderItem.sku.name}) X{data?.orderItem.item.qty}
              </div>
              <div>----------------------------------</div>
              <div>បន្ថែម៖ {data?.orderItem.item.addons}</div>
              <div>----------------------------------</div>
              <div>ចំណាំ {data?.orderItem.item.remark}</div>
            </div>
          </div>
        </Modal.Section>
      )}
      {data && (
        <Modal.Section>
          <Button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            {(<Icon source={LabelPrinterIcon} />) as any}
          </Button>
        </Modal.Section>
      )}
    </Modal>
  );
}
