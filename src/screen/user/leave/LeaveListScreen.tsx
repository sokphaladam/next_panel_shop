'use client';

import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { Leave, LeaveStatus, useLeaveListQuery } from '@/gql/graphql';
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
import { ControllLeave } from './components/ControllLeave';
import { useState } from 'react';

const toneStatus: any = {
  [LeaveStatus.Request]: 'attention-strong',
  [LeaveStatus.Approved]: 'success-strong',
  [LeaveStatus.Rejected]: 'critical-strong',
  [LeaveStatus.Cancelled]: 'new',
};

const tabs: TabProps[] = [
  {
    content: 'Pending',
    id: LeaveStatus.Request,
  },
  {
    content: 'Approved',
    id: LeaveStatus.Approved,
  },
  {
    content: 'Rejected',
    id: LeaveStatus.Rejected,
  },
  {
    content: 'Cancelled',
    id: LeaveStatus.Cancelled,
  },
];

export function LeaveListScreen() {
  const [select, setSelect] = useState(0);
  const { limit, offset, setOffset, handleResetPage } = usePagination();
  const [searchInput, setSearchInput] = useState('');
  const { mode, setMode } = useSetIndexFiltersMode();

  const { data, loading } = useLeaveListQuery({
    variables: {
      offset: offset * limit,
      limit,
      status: [tabs[select].id as any],
    },
  });

  return (
    <PolarisLayout fullWidth title={'Leave List'} primaryAction={{ content: 'Request Leave', url: '/leave/create' }}>
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
              />
            </Box>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: 'Start Date' },
                  { title: 'End Date' },
                  { title: 'Duration' },
                  { title: 'Request By' },
                  {
                    title: 'Reason',
                  },
                  { title: 'Status' },
                  { title: 'Change Status' },
                  { title: 'Control' },
                ]}
                itemCount={data?.leaveList?.length || 0}
                selectable={false}
                loading={loading}
                pagination={{
                  label: `${offset * limit + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.leaveList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1),
                }}
              >
                {data &&
                  data.leaveList?.map((item, index) => {
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

function LeavListItem({ item, index }: { item: Leave; index: number }) {
  const x = ['fullday', 'morning', 'afternoon'].includes(item?.duration + '');
  let change = null;

  if (item.status === LeaveStatus.Approved) {
    change = {
      date: item.approvedDate,
      by: item.approvedBy,
    };
  }

  if (item.status === LeaveStatus.Rejected) {
    change = {
      date: item.rejectedDate,
      by: item.rejectedBy,
    };
  }

  if (item.status === LeaveStatus.Cancelled) {
    change = {
      date: item.cancelledDate,
      by: item.cancelledBy,
    };
  }

  return (
    <IndexTable.Row key={index} id={item?.id + ''} position={index}>
      <IndexTable.Cell>{!x ? item?.startDate : moment(item?.startDate).format('YYYY-MM-DD')}</IndexTable.Cell>
      <IndexTable.Cell>{!x ? item?.endDate : moment(item?.endDate).format('YYYY-MM-DD')}</IndexTable.Cell>
      <IndexTable.Cell>{item?.duration}</IndexTable.Cell>
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
      <IndexTable.Cell>{item.leaveReason}</IndexTable.Cell>
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
      <IndexTable.Cell>{item.status === LeaveStatus.Request && <ControllLeave item={item} />}</IndexTable.Cell>
    </IndexTable.Row>
  );
}
