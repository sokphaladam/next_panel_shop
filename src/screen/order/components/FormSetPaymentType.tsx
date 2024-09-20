'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, useSetTypePaymentOrderMutation } from '@/gql/graphql';
import { BankController } from '@/screen/user/components/BankController';
import { Button, InlineGrid, Modal, Select, TextField } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  order: Order;
}

export function FormSetPaymentType(props: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [bank, setBank] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const [payment] = useSetTypePaymentOrderMutation({
    refetchQueries: ['order', 'orderList'],
  });

  useEffect(() => {
    if (loading && props.order) {
      const bank = props.order.bankType + ',' + props.order.bankId;
      setBank(bank);
      setCurrency(props.order.currency || 'USD');
      setLoading(false);
    }
  }, [loading, props.order]);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <Button size="micro" onClick={toggleOpen}>
      Set Type Payment
    </Button>
  );

  const handleSaveTypePayment = useCallback(() => {
    if (!bank || bank.split(',').length === 1) {
      setToasts([...toasts, { content: 'Please select type bank', status: 'error' }]);
      return;
    }

    payment({
      variables: {
        setTypePaymentOrderId: Number(props.order.id),
        bankId: Number(bank.split(',')[1]),
        bankType: String(bank.split(',')[0]),
        currency: currency,
      },
    })
      .then((res) => {
        if (res.data?.setTypePaymentOrder) {
          setToasts([...toasts, { content: 'Update type payment was success.', status: 'success' }]);
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
  }, [bank, currency, payment, props.order.id, setToasts, toasts]);

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      title="Type Payment"
      activator={activator}
      primaryAction={{
        content: 'Save',
        onAction: handleSaveTypePayment,
      }}
    >
      <Modal.Section>
        <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'200'}>
          <BankController value={bank} onChange={setBank} needId />
          <Select
            label="Currency"
            options={[
              { label: 'USD', value: 'USD' },
              { label: 'KHR', value: 'KHR' },
            ]}
            value={currency}
            onChange={setCurrency}
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
