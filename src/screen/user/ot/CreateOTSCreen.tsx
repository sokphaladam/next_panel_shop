'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { OverTimeInput, useCreateOverTimeMutation } from '@/gql/graphql';
import React, { useCallback, useState } from 'react';
import { FormOT } from './components/FormOT';
import moment from 'moment';
import { Layout } from '@shopify/polaris';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useUser } from '@/service/UserProvider';
import { useRouter } from 'next/navigation';

export function CreateOtScreen() {
  const { push } = useRouter();
  const user = useUser();
  const { toasts, setToasts } = useCustomToast();
  const now = moment(new Date());
  const [value, setValue] = useState<OverTimeInput>({
    otDate: now.format('YYYY-MM-DD'),
    startat: '17:00',
    endAt: '18:00',
  });
  const [create] = useCreateOverTimeMutation({
    refetchQueries: ['overTimeList', 'overTime'],
  });

  const handleSave = useCallback(() => {
    if (!value.note) {
      setToasts([...toasts, { content: 'Please write your reason.', status: 'error' }]);
      return;
    }

    create({
      variables: {
        userId: Number(user?.id),
        data: value,
      },
    })
      .then((res) => {
        if (res.data?.createOverTime) {
          setToasts([...toasts, { content: 'Requested overtime.', status: 'success' }]);
          push('/ot');
        } else {
          setToasts([...toasts, { content: 'Opp! something was wrong please try again.', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Opp! something was wrong please try again.', status: 'error' }]);
      });
  }, [create, push, setToasts, toasts, user, value]);

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <PolarisLayout title="Request Overtime" fullWidth primaryAction={{ content: 'Save', onAction: handleSave }}>
          <FormOT value={value} setValue={setValue} />
        </PolarisLayout>
      </Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
    </Layout>
  );
}
