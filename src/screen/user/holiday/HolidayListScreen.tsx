'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useHolidayListQuery } from '@/gql/graphql';
import { Box, Card, IndexTable, Layout, Text } from '@shopify/polaris';
import React, { useState } from 'react';
import { FormHoliday } from './components/FormHoliday';
import { PopoverEditControl } from '@/components/custom/PopoverEdit';

export function HolidayListScreen() {
  const [active, setActive] = useState(false);
  const [holidayId, setHolidayId] = useState(0);
  const { data, loading } = useHolidayListQuery();

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <PolarisLayout
          title="Public Holiday"
          permission={[role_permission.ADMIN, role_permission.SUPER_ADMIN, role_permission.MANAGER]}
          primaryAction={{ content: 'Create', onAction: () => setActive(true) }}
        >
          {active && (
            <FormHoliday
              title={`Public Holiday ${holidayId > 0 ? '#' + holidayId : ''}`}
              active={active}
              setActive={(v) => {
                setActive(v);
                if (v === false) {
                  setHolidayId(0);
                }
              }}
              id={holidayId}
            />
          )}
          <Layout>
            <Layout.Section>
              <Card padding={'0'}>
                <Box padding={'0'}>
                  <IndexTable
                    headings={[{ title: 'Date' }, { title: 'Name' }, { title: 'Extra' }, { title: 'Controls' }]}
                    itemCount={data?.holidayList?.length || 0}
                    loading={loading}
                    selectable={false}
                  >
                    {data &&
                      data.holidayList?.map((row) => {
                        return (
                          <IndexTable.Row key={row?.id} position={row?.id || 0} id={row?.id + ''}>
                            <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                              <Text as="p" variant="bodySm">
                                {row?.date}
                              </Text>
                            </IndexTable.Cell>
                            <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                              <Text as="p" variant="bodySm">
                                {row?.name}
                              </Text>
                            </IndexTable.Cell>
                            <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                              <Text as="p" variant="bodySm">
                                X{row?.extra}
                              </Text>
                            </IndexTable.Cell>
                            <IndexTable.Cell>
                              <PopoverEditControl
                                id={row?.id || 0}
                                onEdit={(v: any) => {
                                  setHolidayId(v);
                                  setActive(true);
                                }}
                              />
                            </IndexTable.Cell>
                          </IndexTable.Row>
                        );
                      })}
                  </IndexTable>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        </PolarisLayout>
      </Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
      <Layout.Section variant="oneThird"></Layout.Section>
    </Layout>
  );
}
