'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { StatusOrder, useOrderListQuery } from '@/gql/graphql';
import { Select } from '@shopify/polaris';
import moment from 'moment';
import React, { useState } from 'react';

export function ReportOrderScreen() {
  const now = moment(new Date());
  const [status, setStatus] = useState<StatusOrder>(StatusOrder.Checkout);
  const [from, setFrom] = useState(now.format('YYYY-MM-DD'));
  const [to, setTo] = useState(now.add(24, 'hours').format('YYYY-MM-DD'));
  const { data, loading } = useOrderListQuery();

  return (
    <PolarisLayout title="Orders">
      <Select label="Status" />
    </PolarisLayout>
  );
}
