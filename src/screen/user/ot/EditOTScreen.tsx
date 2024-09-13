'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { OverTimeInput, useCreateOverTimeMutation, useOverTimeQuery, useUpdateOverTimeMutation } from '@/gql/graphql';
import React, { useCallback, useState } from 'react';
import { FormOT } from './components/FormOT';
import moment from 'moment';
import { Layout } from '@shopify/polaris';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useUser } from '@/service/UserProvider';
import { useParams, useRouter } from 'next/navigation';

export function EditOtScreen() {
  const { id } = useParams<{ id: string }>();
  const { push } = useRouter();
  const user = useUser();
  const { toasts, setToasts } = useCustomToast();
  const now = moment(new Date());
  const [value, setValue] = useState<OverTimeInput>({});
  const { loading } = useOverTimeQuery({
    variables: {
      overTimeId: Number(id),
    },
    onCompleted: (res) => {
      setValue({
        otDate: res.overTime?.otDate || now.format('YYYY-MM-DD'),
        startat: res.overTime?.startat || '17:00',
        endAt: res.overTime?.endAt || '18:00',
        note: res.overTime?.note || '',
      });
    },
  });
  const [update] = useUpdateOverTimeMutation({
    refetchQueries: ['overTimeList', 'overTime'],
  });

  const handleSave = useCallback(() => {
    if (!value.note) {
      setToasts([...toasts, { content: 'Please write your reason.', status: 'error' }]);
      return;
    }

    update({
      variables: {
        updateOverTimeId: Number(id),
        data: value,
      },
    })
      .then((res) => {
        if (res.data?.updateOverTime) {
          setToasts([...toasts, { content: 'Update requested overtime.', status: 'success' }]);
          push('/ot');
        } else {
          setToasts([...toasts, { content: 'Opp! something was wrong please try again.', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Opp! something was wrong please try again.', status: 'error' }]);
      });
  }, [id, push, setToasts, toasts, update, value]);

  if (loading) {
    return <></>;
  }

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <PolarisLayout
          title={`Update Request Overtime #${id}`}
          fullWidth
          primaryAction={{ content: 'Save', onAction: handleSave }}
        >
          <FormOT value={value} setValue={setValue} />
        </PolarisLayout>
      </Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
    </Layout>
  );
}
