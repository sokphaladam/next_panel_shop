'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, useAddDiscountOrderMutation } from '@/gql/graphql';
import { useSetting } from '@/service/useSettingProvider';
import { Button, Modal, Select, TextField } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';

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

interface Props {
  total: number;
  data: Order;
}

export function DiscountOrder(props: Props) {
  const setting = useSetting();
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [discountInput, setDiscountInput] = useState<string>('0');
  const [typeDiscount, setTypeDiscount] = useState('VALUE');
  const [amount, setAmount] = useState<any>(props.total);
  const [loading, setLoading] = useState(true);

  const [update] = useAddDiscountOrderMutation({
    refetchQueries: ['order', 'orderList'],
  });

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value || '4000';

  useEffect(() => {
    if (props.total && !!loading && props.data) {
      const defaultDis = Number(props.data.discount || 0);
      setAmount(props.total - (props.total * defaultDis) / 100);
      if (defaultDis > 0) {
        setDiscountInput(defaultDis + '');
        setTypeDiscount('PERCENTAGE');
      }
      setLoading(false);
    }
  }, [props, loading]);

  const handleChangeDiscount = useCallback(
    (v: any) => {
      const x = TotalStrategy(props.total, currency, Number(v || 0), typeDiscount, Number(exchangeRate));
      // setAmountInput(x.toFixed(2) + '');
      setAmount(x.toFixed(2) + '');
      setDiscountInput(v);
    },
    [currency, exchangeRate, props, typeDiscount],
  );

  const handleChangeTypeDiscount = useCallback(
    (v: any) => {
      if (v !== '') {
        const x = TotalStrategy(props.total, currency, 0, v, Number(exchangeRate));
        // setAmountInput(x.toFixed(2) + '');
        setAmount(x.toFixed(2) + '');
      }
      setTypeDiscount(v);
      setDiscountInput('0');
    },
    [currency, exchangeRate, props],
  );

  const handleChangeCurrency = useCallback(
    (v: any) => {
      const x = TotalStrategy(props.total, v, 0, typeDiscount, Number(exchangeRate));
      // setAmountInput(x.toFixed(2) + '');
      setAmount(x.toFixed(2) + '');
      setCurrency(v);
      setDiscountInput('0');
    },
    [exchangeRate, props, typeDiscount],
  );

  const handleDiscount = useCallback(() => {
    let discount = (Number(discountInput) / props.total) * 100;

    if (currency === 'KHR') {
      const totalKhr = (props.total || 0) * Number(exchangeRate);
      discount = (Number(discountInput) / totalKhr) * 100;
    }

    if (typeDiscount === 'PERCENTAGE') {
      discount = Number(discountInput);
    }

    update({
      variables: {
        addDiscountOrderId: Number(props.data.id),
        discount: discount,
      },
    })
      .then((res) => {
        if (res.data?.addDiscountOrder) {
          setToasts([...toasts, { content: 'Update discount was success.', status: 'success' }]);
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
  }, [currency, discountInput, exchangeRate, props.data.id, props.total, setToasts, toasts, typeDiscount, update]);

  const activator = (
    <Button size="micro" onClick={toggleOpen}>
      Set Discount
    </Button>
  );

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      title="Discount Order"
      activator={activator}
      footer={
        <div className="flex flex-row gap-4 items-center">
          <div className="font-bold">
            Exchange Rate: <span className="pl-2">$1 = ៛{exchangeRate}</span>
            <br />
            Total Order:{' '}
            <span className="pl-2">
              {currency === 'USD' ? '$' + Number(amount || 0).toFixed(2) : '៛' + Number(amount || 0).toFixed(2)}
            </span>
          </div>
        </div>
      }
      primaryAction={{
        content: 'Discount',
        onAction: handleDiscount,
      }}
    >
      <Modal.Section>
        <div>
          <div className="flex flex-row items-center gap-2">
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
          <div>
            <TextField
              autoComplete="off"
              placeholder="Discount"
              value={discountInput}
              type="number"
              onChange={handleChangeDiscount}
              label="Discount"
              selectTextOnFocus
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
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
