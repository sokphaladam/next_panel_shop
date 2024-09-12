'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { PrintShift } from '@/components/PrintShift';
import {
  ShiftInput,
  useCreateShiftMutation,
  useShiftByIdQuery,
  useShiftListQuery,
  useUpdateShiftMutation,
} from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { Button, FooterHelp, InlineGrid, Modal, Text, TextField } from '@shopify/polaris';
import moment from 'moment';
import { useCallback, useRef, useState } from 'react';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  type?: 'OPEN' | 'CLOSE';
  onShift?: any;
}

export function FormShift(props: Props) {
  const user = useUser();
  const today = moment(new Date());
  const { toasts, setToasts } = useCustomToast();
  const refBtn = useRef<HTMLDivElement>(null);
  const [dateInput, setDateInput] = useState(today.format('YYYY-MM-DD HH:mm:ss'));
  const [usdInput, setUsdInput] = useState('0');
  const [khrInput, setKhrInput] = useState('0');
  const { data, loading } = useShiftByIdQuery({
    skip: moment(new Date(dateInput)).format('YYYY-MM-DD') === 'Invalid Date',
    variables: {
      date: moment(new Date(dateInput)).format('YYYY-MM-DD HH:mm:ss'),
      userId: user?.id || 0,
    },
    onCompleted: (res) => {
      if (res.shiftById) {
        setUsdInput(String(res.shiftById.openCurrency?.usd || '0'));
        setKhrInput(String(res.shiftById.openCurrency?.khr || '0'));
        props.onShift(true);
      } else {
        setUsdInput('0');
        setKhrInput('0');
      }
    },
  });

  const [create, propCreate] = useCreateShiftMutation({
    refetchQueries: ['shiftById'],
  });
  const [update, propUpdate] = useUpdateShiftMutation({
    refetchQueries: ['shiftById'],
  });

  const toggleOpen = useCallback(() => props.setOpen(!props.open), [props]);

  const handleShiftClose = useCallback(() => {
    const input: ShiftInput = {
      open: data?.shiftById?.open,
      close: moment(new Date(dateInput)).format('YYYY-MM-DD HH:mm:ss'),
      openCurrency: {
        khr: Number(khrInput),
        usd: Number(usdInput),
      },
      userId: user?.id || 0,
    };

    if (data?.shiftById) {
      update({
        variables: {
          updateShiftId: data.shiftById.id || 0,
          data: input,
          expected: true,
        },
      })
        .then((res) => {
          if (res.data?.updateShift) {
            setToasts([...toasts, { content: 'Open shift', status: 'success' }]);
            setTimeout(() => {
              if (refBtn) {
                refBtn.current?.click();
              }
            }, 500);
          } else {
            setToasts([...toasts, { content: 'Oop! somthing wrong please try again.', status: 'error' }]);
          }
        })
        .catch((err) => {
          setToasts([...toasts, { content: 'Oop! somthing wrong please try again.', status: 'error' }]);
        });
    }
  }, [data, dateInput, khrInput, setToasts, toasts, update, usdInput, user?.id, refBtn]);

  const handleShiftOpen = useCallback(() => {
    const input: ShiftInput = {
      open: data?.shiftById ? data.shiftById.open : moment(new Date(dateInput)).format('YYYY-MM-DD HH:mm:ss'),
      openCurrency: {
        khr: Number(khrInput),
        usd: Number(usdInput),
      },
      userId: user?.id || 0,
    };

    create({
      variables: {
        data: input,
      },
    })
      .then((res) => {
        if (res.data?.createShift) {
          setToasts([...toasts, { content: 'Open shift', status: 'success' }]);
          props.setOpen(false);
          setTimeout(() => {
            process.browser && window.location.reload();
          }, 500);
        } else {
          setToasts([...toasts, { content: 'Oop! somthing wrong please try again.', status: 'error' }]);
        }
      })
      .catch((err) => {
        setToasts([...toasts, { content: 'Oop! somthing wrong please try again.', status: 'error' }]);
      });
  }, [create, data, dateInput, khrInput, props, setToasts, toasts, usdInput, user?.id]);

  if (propCreate.loading) {
    return <></>;
  }

  return (
    <Modal
      open={props.open}
      title="Shift"
      onClose={propCreate.loading || propUpdate.loading ? () => {} : () => toggleOpen()}
      primaryAction={{
        content: data?.shiftById ? 'Close Shift' : 'Open Shift',
        onAction: data?.shiftById ? handleShiftClose : handleShiftOpen,
        disabled: !!data?.shiftById?.close || propCreate.loading || propUpdate.loading,
      }}
      footer={
        !!data?.shiftById?.close && (
          <FooterHelp>
            <div className="flex flex-row gap-2">
              Current shift date select are already closed.
              <PrintShift refBtn={refBtn} data={data.shiftById} />
            </div>
          </FooterHelp>
        )
      }
      loading={propCreate.loading || propUpdate.loading}
    >
      <Modal.Section>
        <Text as="h4" variant="headingMd">
          {data?.shiftById ? 'Close Date' : 'Open Date'}
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
            disabled={!!data?.shiftById}
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
            disabled={!!data?.shiftById}
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
