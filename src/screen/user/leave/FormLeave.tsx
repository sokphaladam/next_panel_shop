'use client';

import { useCustomToast } from '@/components/custom/CustomToast';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { PolarisUser } from '@/components/polaris/PolarisUser';
import { LeaveInput, LeaveStatus, useCreateLeaveMutation, useLeaveQuery, useUpdateLeaveMutation } from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import { useUser } from '@/service/UserProvider';
import { Box, Card, ChoiceList, InlineGrid, Layout, Select, Text, TextField } from '@shopify/polaris';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function getTodayFrom0to24() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight
  const currentHour = new Date(today);
  currentHour.setHours(23);

  return [moment(today).format('YYYY-MM-DD HH:mm:ss'), moment(currentHour).format('YYYY-MM-DD HH:mm:ss')];
}

function getDateDifference(fromDate: any, endDate: any) {
  const diffInMs = Math.abs((new Date(endDate) as any) - (new Date(fromDate) as any));

  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours >= 24) {
    const diffInDays = diffInHours / 24;
    return `${Math.floor(diffInDays)} day(s)`;
  } else {
    return `${Math.floor(diffInHours)} hour(s)`;
  }
}

export function FormLeave({ id }: { id?: number }) {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();
  const user = useUser();
  const date = getTodayFrom0to24();
  const { toasts, setToasts } = useCustomToast();
  const [fromDate, setFromDate] = useState(date[0]);
  const [endDate, setEndDate] = useState(date[1]);
  const [select, setSelect] = useState(['fullday']);
  const [selectType, setSelectType] = useState('AL');
  const [reason, setReason] = useState('');
  const [selectUser, setSelectUser] = useState(user?.id || 0);

  useLeaveQuery({
    skip: !id,
    variables: {
      leaveId: Number(id),
    },
    onCompleted: (res) => {
      if (res.leave) {
        const x = ['fullday', 'morning', 'afternoon'].includes(res.leave.duration + '');
        setFromDate(res.leave.startDate || '');
        setEndDate(res.leave.endDate || '');
        setSelectUser(res.leave.requestedBy?.id || 0);
        setSelect(x ? [res.leave.duration || ''] : ['time']);
        setSelectType(res.leave.leaveType || '');
        setReason(res.leave.leaveReason || '');
      }
    },
  });

  const [create, propCreate] = useCreateLeaveMutation({
    refetchQueries: ['leave', 'leaveList'],
  });
  const [update, propUpdate] = useUpdateLeaveMutation({
    refetchQueries: ['leave', 'leaveList'],
  });

  useEffect(() => {
    if (!id) {
      if (user && !!load) {
        setSelectUser(user?.id || 0);
        setLoad(false);
      }
    }
  }, [load, user, id]);

  const handleSave = useCallback(() => {
    if ([1, 2, 5].includes(user?.role?.id || 0)) {
      if (!selectUser) {
        setToasts([...toasts, { content: 'Please select staff for request leave', status: 'error' }]);
        return;
      }
    }

    if (!reason) {
      setToasts([...toasts, { content: 'Please input you reason', status: 'error' }]);
      return;
    }

    let diff = select[0];

    if (diff === 'time') {
      diff = getDateDifference(fromDate, endDate);
    }

    if (moment(endDate).diff(moment(fromDate), 'days') > 1) {
      diff = moment(endDate).diff(moment(fromDate), 'days') + ' days';
    }

    const input: LeaveInput = {
      startDate: moment(fromDate).format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
      duration: diff,
      leaveReason: reason,
      leaveType: selectType,
      status: LeaveStatus.Request,
    };

    const userId = [1, 2, 5].includes(user?.role?.id || 0) ? selectUser : user?.id || 0;

    if (!id) {
      Modal.dialog({
        title: 'Confirmation',
        body: [<div key={1}>Are you user want to create new request leave?</div>],
        buttons: [
          {
            title: 'Yes',
            class: 'primary',
            onPress: () => {
              create({
                variables: {
                  userId,
                  data: input,
                },
              })
                .then((res) => {
                  if (res.data?.createLeave) {
                    setToasts([...toasts, { content: 'Create new request leave was success', status: 'success' }]);
                    push('/leave');
                  } else {
                    setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
                  }
                })
                .catch(() => {
                  setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
                });
            },
          },
        ],
      });
    } else {
      Modal.dialog({
        title: 'Confirmation',
        body: [<div key={1}>Are you user want to update request leave?</div>],
        buttons: [
          {
            title: 'Yes',
            class: 'primary',
            onPress: () => {
              update({
                variables: {
                  updateLeaveId: id,
                  data: input,
                },
              })
                .then((res) => {
                  if (res.data?.updateLeave) {
                    setToasts([...toasts, { content: 'Update request leave was success', status: 'success' }]);
                    push('/leave');
                  } else {
                    setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
                  }
                })
                .catch(() => {
                  setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
                });
            },
          },
        ],
      });
    }
  }, [
    create,
    endDate,
    fromDate,
    id,
    reason,
    select,
    selectType,
    selectUser,
    setToasts,
    toasts,
    update,
    user?.id,
    user?.role?.id,
  ]);

  return (
    <PolarisLayout
      title={id ? `Edit Request Leave #${id}` : 'Request Leave'}
      primaryAction={{ content: 'Save', onAction: handleSave }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Box>
              {[1, 2, 5].includes(user?.role?.id || 0) && (
                <PolarisUser id={selectUser} title="Staff Request" onChange={setSelectUser} />
              )}
              <br />
              <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'400'}>
                <TextField
                  autoComplete="off"
                  label="From Date"
                  type="datetime-local"
                  onChange={(v) => setFromDate(v)}
                  value={fromDate}
                />
                <TextField
                  autoComplete="off"
                  label="End Date"
                  type="datetime-local"
                  onChange={(v) => setEndDate(v)}
                  value={endDate}
                />
              </InlineGrid>
              <br />
              {moment(endDate).diff(moment(fromDate), 'days') <= 1 ? (
                <ChoiceList
                  title
                  titleHidden
                  choices={[
                    {
                      label: 'Full Day',
                      value: 'fullday',
                    },
                    { label: 'Morning', value: 'morning' },
                    { label: 'Afternoon', value: 'afternoon' },
                    {
                      label: `Time ${select[0] === 'time' ? getDateDifference(fromDate, endDate) : ''}`,
                      value: 'time',
                    },
                  ]}
                  selected={select}
                  onChange={setSelect}
                  allowMultiple={false}
                />
              ) : (
                <Text as="p" variant="bodyMd" tone="success" fontWeight="bold">
                  {moment(endDate).diff(moment(fromDate), 'days')} Days
                </Text>
              )}
              <br />
              <Select
                label="Type of Leave"
                options={[
                  { label: 'Day off (4 days)', value: 'DO' },
                  { label: 'Annual Leave (18 days)', value: 'AL' },
                  { label: 'Special leave (7 days)', value: 'SL' },
                  { label: 'Permission', value: 'PM' },
                ]}
                value={selectType}
                onChange={setSelectType}
              />
              <br />
              <TextField
                requiredIndicator
                multiline={5}
                value={reason}
                onChange={setReason}
                label="Reason"
                placeholder="Please write your reason here..."
                autoComplete="off"
              />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
