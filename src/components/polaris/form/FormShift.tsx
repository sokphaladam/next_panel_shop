'use client';

import { useUser } from '@/service/UserProvider';
import { InlineGrid, Modal, Text, TextField } from '@shopify/polaris';
import moment from 'moment';
import { useCallback, useState } from 'react';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  type?: 'OPEN' | 'CLOSE';
}

export function FormShift(props: Props) {
  const user = useUser();
  const today = moment(new Date());
  const [dateInput, setDateInput] = useState(today.format('YYYY-MM-DD HH:mm:ss'));
  const [usdInput, setUsdInput] = useState('0');
  const [khrInput, setKhrInput] = useState('0');
  const toggleOpen = useCallback(() => props.setOpen(!props.open), [props]);

  const handleShift = useCallback(() => {
    const input = {
      open: dateInput,
      openCurrency: {
        khr: Number(khrInput),
        usd: Number(usdInput),
      },
      useId: user?.id,
    };

    console.log(input);
  }, [dateInput, khrInput, usdInput, user?.id]);

  return (
    <Modal
      open={props.open}
      title="Shift"
      onClose={toggleOpen}
      primaryAction={{
        content: !props.open ? 'Close Shift' : 'Open Shift',
        onAction: handleShift,
      }}
    >
      <Modal.Section>
        <Text as="h4" variant="headingMd">
          Open Date
        </Text>
        <br />
        <TextField
          value={dateInput}
          autoComplete="off"
          label="Open Date"
          labelHidden
          type="datetime-local"
          onChange={setDateInput}
        />
      </Modal.Section>
      <Modal.Section>
        <Text as="h4" variant="headingMd">
          Deposited
        </Text>
        <br />
        <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'200'}>
          <TextField
            value={usdInput}
            onChange={setUsdInput}
            autoComplete="off"
            label
            labelHidden
            prefix="USD"
            align="right"
            type="currency"
            selectTextOnFocus
          />
          <TextField
            value={khrInput}
            onChange={setKhrInput}
            autoComplete="off"
            label
            labelHidden
            prefix="KHR"
            align="right"
            type="currency"
            selectTextOnFocus
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
