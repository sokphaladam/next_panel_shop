'use client';

import { useGetbankListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';

interface Props {
  value: any;
  onChange: any;
  hidelabel?: boolean;
  needId?: boolean;
}

export function BankController(props: Props) {
  const { data, loading } = useGetbankListQuery({
    variables: {
      limit: 1000,
      offset: 0,
    },
    onCompleted: (data) => {
      if (!props.value) {
        const d = (data.getbankList || []).find((f) => f?.id === 2);
        props.onChange(props.needId ? `${d?.name},${d?.id}` : d?.name || '');
      }
    },
  });

  if (loading || !data) {
    return <></>;
  }

  const options = [{ label: 'Select bank', value: '' }];

  for (const d of data.getbankList || []) {
    options.push({
      label: d?.name || '',
      value: props.needId ? `${d?.name},${d?.id}` : d?.name || '',
    });
  }

  return (
    <Select
      label="Bank Name"
      labelHidden={props.hidelabel}
      disabled={loading}
      options={options}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
