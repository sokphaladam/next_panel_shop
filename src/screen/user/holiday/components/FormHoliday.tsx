'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { HolidayInput, useCreateHolidayMutation, useHolidayQuery, useUpdateHolidayMutation } from '@/gql/graphql';
import { InlineGrid, Modal, TextField } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useState } from 'react';

interface Props {
  id?: number;
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
  activator?:
    | React.RefObject<HTMLElement>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

export function FormHoliday(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [holiday, setHoliday] = useState<HolidayInput>({});

  useHolidayQuery({
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      holidayId: Number(props.id),
    },
    onCompleted: (data) => {
      if (data.holiday) {
        setHoliday({
          name: data.holiday.name || '',
          date: data.holiday.date || '',
          extra: data.holiday.extra || 0,
        });
      }
    },
  });

  const [create, propsCreate] = useCreateHolidayMutation({
    refetchQueries: ['holidayList', 'holiday'],
  });
  const [update, propsUpdate] = useUpdateHolidayMutation({
    refetchQueries: ['holidayList', 'holiday'],
  });

  const toggleActive = useCallback(() => {
    props.setActive(!props.active);
    setHoliday({});
  }, [props]);

  const handleSave = useCallback(() => {
    if (!props.id) {
      create({
        variables: {
          data: {
            ...holiday,
            date: moment(holiday.date).format('YYYY-MM-DD'),
          },
        },
      })
        .then((res) => {
          if (res.data?.createHoliday) {
            setToasts([...toasts, { content: 'Create new holiday.', status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    } else {
      update({
        variables: {
          data: {
            ...holiday,
            date: moment(holiday.date).format('YYYY-MM-DD'),
          },
          updateHolidayId: Number(props.id),
        },
      })
        .then((res) => {
          if (res.data?.updateHoliday) {
            setToasts([...toasts, { content: 'Update holiday #' + props.id, status: 'success' }]);
            toggleActive();
          } else {
            setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! somthing was wrong.', status: 'error' }]);
        });
    }
  }, [props, create, holiday, setToasts, toasts, toggleActive, update]);

  return (
    <Modal
      open={props.active}
      onClose={() => {
        toggleActive();
        setHoliday({});
      }}
      title={props.title}
      activator={props.activator}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        disabled: propsCreate.loading,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: toggleActive,
          disabled: propsCreate.loading,
        },
      ]}
    >
      <Modal.Section>
        <InlineGrid columns={['oneThird', 'oneThird', 'oneThird']} gap={'200'}>
          <TextField
            label="Name"
            placeholder="Enter holiday name..."
            value={holiday.name || ''}
            onChange={(v) => setHoliday({ ...holiday, name: v })}
            autoComplete="off"
          />
          <TextField
            label="Date"
            placeholder="Enter holiday date..."
            value={holiday.date || ''}
            onChange={(v) => setHoliday({ ...holiday, date: v })}
            autoComplete="off"
            type="date"
          />
          <TextField
            label="Extra"
            placeholder="Enter holiday extra if working..."
            value={holiday.extra + ''}
            onChange={(v) => setHoliday({ ...holiday, extra: Number(v) })}
            autoComplete="off"
            type="number"
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
