'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { ChangeOrderInput, OrderQuery, StatusOrder, useChangeOrderStatusMutation } from '@/gql/graphql';
import { BankController } from '@/screen/user/components/BankController';
import { useSetting } from '@/service/useSettingProvider';
import { Modal, Select, TextField } from '@shopify/polaris';
import moment from 'moment';
import { useCallback, useState } from 'react';

interface Props {
  data: OrderQuery;
  total: number;
  invoice: any;
  setInvoice: any;
}

export function FormCheckout({ data, total, invoice, setInvoice }: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [reasonInput, setReasonInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [paid, setPaid] = useState(false);
  const [bank, setBank] = useState('CASH');
  const [currency, setCurrency] = useState('USD');
  const setting = useSetting();
  const togglePaid = useCallback(() => setPaid(!paid), [paid]);

  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE');

  return (
    <Modal
      open={paid}
      onClose={togglePaid}
      title={`Checkout Order #${data?.order?.id}`}
      // secondaryActions={[
      //   {
      //     content: (<BankController hidelabel value={bank} onChange={setBank} />) as any,
      //     plain: true,
      //   },
      // ]}
      primaryAction={{
        content: 'Checkout',
        destructive: true,
        onAction: () => {
          let amount = amountInput ? Number(amountInput) : Number(total.toFixed(2));

          if (amount > Number(total.toFixed(2))) {
            amount = total;
          }

          const input: ChangeOrderInput = {
            orderId: Number(data?.order?.id),
            status: StatusOrder.Checkout,
            reason: reasonInput || '',
            amount: String(Number(amount).toFixed(2)),
            invoice: Number(invoice.count),
            bankType: String(bank.split(',')[0]),
            bankId: Number(bank.split(',')[1]),
            currency: currency,
          };

          change({
            variables: {
              data: input,
            },
          })
            .then((res) => {
              if (res.data?.changeOrderStatus) {
                setToasts([...toasts, { content: 'Update status was success.', status: 'success' }]);
                setReasonInput('');
                setAmountInput('');
                togglePaid();
                const inv = {
                  date: moment(new Date()),
                  count: Number(invoice.count) >= 50 ? 1 : Number(invoice.count) + 1,
                };
                localStorage.setItem('invoice', JSON.stringify(inv));
                setInvoice(inv);
              } else {
                setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
              }
            })
            .catch(() => {
              setToasts([...toasts, { content: 'Oop! somthing was wrong!', status: 'error' }]);
            });
        },
      }}
      footer={
        <div className="flex flex-row gap-4 items-center">
          <div className="font-bold">
            Exchange Rate: <span className="pl-2">$1 = ៛{exchangeRate?.value}</span>
            <br />
            Total: <span className="pl-2">${(total || 0).toFixed(2)}</span>
            <br />
            Paid: <span className="pl-2">${Number(amountInput || total).toFixed(2)}</span>
            <br />
            Return to customer:{' '}
            <span className="pl-2">${(Number(amountInput || total) - Number(total)).toFixed(2)}</span>
          </div>
        </div>
      }
    >
      <Modal.Section>
        <div className="flex flex-row items-center gap-2">
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
        </div>
        <br />
        <TextField
          type="number"
          autoComplete="off"
          value={amountInput || (total || 0).toFixed(2)}
          onChange={setAmountInput}
          label="Amount cutomer paid"
          placeholder="Please input amount of customer are paid for order here"
          requiredIndicator
        />
        <br />
        <TextField
          autoComplete="off"
          label="Do you have remark?"
          multiline={5}
          placeholder="comment here..."
          value={reasonInput}
          onChange={setReasonInput}
        />
      </Modal.Section>
    </Modal>
  );
}
