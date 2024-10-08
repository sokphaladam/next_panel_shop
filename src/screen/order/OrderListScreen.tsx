'use client';
import { useOrderListQuery, useOrderSubscriptSubscription } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { Box, Card, IndexFilters, IndexTable, Layout, Page, TabProps, useSetIndexFiltersMode } from '@shopify/polaris';
import React, { useState } from 'react';
import { OrderListItem } from './components/OrderListItem';
import { PrintAllOrder } from './components/PrintAllOrder';

const tabs: TabProps[] = [
  {
    content: 'Pending',
    id: 'PENDING',
  },
  {
    content: 'In Order',
    id: 'VERIFY',
  },
  // {
  //   content: 'DELIVER',
  //   id: 'DELIVERY',
  // },
  {
    content: 'Checkout',
    id: 'CHECKOUT',
  },
  // {
  //   content: 'Cancelled',
  //   id: 'CANCELLED',
  // },
];

export function OrderListScreen() {
  const [select, setSelect] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const { offset, setOffset, limit, setLimit, handleResetPage } = usePagination();
  const { mode, setMode } = useSetIndexFiltersMode();
  const { data, loading, refetch } = useOrderListQuery({
    variables: {
      offset: offset * limit,
      limit,
      status: [tabs[select].id as any],
      orderId: searchInput,
    },
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (res.data.data?.orderSubscript.status === 2 || !!res.data.data?.orderSubscript.uuid) {
        refetch();
      }
    },
  });

  return (
    <Page title="Order List" fullWidth>
      <Layout>
        <Layout.Section>
          <PrintAllOrder />
          <br />
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexFilters
                canCreateNewView={false}
                filters={[]}
                mode={mode}
                setMode={setMode}
                tabs={tabs}
                queryValue={searchInput}
                onClearAll={() => {
                  //
                }}
                onQueryChange={(v) => {
                  setSearchInput(v);
                }}
                onQueryClear={() => {
                  setSearchInput('');
                }}
                selected={select}
                onSelect={(v) => {
                  setSelect(v);
                  handleResetPage();
                }}
                loading={loading}
                queryPlaceholder="Enter order number..."
              />
            </Box>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: 'Order' },
                  { title: 'Items', alignment: 'start' },
                  { title: 'Info', alignment: 'start' },
                  { title: 'Delivery Pickup', alignment: 'start' },
                  { title: 'Status', alignment: 'center' },
                  { title: 'Qty', alignment: 'end' },
                  { title: 'Amount', alignment: 'end' },
                  { title: 'Discount', alignment: 'end' },
                  { title: 'Total', alignment: 'end' },
                  { title: 'Paid', alignment: 'end' },
                  { title: 'Note', alignment: 'start' },
                  // { title: 'Controls', alignment: 'end' }
                ]}
                loading={loading}
                itemCount={data?.orderList?.length || 0}
                selectable={false}
                pagination={{
                  label: `${offset * limit + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.orderList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1),
                }}
              >
                {data && data.orderList?.map((x, i) => <OrderListItem item={x} key={i} />)}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
