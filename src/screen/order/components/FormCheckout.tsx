'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { ChangeOrderInput, Order, OrderQuery, StatusOrder, useChangeOrderStatusMutation } from '@/gql/graphql';
import { BankController } from '@/screen/user/components/BankController';
import { useSetting } from '@/service/useSettingProvider';
import { InlineGrid, Modal, Select, TextField } from '@shopify/polaris';
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

function TotalStrategy(amount: number, currency: string, discount: number, discountType: string, exchange: number) {
  let valueA = amount;
  let valueB = discount || 0;

  if (currency === 'KHR') {
    valueA = amount * exchange;
  }

  if (discountType === 'VALUE') {
    return valueA - valueB;
  }

  return (valueA * (100 - valueB)) / 100;
}

export function FormCheckout({ data, total, invoice, setInvoice, open, setOpen }: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [reasonInput, setReasonInput] = useState('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [discountInput, setDiscountInput] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [typeDiscount, setTypeDiscount] = useState('VALUE');
  const setting = useSetting();
  const togglePaid = useCallback(() => setOpen(!open), [open, setOpen]);

  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value || '4000';
  const totalKhr = (total || 0) * Number(exchangeRate);

  useEffect(() => {
    if (total && !!loading && data) {
      const bank = data.bankType + ',' + data.bankId;
      setBank(bank);
      setCurrency(data.currency || 'USD');
      setAmountInput(data.currency === 'KHR' ? totalKhr + '' : total + '');
      setLoading(false);
    }
  }, [total, loading, data, totalKhr]);

  const handleChangeBank = useCallback(
    (v: any) => {
      const x = TotalStrategy(total, currency, 0, typeDiscount, Number(exchangeRate));
      setAmountInput(x.toFixed(2) + '');
      setBank(v);
      setDiscountInput('0');
    },
    [currency, exchangeRate, total, typeDiscount],
  );

  const handleChangeCurrency = useCallback(
    (v: any) => {
      const x = TotalStrategy(total, v, 0, typeDiscount, Number(exchangeRate));
      setAmountInput(x.toFixed(2) + '');
      setCurrency(v);
      setDiscountInput('0');
    },
    [exchangeRate, total, typeDiscount],
  );

  const handleChangeDiscount = useCallback(
    (v: any) => {
      const x = TotalStrategy(total, currency, Number(v || 0), typeDiscount, Number(exchangeRate));
      setAmountInput(x.toFixed(2) + '');
      setDiscountInput(v);
    },
    [currency, exchangeRate, total, typeDiscount],
  );

  const handleChangeTypeDiscount = useCallback(
    (v: any) => {
      if (v !== '') {
        const x = TotalStrategy(total, currency, 0, v, Number(exchangeRate));
        setAmountInput(x.toFixed(2) + '');
      }
      setTypeDiscount(v);
      setDiscountInput('0');
    },
    [currency, exchangeRate, total],
  );

  const xTotal = TotalStrategy(total, currency, Number(discountInput || 0), typeDiscount, Number(exchangeRate));

  const handleCheckout = useCallback(() => {
    let amount = amountInput ? Number(amountInput) : Number(total.toFixed(2));

    if (amount > Number(total.toFixed(2))) {
      amount = total;
    }

    if (currency === 'USD') {
      if (Number(amountInput) < xTotal) {
        setToasts([...toasts, { content: 'Amount input lower', status: 'error' }]);
        return;
      }
    }

    if (currency === 'KHR') {
      if (Number(amountInput) < xTotal) {
        setToasts([...toasts, { content: 'Amount input lower', status: 'error' }]);
        return;
      }
    }

    if (!bank || bank.split(',').length === 1) {
      setToasts([...toasts, { content: 'Please select type bank', status: 'error' }]);
      return;
    }

    let discount = (Number(discountInput) / total) * 100;

    if (currency === 'KHR') {
      discount = (Number(discountInput) / totalKhr) * 100;
    }

    if (typeDiscount === 'PERCENTAGE') {
      discount = Number(discountInput);
    }

    const input: ChangeOrderInput = {
      orderId: Number(data?.id),
      status: StatusOrder.Checkout,
      reason: reasonInput || '',
      amount: total.toFixed(2),
      invoice: data.invoice ? Number(data.invoice) : Number(invoice.count),
      bankType: String(bank.split(',')[0]),
      bankId: Number(bank.split(',')[1]),
      currency: currency,
      discount: Number(data.discount),
      customerPaid: currency === 'USD' ? String(amountInput) : (Number(amountInput) / Number(exchangeRate)).toFixed(2),
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
          if (!data.invoice) {
            const inv = {
              date: moment(new Date()),
              count: Number(invoice.count) + 1,
            };
            localStorage.setItem('invoice', JSON.stringify(inv));
            setInvoice(inv);
          }
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
  }, [
    amountInput,
    total,
    currency,
    bank,
    discountInput,
    typeDiscount,
    data,
    reasonInput,
    invoice,
    exchangeRate,
    change,
    xTotal,
    setToasts,
    toasts,
    totalKhr,
    togglePaid,
    setInvoice,
  ]);

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
        onAction: handleCheckout,
      }}
      footer={
        <div className="flex flex-row gap-4 items-center">
          <div className="font-bold">
            Exchange Rate: <span className="pl-2">$1 = ៛{exchangeRate}</span>
            <br />
            Total:{' '}
            <span className="pl-2">
              {currency === 'USD' ? '$' + (xTotal || 0).toFixed(2) : '៛' + (xTotal || 0).toFixed(2)}
            </span>
            <br />
            Paid:{' '}
            <span className="pl-2">
              {currency === 'USD' ? '$' : '៛'}
              {Number(amountInput || xTotal).toFixed(2)}
            </span>
            <br />
            Return to customer:{' '}
            <span className="pl-2">
              {currency === 'USD'
                ? `${'$' + (Number(amountInput || xTotal) - Number(xTotal)).toFixed(2)} = ${
                    '៛' + ((Number(amountInput) - Number(xTotal)) * Number(exchangeRate)).toFixed(2)
                  }`
                : `
                  ${'៛' + (Number(amountInput) - Number(xTotal)).toFixed(2)} = ${
                    '$' + ((Number(amountInput) - Number(xTotal)) / Number(exchangeRate)).toFixed(2)
                  }
                `}
            </span>
          </div>
        </div>
      }
    >
      <Modal.Section>
        <div className="flex flex-row items-center gap-2">
          <BankController value={bank} onChange={handleChangeBank} needId />
          <Select
            label="Currency"
            options={[
              { label: 'USD', value: 'USD' },
              { label: 'KHR', value: 'KHR' },
            ]}
            value={currency}
            onChange={handleChangeCurrency}
          />
        </div>
        <br />
        <InlineGrid columns={['oneHalf']} gap={'400'}>
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
                ? Number(amountInput) < Number(xTotal.toFixed(2))
                  ? 'Amount input lower.'
                  : ''
                : Number(amountInput) < Number(xTotal.toFixed(2))
                ? 'Amount input lower.'
                : ''
            }
            selectTextOnFocus
          />
          {/* <div>
            <TextField
              autoComplete="off"
              placeholder="Discount"
              value={discountInput}
              type="number"
              onChange={handleChangeDiscount}
              label="Discount"
              connectedRight={
                <Select
                  label
                  labelHidden
                  options={[
                    { label: '%', value: 'PERCENTAGE' },
                    { label: currency === 'USD' ? '$' : '៛', value: 'VALUE' },
                  ]}
                  value={typeDiscount}
                  onChange={handleChangeTypeDiscount}
                />
              }
            />
          </div> */}
        </InlineGrid>
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
