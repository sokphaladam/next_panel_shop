'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { ChangeOrderInput, Order, OrderQuery, StatusOrder, useChangeOrderStatusMutation } from '@/gql/graphql';
import { BankController } from '@/screen/user/components/BankController';
import { useSetting } from '@/service/useSettingProvider';
import { Modal, Select, TextField } from '@shopify/polaris';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  data: Order;
  total: number;
  invoice: any;
  setInvoice: any;
  open: boolean;
  setOpen: (v: any) => void;
}

export function FormCheckout({ data, total, invoice, setInvoice, open, setOpen }: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [reasonInput, setReasonInput] = useState('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState('');
  const [currency, setCurrency] = useState('USD');
  const setting = useSetting();
  const togglePaid = useCallback(() => setOpen(!open), [open, setOpen]);

  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });

  useEffect(() => {
    if (total && !!loading) {
      setAmountInput(total + '');
      setLoading(false);
    }
  }, [total, loading]);

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value || '4000';

  const totalKhr = (total || 0) * Number(exchangeRate);

  return (
    <Modal
      open={open}
      onClose={togglePaid}
      title={`Checkout Order #${data?.id}`}
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

          if (currency === 'USD') {
            if (Number(amountInput) < total) {
              setToasts([...toasts, { content: 'Amount input lower', status: 'error' }]);
              return;
            }
          }

          if (currency === 'KHR') {
            if (Number(amountInput) < totalKhr) {
              setToasts([...toasts, { content: 'Amount input lower', status: 'error' }]);
              return;
            }
          }

          if (!bank || bank.split(',').length === 1) {
            setToasts([...toasts, { content: 'Please select type bank', status: 'error' }]);
            return;
          }

          const input: ChangeOrderInput = {
            orderId: Number(data?.id),
            status: StatusOrder.Checkout,
            reason: reasonInput || '',
            amount:
              currency === 'USD'
                ? String(Number(amount).toFixed(2))
                : String((Number(amountInput) / Number(exchangeRate)).toFixed(2)),
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
            Exchange Rate: <span className="pl-2">$1 = ៛{exchangeRate}</span>
            <br />
            Total:{' '}
            <span className="pl-2">
              {currency === 'USD' ? '$' + (total || 0).toFixed(2) : '៛' + (totalKhr || 0).toFixed(2)}
            </span>
            <br />
            Paid:{' '}
            <span className="pl-2">
              {currency === 'USD' ? '$' : '៛'}
              {Number(amountInput || total).toFixed(2)}
            </span>
            <br />
            Return to customer:{' '}
            <span className="pl-2">
              {currency === 'USD'
                ? '$' + (Number(amountInput || total) - Number(total))
                : '៛' + (Number(amountInput) - Number(totalKhr))}
            </span>
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
          value={amountInput}
          onChange={setAmountInput}
          label="Amount cutomer paid"
          placeholder="Please input amount of customer are paid for order here"
          requiredIndicator
          prefix={currency === 'USD' ? '$' : '៛'}
          error={
            currency === 'USD'
              ? Number(amountInput) < total
                ? 'Amount input lower.'
                : ''
              : Number(amountInput) < totalKhr
              ? 'Amount input lower.'
              : ''
          }
          selectTextOnFocus
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
