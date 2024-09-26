'use client';
import { Order } from '@/gql/graphql';
import { IndexTable, Link, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

interface Props {
  orders: Order[];
  loading: boolean;
  offset: number;
  limit: number;
  setOffset: any;
}

function SaleTableItem({ order }: { order: Order }) {
  const date = order.log?.find((f) => f?.text === 'Checkout')?.date;
  const signature = order.log?.find((f) => f?.text === 'Signature')?.by;
  const item = order.items?.reduce((a: any, b: any) => {
    return {
      qty: (a.qty || 0) + (b?.qty || 0),
    };
  });
  const discountPrice = (Number(order.total || 0) * (order.discount || 0)) / 100;
  const priceAfterDiscount = Number(order.total || 0) - discountPrice;
  return (
    <IndexTable.Row id={order.id + ''} position={order.id || 0}>
      <IndexTable.Cell>
        <Link url={`/order/detail/${order.id}`}>
          <Text as="p" variant="bodySm">
            {order.invoice?.toString().padStart(5, '0')}
          </Text>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="p" variant="bodySm">
          {moment(date).format('YYYY-MM-DD')}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-center">
        <Text as="p" variant="bodySm">
          {order.items?.length}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-center">
        <Text as="p" variant="bodySm">
          {item?.qty}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          ${order.total}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          {order.discount}%
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          ${priceAfterDiscount.toFixed(2)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          {signature ? signature?.display : '--'}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          {order.bankType}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="text-end">
        <Text as="p" variant="bodySm">
          {order.currency}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}

export function SaleTable(props: Props) {
  return (
    <IndexTable
      headings={[
        { title: 'No.' },
        { title: 'Date' },
        { title: 'Items', alignment: 'center' },
        { title: 'Qty', alignment: 'center' },
        { title: 'Amount', alignment: 'end' },
        { title: 'Discount', alignment: 'end' },
        { title: 'Total', alignment: 'end' },
        { title: 'Signature', alignment: 'end' },
        { title: 'Payment', alignment: 'end' },
        { title: 'Currency', alignment: 'end' },
      ]}
      itemCount={props.orders?.length || 0}
      selectable={false}
      loading={props.loading}
      pagination={{
        label: `${props.offset * props.limit + 1} - ${props.limit * (props.offset + 1)}`,
        hasNext: (props.orders.length || 0) >= props.limit,
        hasPrevious: props.offset > 0,
        onNext: () => props.setOffset(props.offset + 1),
        onPrevious: () => props.setOffset(props.offset - 1),
      }}
    >
      {props.orders?.map((order) => {
        return <SaleTableItem key={order.id || 0} order={order} />;
      })}
    </IndexTable>
  );
}
