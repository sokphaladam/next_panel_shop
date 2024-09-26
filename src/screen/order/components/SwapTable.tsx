import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, useSwapOrderTableMutation, useTableSetListQuery } from '@/gql/graphql';
import { Button, Modal, Select } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

interface Props {
  order: Order;
}

export function SwapTable(props: Props) {
  const [select, setSelect] = useState('');
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const { data, loading, refetch } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  const [swap] = useSwapOrderTableMutation({
    refetchQueries: ['order', 'orderList', 'tableSetList'],
  });

  const toggleActive = useCallback(() => setOpen(!open), [open]);

  const handleSave = useCallback(() => {
    swap({
      variables: {
        orderId: Number(props.order.id),
        table: String(select),
      },
    })
      .then((res) => {
        if (res.data?.swapOrderTable) {
          setToasts([...toasts, { content: 'Swap table was success.', status: 'success' }]);
          setTimeout(() => {
            process.browser && window.location.reload();
          }, 500);
        } else {
          setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
      });
  }, [props, select, setToasts, swap, toasts]);

  const activator = (
    <b className="bg-emerald-500 text-white p-1 rounded-md cursor-pointer" onClick={toggleActive}>
      <small>TABLE: {props.order?.set}</small>
    </b>
  );

  return (
    <Modal
      open={open}
      onClose={toggleActive}
      title={`Swap Table ${props.order.set}`}
      activator={activator}
      primaryAction={{ content: 'Save', onAction: handleSave }}
    >
      <Modal.Section>
        <Select
          label="Table"
          options={
            data
              ? [
                  { label: 'Select Table', value: '' },
                  ...(data?.tableSetList
                    ?.filter((x) => !x?.order)
                    .map((x) => {
                      return {
                        label: x?.set + '',
                        value: x?.set + '',
                      };
                    }) || []),
                ]
              : []
          }
          value={select}
          onChange={setSelect}
          disabled={loading}
        />
      </Modal.Section>
    </Modal>
  );
}
