'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { LeaveStatus, OverTime, OverTimeStatus, useOverTimeListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import {
  Avatar,
  Badge,
  Box,
  Card,
  IndexFilters,
  IndexTable,
  Layout,
  TabProps,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import moment from 'moment';
import React, { useState } from 'react';
import { ControllOt } from './components/ControllOt';

const toneStatus: any = {
  [OverTimeStatus.Request]: 'attention-strong',
  [OverTimeStatus.Approved]: 'success-strong',
  [OverTimeStatus.Rejected]: 'critical-strong',
  [OverTimeStatus.Cancelled]: 'new',
};

const tabs: TabProps[] = [
  {
    content: 'Pending',
    id: OverTimeStatus.Request,
  },
  {
    content: 'Approved',
    id: OverTimeStatus.Approved,
  },
  {
    content: 'Rejected',
    id: OverTimeStatus.Rejected,
  },
  {
    content: 'Cancelled',
    id: OverTimeStatus.Cancelled,
  },
];

export function OtListScreen() {
  const [select, setSelect] = useState(0);
  const { limit, offset, setOffset, handleResetPage } = usePagination();
  const [searchInput, setSearchInput] = useState('');
  const { mode, setMode } = useSetIndexFiltersMode();

  const { data, loading } = useOverTimeListQuery({
    variables: {
      offset: offset * limit,
      limit,
      status: [tabs[select].id as any],
    },
  });

  return (
    <PolarisLayout title="Overtime List" fullWidth primaryAction={{ content: 'Request Overtime', url: '/ot/create' }}>
      <Layout>
        <Layout.Section>
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
                hideQueryField
                hideFilters
              />
            </Box>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: 'Date' },
                  { title: 'From Time' },
                  { title: 'To Time' },
                  { title: 'Request By' },
                  {
                    title: 'Reason',
                  },
                  { title: 'Status' },
                  { title: 'Change Status' },
                  { title: 'Control' },
                ]}
                itemCount={data?.overTimeList?.length || 0}
                selectable={false}
                loading={loading}
                pagination={{
                  label: `${offset * limit + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.overTimeList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1),
                }}
              >
                {data &&
                  data.overTimeList?.map((item, index) => {
                    return <LeavListItem index={index} item={item || {}} key={index} />;
                  })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}

function LeavListItem({ item, index }: { item: OverTime; index: number }) {
  // const x = ['fullday', 'morning', 'afternoon'].includes(item?.duration + '');
  let change = null;

  if (item.status === OverTimeStatus.Approved) {
    change = {
      date: item.approvedDate,
      by: item.approvedBy,
    };
  }

  if (item.status === OverTimeStatus.Rejected) {
    change = {
      date: item.rejectedDate,
      by: item.rejectedBy,
    };
  }

  if (item.status === OverTimeStatus.Cancelled) {
    change = {
      date: item.cancelledDate,
      by: item.cancelledBy,
    };
  }

  return (
    <IndexTable.Row key={index} id={item?.id + ''} position={index}>
      <IndexTable.Cell>{item?.otDate}</IndexTable.Cell>
      <IndexTable.Cell>{item.startat ? item?.startat : moment(item?.startat).format('YYYY-MM-DD')}</IndexTable.Cell>
      <IndexTable.Cell>{item.endAt ? item?.endAt : moment(item?.endAt).format('YYYY-MM-DD')}</IndexTable.Cell>
      <IndexTable.Cell>
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            source={item?.requestedBy?.profile + ''}
            initials={item?.requestedBy?.display
              ?.split(' ')
              .map((x) => x.charAt(0).toUpperCase())
              .join('')}
          />
          <div>
            <small>{item?.requestedBy?.display}</small>
            <br />
            <small>{item?.requestedDate}</small>
          </div>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>{item.note}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={toneStatus[item?.status || '']} size="small">
          {item?.status || ''}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {change && (
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              source={change?.by?.profile + ''}
              initials={change?.by?.display
                ?.split(' ')
                .map((x) => x.charAt(0).toUpperCase())
                .join('')}
            />
            <div>
              <small>{change?.by?.display}</small>
              <br />
              <small>{change?.date}</small>
            </div>
          </div>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell>{item.status === OverTimeStatus.Request && <ControllOt item={item} />}</IndexTable.Cell>
    </IndexTable.Row>
  );
}
