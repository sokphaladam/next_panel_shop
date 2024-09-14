'use client';
import { useRoleListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';
import React from 'react';
interface Props {
  value: any;
  onChange: any;
}

export function RoleController(props: Props) {
  const { data, loading } = useRoleListQuery();

  if (loading || !data) {
    return <></>;
  }

  const options = [{ label: 'Select role', value: '' }];

  for (const d of data.roleList?.filter((x) => ![1, 2].includes(x?.id || 0)) || []) {
    options.push({ label: d?.name || '', value: d?.id + '' });
  }

  return <Select label="Role" options={options} value={String(props.value)} onChange={props.onChange} />;
}
