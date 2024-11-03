'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { Box, Card, Layout } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { OrderScheduleForm } from './components/OrderScheduleForm';
import { OrderScheduleInput, useCreateOrderScheduleMutation } from '@/gql/graphql';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useRouter } from 'next/navigation';

export function CreateOrderScheduleScreen() {
  const { push } = useRouter();
  const { toasts, setToasts } = useCustomToast();
  const [value, setValue] = useState<OrderScheduleInput>();
  const [error, setError] = useState<any[]>([]);
  const [create, createProps] = useCreateOrderScheduleMutation({
    refetchQueries: ['orderScheduleList', 'orderSchedule'],
  });

  const handleSave = useCallback(() => {
    const errs = [];
    if (!value?.name) {
      errs.push({ obj: 'name', text: 'Please input name.' });
    }

    if (!value?.startAt) {
      errs.push({ obj: 'startAt', text: 'Please input start at.' });
    }

    if (!value?.endAt) {
      errs.push({ obj: 'endAt', text: 'Please input end at.' });
    }

    if (!value?.items || value?.items?.length === 0) {
      errs.push({ obj: 'items', text: 'Please select any product you want.' });
    }

    if (errs.length > 0) {
      return setError(errs);
    }

    setError([]);

    create({
      variables: {
        data: value,
      },
    })
      .then((res) => {
        if (res.data?.createOrderSchedule) {
          setToasts([...toasts, { content: 'Created new order schedule', status: 'success' }]);
          push('/order/schedule');
        } else {
          setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
      });
  }, [value, create, toasts, push, setToasts]);

  return (
    <PolarisLayout
      title="Create New Order Schedule"
      permission={[
        role_permission.ADMIN,
        role_permission.SUPER_ADMIN,
        role_permission.MANAGER,
        role_permission.CASHIER,
      ]}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        disabled: createProps.loading,
        loading: createProps.loading,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Box>
              <OrderScheduleForm value={value} setValue={setValue} error={error} />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
