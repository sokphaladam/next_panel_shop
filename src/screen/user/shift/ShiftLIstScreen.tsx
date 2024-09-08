'use client';

import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { useShiftListQuery } from '@/gql/graphql';
import { usePagination } from '@/hook/usePagination';
import { Box, Card, IndexTable, Layout } from '@shopify/polaris';
import { ShiftListItem } from './components/ShitListItem';
import { useUser } from '@/service/UserProvider';
import { useEffect, useState } from 'react';

export function ShiftListScreen() {
  const user = useUser();
  const [loadi, setloading] = useState(true);
  const [userids, setUserIds] = useState<any[]>([]);
  const { limit, offset, setOffset } = usePagination();
  const { data, loading } = useShiftListQuery({
    variables: {
      offset,
      limit,
      users: userids,
    },
  });

  useEffect(() => {
    if (user && !!loadi) {
      if ((user.role?.id || 0) > 2) {
        setUserIds([user?.id || 0]);
      }
      setloading(false);
    }
  }, [loadi, user]);

  return (
    <PolarisLayout title="Shift">
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: '#' },
                  { title: 'Staff Name' },
                  { title: 'Open' },
                  { title: 'Close' },
                  { title: 'Open Balance' },
                  { title: 'Close Balance' },
                  { title: 'Bank' },
                  { title: 'Qty. of bill' },
                  { title: 'Qty. of card' },
                  { title: 'Controls' },
                ]}
                itemCount={data?.shiftList?.length || 0}
                loading={loading}
                selectable={false}
                pagination={{
                  label: `${offset + 1} - ${limit * (offset + 1)}`,
                  hasNext: (data?.shiftList?.length || 0) >= limit,
                  hasPrevious: offset > 0,
                  onNext: () => setOffset(offset + 1),
                  onPrevious: () => setOffset(offset - 1),
                }}
              >
                {data &&
                  data?.shiftList?.map((shift) => {
                    return <ShiftListItem data={shift || {}} key={shift?.id} />;
                  })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
