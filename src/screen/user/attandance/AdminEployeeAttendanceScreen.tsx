'use client';
import React, { useCallback, useState } from 'react';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import {
  Avatar,
  Box,
  Card,
  DataTable,
  Icon,
  IndexTable,
  Layout,
  Select,
  Tooltip,
  useIndexResourceState,
} from '@shopify/polaris';
import { useAttendanceListAdminQuery, User, useUserListQuery } from '@/gql/graphql';
import { IndexTableHeading } from '@shopify/polaris/build/ts/src/components/IndexTable';
import { NonEmptyArray } from '@shopify/polaris/build/ts/src/types';
import moment from 'moment';
import { useSetting } from '@/service/useSettingProvider';
import { CheckSmallIcon, InfoIcon, MinusCircleIcon, XSmallIcon } from '@shopify/polaris-icons';
import { groupBy } from '@/lib/grouBy';
import { Modal } from '@/hook/modal';
import downloadExcelFile from '@/lib/DownloadExcelFile';

function getDayOfMonth(year: number, month: number) {
  const last_day_of_month = new Date(year, month + 1, 0).getDate();

  return [...new Array(last_day_of_month)].map((_, i) => {
    return i;
  });
}

function getDiffHour(start: any, end: any) {
  return moment(end).diff(moment(start), 'hour');
}

export default function AdminEployeeAttendanceScreen() {
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

  const handleClickAttendance = useCallback((logs: any[]) => {
    const log = logs[0];
    Modal.dialog({
      title: `Attendance ${log.checkDate}`,
      flush: true,
      body: [
        <div key={0}>
          <DataTable
            headings={['#', '']}
            rows={[
              ['Staff Name', log.user],
              ['Check In', log.checkIn === 'Invalid date' ? '--' : log.checkIn],
              ['Check Out', log.checkOut === 'Invalid date' ? '--' : log.checkOut],
              ['Duration', isNaN(log.hour) ? '--' : log.hour],
              ['Status', log.type],
              ['Leave', log.leave ? `#LVE${log.leave.id} (${log.leave.leaveReason})` : '--'],
            ]}
            columnContentTypes={['text', 'text']}
          />
        </div>,
      ],
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const heading: NonEmptyArray<IndexTableHeading> = [
    { title: '#' },
    ...getDayOfMonth(Number(selectYear), Number(selectMonth)).map((x) => {
      return {
        title: (x + 1).toString().padStart(2, '0') + '',
      };
    }),
  ];

  const group = groupBy(data?.attendanceListAdmin || [], ({ user }: any) => (user ? user.id : 0));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = queryUser.data
    ? (queryUser.data as any).userList
        .filter((x: any) => x?.type === 'STAFF' && !!x.isActive && ![null, 'Shareholder'].includes(x.position))
        .map((x: any) => ({ ...x, id: String(x.id + '') })) || []
    : [];

  const { selectedResources, handleSelectionChange } = useIndexResourceState(users);

  const handleReportAttendance = useCallback(() => {
    const days = getDayOfMonth(Number(selectYear), Number(selectMonth));
    const items = users
      .filter((f: any) => selectedResources.includes(f.id + ''))
      .map((x: any) => {
        const checklist = group[x?.id || 0] ? group[x?.id || 0] || [] : [];
        return [
          x.display,
          `${x.fromTime}-${x.toTime}`,
          ...days.map((d) => {
            const find = checklist.filter((f: any) => {
              const c = moment(f.checkDate).date();
              return c === d + 1;
            });
            const date = find.length > 0 ? find[0] : null;
            if (date) {
              if (date.type === 'WORK') {
                const cin: any = date.checkIn ? moment(date.checkIn).format('HH:mm') : '--';
                const cout: any = date.checkOut ? moment(date.checkOut).format('HH:mm') : '--';
                const st = moment(date.checkDate + ' ' + x.fromTime);
                const ed = moment(date.checkDate + ' ' + x.toTime);

                const diffcin = st.diff(moment(date.checkDate + ' ' + cin), 'minutes') / 60;

                const diffcout = moment(date.checkDate + ' ' + cout).diff(ed, 'minutes') / 60;

                return `${cin} - ${cout} (CIN: ${diffcin.toFixed(2)}, COUT: ${diffcout.toFixed(2)})`;
              }

              return date.type;
            }
            return '--';
          }),
        ];
      });

    const excel = [
      [
        'Staff',
        'Work Time',
        ...heading
          .filter((f) => f.title !== '#')
          .map((x) =>
            isNaN(Number(x.title))
              ? x.title
              : moment(`${selectYear}-${Number(selectMonth) + 1}-${x.title}`).format('DD-ddd'),
          ),
      ],
      ...items,
    ];

    downloadExcelFile(
      `Attendance Staff ${selectYear}-${Number(selectMonth) + 1}.xlsx`,
      `${selectYear}-${Number(selectMonth) + 1}`,
      excel,
    );
  }, [selectYear, selectMonth, users, heading, selectedResources, group]);

  return (
    <PolarisLayout
      title="Attendance"
      fullWidth
      subtitle={
        (
          <div>
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
            <br />
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-green-700 text-white">
                  <Icon source={CheckSmallIcon} tone="inherit" />
                </div>
                <div>Work Or Leave</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-orange-600 text-white">
                  <Icon source={MinusCircleIcon} tone="inherit" />
                </div>
                <div>Incomplete Attendance</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-red-700 text-white">
                  <Icon source={XSmallIcon} tone="inherit" />
                </div>
                <div>Absent</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-yellow-500 text-white">
                  <Icon source={InfoIcon} tone="inherit" />
                </div>
                <div>Public Holiday</div>
              </div>
            </div>
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
                itemCount={users.length || 0}
                // selectable={false}
                loading={loading}
                selectedItemsCount={selectedResources.length === users.length ? 'All' : selectedResources.length}
                onSelectionChange={handleSelectionChange}
                promotedBulkActions={[{ content: 'Report Attendance', onAction: handleReportAttendance }]}
              >
                {users.map((user: User) => {
                  const checklist = group[user?.id || 0] ? group[user?.id || 0] || [] : [];
                  return (
                    <IndexTable.Row
                      key={user?.id}
                      position={user?.id || 0}
                      id={String(user?.id)}
                      selected={selectedResources.includes(String(user?.id))}
                      onClick={() => {}}
                    >
                      <IndexTable.Cell>
                        <div className="flex flex-row gap-2 items-center">
                          <Avatar
                            source={user?.profile || ''}
                            initials={user?.display
                              ?.split(' ')
                              .map((s) => s.charAt(0).toUpperCase())
                              .join('')}
                          />
                          <div>{user?.display}</div>
                        </div>
                      </IndexTable.Cell>
                      {getDayOfMonth(Number(selectYear), Number(selectMonth)).map((d) => {
                        const find = checklist.filter((f: any) => {
                          const c = moment(f.checkDate).date();
                          return c === d + 1;
                        });

                        const start = user?.fromTime;
                        const end = user?.toTime;

                        const diff = moment(
                          new Date().setHours(Number(end?.split(':')[0]), Number(end?.split(':')[1])),
                        ).diff(
                          moment(new Date().setHours(Number(start?.split(':')[0]), Number(start?.split(':')[1]))),
                          'hour',
                        );

                        const checkDiff = find.reduce((a: any, b: any) => {
                          const defaultEnd = moment(new Date(b.checkDate).setHours(Number(end?.replace(':', '.'))));
                          const defaultStart = moment(new Date(b.checkDate).setHours(Number(start?.replace(':', '.'))));
                          const checkIn = b.checkIn ? moment(new Date(b.checkIn)) : defaultStart;
                          const checkOut = b.checkOut ? moment(new Date(b.checkOut)) : defaultEnd;

                          const d = checkOut.diff(checkIn, 'hour');
                          return (a = a + d);
                        }, 0);

                        const logs = find.map((x: any) => {
                          const defaultEnd = moment(new Date(x.checkDate).setHours(Number(end?.replace(':', '.'))));
                          const defaultStart = moment(new Date(x.checkDate).setHours(Number(start?.replace(':', '.'))));
                          const checkIn = x.checkIn ? moment(new Date(x.checkIn)) : defaultStart;
                          const checkOut = x.checkOut ? moment(new Date(x.checkOut)) : defaultEnd;
                          return {
                            ...x,
                            checkIn: checkIn.format('MM-DD hh:mm A'),
                            checkOut: checkOut.format('MM-DD hh:mm A'),
                            hour: (checkOut.diff(checkIn, 'minutes') / 60).toFixed(2),
                            user: x.user.display,
                          };
                        });

                        const date = find.length > 0 ? find[0].checkDate : null;

                        return (
                          <IndexTable.Cell key={d}>
                            {d !== null && d < moment(date).date() ? (
                              <Tooltip
                                width="wide"
                                content={
                                  <div className="bg-white">
                                    {logs.map((log: any, i: number) => {
                                      if (log.type === 'LEAVE_REQUEST' && log.leave) {
                                        return (
                                          <div key={i}>
                                            <div className="flex flex-row items-center gap-1">
                                              <small>
                                                {log.type}: #LVE{log.leave.id}
                                              </small>
                                            </div>
                                          </div>
                                        );
                                      }
                                      if (log.type === 'ABSENT') {
                                        return (
                                          <div key={i}>
                                            <div className="flex flex-row items-center gap-1">
                                              <small>{log.type}</small>
                                            </div>
                                          </div>
                                        );
                                      }
                                      if (log.type === 'DAY_OFF') {
                                        return (
                                          <div key={i}>
                                            <div className="flex flex-row items-center gap-1">
                                              <small>{log.type}</small>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={i}>
                                          <div className="flex flex-row items-center gap-1">
                                            <small>{log.checkIn}</small>
                                            <small>-</small>
                                            <small>{log.checkOut === 'Invalid date' ? '--' : log.checkOut}</small>
                                            <small>=</small>
                                            <small
                                              className={
                                                log.checkOut === 'Invalid date'
                                                  ? 'text-orange-600'
                                                  : checkDiff >= diff
                                                  ? 'text-green-700'
                                                  : checkDiff === 0
                                                  ? 'text-slate-500'
                                                  : 'text-red-700'
                                              }
                                            >
                                              {isNaN(log.hour) ? '--' : log.hour}
                                            </small>
                                          </div>
                                          <div className="border-collapse border-t-[0.5px] border-solid">
                                            <small>{log.user}</small>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                }
                              >
                                <div onClick={() => handleClickAttendance(logs)}>
                                  {logs.find((f: any) => f.type === 'ABSENT') ? (
                                    <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-red-700 text-white">
                                      <Icon source={XSmallIcon} tone="inherit" />
                                    </div>
                                  ) : logs.find((f: any) => f.type === 'LEAVE_REQUEST') ? (
                                    <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-green-700 text-white">
                                      <Icon source={CheckSmallIcon} tone="inherit" />
                                    </div>
                                  ) : logs.find((f: any) => f.type === 'DAY_OFF') ? (
                                    <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-yellow-500 text-white">
                                      <Icon source={InfoIcon} tone="inherit" />
                                    </div>
                                  ) : (
                                    <>
                                      {checkDiff >= diff ? (
                                        <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-green-700 text-white">
                                          <Icon source={CheckSmallIcon} tone="inherit" />
                                        </div>
                                      ) : checkDiff === 0 ? (
                                        <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-slate-500 text-white">
                                          {/* <Icon source={MinusCircleIcon} tone="inherit" /> */}
                                        </div>
                                      ) : (
                                        <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-orange-600 text-white">
                                          <Icon source={MinusCircleIcon} tone="inherit" />
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="p-[1px] w-[15px] h-[15px] rounded-full bg-slate-500 text-white">{}</div>
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
