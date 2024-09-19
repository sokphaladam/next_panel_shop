'use client';

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
}

export function DiscountOrder(props: Props) {
  const setting = useSetting();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [discountInput, setDiscountInput] = useState<string>('0');
  const [typeDiscount, setTypeDiscount] = useState('VALUE');
  const [amount, setAmount] = useState<any>(props.total);
  const [loading, setLoading] = useState(true);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const exchangeRate = setting.find((f) => f.option === 'EXCHANGE_RATE')?.value || '4000';

  useEffect(() => {
    if (props.total && !!loading) {
      setAmount(props.total + '');
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

  const activator = (
    <Button size="micro" onClick={toggleOpen}>
      Set Discount
    </Button>
  );

  return (
    <Modal open={open} onClose={toggleOpen} title="Discount Order" activator={activator}>
      <Modal.Section>
        <div>
          {amount}
          <Select
            label="Currency"
            options={[
              { label: 'USD', value: 'USD' },
              { label: 'KHR', value: 'KHR' },
            ]}
            value={currency}
            onChange={handleChangeCurrency}
          />
          <div>
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
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
