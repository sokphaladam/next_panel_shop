'use client';

import { usePeopleInOrderMutation } from '@/gql/graphql';
import { Button, Modal, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';

interface Props {
  orderId: number;
}

export function ControllPerson(props: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [people, { loading }] = usePeopleInOrderMutation({
    refetchQueries: ['order'],
  });

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const handleSave = useCallback(() => {
    people({
      variables: {
        count: Number(value),
        peopleInOrderId: props.orderId,
      },
    }).then(() => {
      setValue('');
      toggleOpen();
    });
  }, [people, props, toggleOpen, value]);

  const activator = <Button onClick={toggleOpen}>Add People</Button>;

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      title="People in Order"
      activator={activator}
      primaryAction={{ content: 'Save', onAction: handleSave }}
      loading={loading}
    >
      <Modal.Section>
        <TextField
          value={value}
          type="number"
          label="How many people are in order"
          autoComplete="off"
          onChange={setValue}
        />
      </Modal.Section>
    </Modal>
  );
}
