'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { Box, Card, Layout } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { OrderScheduleForm } from './components/OrderScheduleForm';
import { useParams, useRouter } from 'next/navigation';
import { useCustomToast } from '@/components/custom/CustomToast';
import { OrderScheduleInput, useOrderScheduleQuery, useUpdateOrderScheduleMutation } from '@/gql/graphql';

export function EditOrderScheduleScreen() {
  const params = useParams<{ id: string }>();
  const { push } = useRouter();
  const { toasts, setToasts } = useCustomToast();
  const [value, setValue] = useState<OrderScheduleInput>();
  const [error, setError] = useState<any[]>([]);
  const { loading } = useOrderScheduleQuery({
    variables: {
      orderScheduleId: Number(params.id),
    },
    onCompleted: (data) => {
      setValue({
        name: data.orderSchedule?.name || '',
        startAt: data.orderSchedule?.startAt || '',
        endAt: data.orderSchedule?.endAt || '',
        items:
          data.orderSchedule?.items?.map((x) => {
            return {
              skuId: x?.sku?.id,
            };
          }) || [],
      });
    },
  });
  const [update, propsUpdate] = useUpdateOrderScheduleMutation({
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
    update({
      variables: {
        updateOrderScheduleId: Number(params.id),
        data: value,
      },
    })
      .then((res) => {
        if (res.data?.updateOrderSchedule) {
          setToasts([...toasts, { content: 'Updated order schedule', status: 'success' }]);
          push('/order/schedule');
        } else {
          setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
      });
  }, [value, update, toasts, push, setToasts, params]);

  if (loading) {
    return <></>;
  }

  return (
    <PolarisLayout
      title={`Edit Order Schedule #${params.id}`}
      permission={[
        role_permission.ADMIN,
        role_permission.SUPER_ADMIN,
        role_permission.MANAGER,
        role_permission.CASHIER,
      ]}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        disabled: propsUpdate.loading,
        loading: propsUpdate.loading,
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
