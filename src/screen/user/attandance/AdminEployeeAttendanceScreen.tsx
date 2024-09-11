'use client';
import React, { useState } from 'react';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { Avatar, Box, Card, Icon, IndexTable, Layout, Select, Tooltip } from '@shopify/polaris';
import { useAttendanceListAdminQuery, useUserListQuery } from '@/gql/graphql';
import { IndexTableHeading } from '@shopify/polaris/build/ts/src/components/IndexTable';
import { NonEmptyArray } from '@shopify/polaris/build/ts/src/types';
import moment from 'moment';
import { useSetting } from '@/service/useSettingProvider';
import { CheckSmallIcon, XSmallIcon } from '@shopify/polaris-icons';
import { groupBy } from '@/lib/grouBy';

function getDayOfMonth(year: number, month: number) {
  const last_day_of_month = new Date(year, month + 1, 0).getDate();

  return [...new Array(last_day_of_month)].map((_, i) => {
    return i;
  });
}

function getDiffHour(start: any, end: any) {
  return moment(end).diff(moment(start), 'hour');
}

export function AdminEployeeAttendanceScreen() {
  const setting = useSetting();
  const today = moment(new Date());
  const [selectMonth, setSelectMonth] = useState<any>(today.month());
  const [selectYear, setSelectYear] = useState<any>(today.year());
  const { data, loading } = useAttendanceListAdminQuery({
    variables: {
      month: Number(selectMonth) + 1,
      year: Number(selectYear),
    },
  });
  const queryUser = useUserListQuery({
    variables: {
      limit: 10000,
      offset: 0,
    },
  });

  const heading: NonEmptyArray<IndexTableHeading> = [
    { title: '#' },
    ...getDayOfMonth(Number(selectYear), Number(selectMonth)).map((x) => {
      return {
        title: (x + 1).toString().padStart(2, '0') + '',
      };
    }),
  ];

  const group = groupBy(data?.attendanceListAdmin || [], ({ user }: any) => user.id);

  const start = setting.find((f) => f.option === 'DEFAULT_STARTWORK')?.value;
  const end = setting.find((f) => f.option === 'DEFAULT_ENDWORK')?.value;

  const diff = getDiffHour(
    new Date().setHours(Number(start?.replace(':', '.'))),
    new Date().setHours(Number(end?.replace(':', '.'))),
  );

  return (
    <PolarisLayout
      title="Attendance"
      fullWidth
      subtitle={
        (
          <div suppressHydrationWarning className="flex flex-row gap-2 items-center">
            <Select
              options={[...new Array(12)].map((_, i) => {
                return {
                  label: (i + 1).toString().padStart(2, '0'),
                  value: i + '',
                };
              })}
              label="Month"
              value={selectMonth + ''}
              onChange={setSelectMonth}
            />
            <Select
              options={[...new Array(5)].map((_, i) => {
                return {
                  label: (today.year() - i).toString(),
                  value: (today.year() - i).toString(),
                };
              })}
              label="Year"
              value={selectYear + ''}
              onChange={setSelectYear}
            />
          </div>
        ) as any
      }
    >
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'0'}>
              <IndexTable
                headings={heading}
                itemCount={data?.attendanceListAdmin?.length || 0}
                selectable={false}
                loading={loading}
              >
                {queryUser.data &&
                  queryUser.data.userList
                    ?.filter((x) => x?.type === 'STAFF')
                    .map((x) => {
                      const checklist = group[x?.id || 0] ? group[x?.id || 0] || [] : [];
                      // console.log(x?.id, checklist);
                      return (
                        <IndexTable.Row key={x?.id} position={x?.id || 0} id={x?.id + ''}>
                          <IndexTable.Cell>
                            <div className="flex flex-row gap-2 items-center">
                              <Avatar
                                source={x?.profile || ''}
                                initials={x?.display
                                  ?.split(' ')
                                  .map((s) => s.charAt(0).toUpperCase())
                                  .join('')}
                              />
                              <div>{x?.display}</div>
                            </div>
                          </IndexTable.Cell>
                          {getDayOfMonth(Number(selectYear), Number(selectMonth)).map((d) => {
                            const find = checklist.filter((f: any) => {
                              const c = moment(f.checkDate).date();
                              return c === d;
                            });

                            const checkDiff = find.reduce((a: any, b: any) => {
                              const defaultEnd = moment(new Date(b.checkDate).setHours(Number(end?.replace(':', '.'))));
                              const defaultStart = moment(
                                new Date(b.checkDate).setHours(Number(start?.replace(':', '.'))),
                              );
                              const checkIn = b.checkIn ? moment(new Date(b.checkIn)) : defaultStart;
                              const checkOut = b.checkOut ? moment(new Date(b.checkOut)) : defaultEnd;

                              const d = checkOut.diff(checkIn, 'hour');
                              return (a = a + d);
                            }, 0);

                            const logs = find.map((x: any) => {
                              const defaultEnd = moment(new Date(x.checkDate).setHours(Number(end?.replace(':', '.'))));
                              const defaultStart = moment(
                                new Date(x.checkDate).setHours(Number(start?.replace(':', '.'))),
                              );
                              const checkIn = x.checkIn ? moment(new Date(x.checkIn)) : defaultStart;
                              const checkOut = x.checkOut ? moment(new Date(x.checkOut)) : defaultEnd;
                              return {
                                checkIn: defaultStart.format('HH:mm'),
                                checkOut: defaultEnd.format('HH:mm'),
                                hour: checkOut.diff(checkIn, 'hour'),
                              };
                            });

                            return (
                              <IndexTable.Cell key={d}>
                                {d <= moment(new Date()).date() && (
                                  <Tooltip
                                    content={
                                      <div>
                                        {logs.map((log: any, i: number) => {
                                          return (
                                            <div key={i} className="flex flex-row items-center gap-2">
                                              <small>{log.checkIn}</small>
                                              <small>-</small>
                                              <small>{log.checkOut}</small>
                                              <small>=</small>
                                              <small
                                                className={
                                                  checkDiff >= 8
                                                    ? 'text-green-700'
                                                    : checkDiff === 0
                                                    ? 'text-slate-500'
                                                    : 'text-red-700'
                                                }
                                              >
                                                {log.hour}
                                              </small>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    }
                                  >
                                    {checkDiff >= 8 ? (
                                      <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-green-700 text-white">
                                        <Icon source={CheckSmallIcon} tone="inherit" />
                                      </div>
                                    ) : checkDiff === 0 ? (
                                      <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-slate-500 text-white">
                                        {/* <Icon source={MinusCircleIcon} tone="inherit" /> */}
                                      </div>
                                    ) : (
                                      <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-red-700 text-white">
                                        <Icon source={XSmallIcon} tone="inherit" />
                                      </div>
                                    )}
                                  </Tooltip>
                                )}
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
