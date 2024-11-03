'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useOrderScheduleListQuery } from '@/gql/graphql';
import { Box, Button, Card, Icon, IndexTable, Layout, Link, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { DeleteOrderSchedule } from './components/DeleteOrderSchedule';

const arrayRange = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);

export function OrderScheduleScreen() {
  const today = moment(new Date()).format('YYYY-MM-DD');
  const { data, loading } = useOrderScheduleListQuery();

  const list = data ? data.orderScheduleList : [];
  const startTime: number[] = list?.map((x) => moment(today + ' ' + x?.startAt).hours()) || [];
  const endTime: number[] = list?.map((x) => moment(today + ' ' + x?.endAt).hours()) || [];

  const min = Math.min(...startTime);
  const max = Math.max(...endTime);

  const arrTimes = arrayRange(min, max);

  const heading: any = list
    ? [{ title: 'Name' }, ...arrTimes.map((_) => ({ title: _ + ':00' })), { title: '' }]
    : [{ title: 'Name' }];

  return (
    <PolarisLayout
      title="Order Schedule"
      fullWidth
      permission={[
        role_permission.ADMIN,
        role_permission.SUPER_ADMIN,
        role_permission.MANAGER,
        role_permission.CASHIER,
      ]}
      primaryAction={{ content: 'Create New', url: '/order/schedule/create' }}
    >
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable headings={heading} itemCount={list?.length || 0} selectable={false} loading={loading}>
                {list?.map((x, i) => {
                  const times = arrayRange(Number(x?.startAt?.split(':')[0]), Number(x?.endAt?.split(':')[0]));
                  return (
                    <IndexTable.Row key={i} id={i + ''} position={i}>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm">
                          {x?.name || ''}
                        </Text>
                      </IndexTable.Cell>
                      {arrTimes.map((arr, arri) => {
                        const isInRange = times.includes(arr);
                        const position = arrTimes.findIndex((f) => f === times[Math.round(times.length / 2)]);
                        const lastPosition = arrTimes.findIndex((f) => f === times[times.length - 1]);
                        const firstPosition = arrTimes.findIndex((f) => f === times[0]);
                        const fixedWidth = 100 / arrTimes.length;
                        return (
                          <IndexTable.Cell key={arr} className={`!p-0 !w-[${fixedWidth}%]`}>
                            <div
                              className={`${
                                isInRange ? 'bg-green-800 shadow-lg' : ''
                              } my-1 w-full h-11 text-white flex items-center flex-row cursor-pointer relative ${
                                lastPosition === arri ? 'justify-end w-1/2' : ''
                              }`}
                            >
                              <small className="flex flex-row items-end justify-end">
                                {position === arri && `(${x?.items?.length} items)`}
                              </small>
                              {firstPosition === arri && (
                                <div className="flex flex-row items-center justify-end absolute">
                                  <Link url={`/order/schedule/edit/${x?.id}`}>
                                    <div className="bg-sky-700 text-white h-11 px-3 flex flex-row justify-center">
                                      <Icon source={EditIcon} tone="inherit" />
                                    </div>
                                  </Link>
                                  <DeleteOrderSchedule id={x?.id || 0} />
                                  {/* <Button icon={DeleteIcon} tone="critical" variant="tertiary"></Button>
                                  <Button icon={DeleteIcon} tone="critical" variant="tertiary"></Button> */}
                                </div>
                              )}
                            </div>
                          </IndexTable.Cell>
                        );
                      })}
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
