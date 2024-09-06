'use client';

import { PrintShift } from '@/components/PrintShift';
import { Shift } from '@/gql/graphql';
import { Avatar, Badge, IndexTable } from '@shopify/polaris';
import { useRef } from 'react';

interface Props {
  data: Shift;
}

export function ShiftListItem(props: Props) {
  const ref = useRef(null);
  return (
    <IndexTable.Row id={props.data.id + ''} position={props.data.id || 0}>
      <IndexTable.Cell>
        <small>{props.data.id}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Avatar
          source={props.data.user?.profile || ''}
          initials={props.data.user?.display
            ?.split(' ')
            .map((s) => s.charAt(0).toUpperCase())
            .join('')}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{props.data.open}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{props.data.close}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>USD: ${props.data.openCurrency?.usd}</small>
        <br />
        <small>KHR: {props.data.openCurrency?.khr}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>USD: ${props.data.closeCurrency?.usd}</small>
        <br />
        <small>KHR: {props.data.closeCurrency?.khr}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>${Number(props.data.bank.reduce((a: any, b: any) => (a = a + Number(b.value)), 0)).toFixed(2)}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{props.data.bill}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{props.data.card}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <PrintShift refBtn={ref} data={props.data} />
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
