'use client';
import { useGetAttendanceStaffQuery, useGetSummaryAttendanceStaffQuery } from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { useSetting } from '@/service/useSettingProvider';
import { Card, Box, ProgressBar, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

export function AttendanceStatisc() {
  const user = useUser();
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const setting = useSetting();
  const { data, loading } = useGetAttendanceStaffQuery({
    variables: {
      limit: 31,
      offset: 0,
      from: moment(firstDay).format('YYYY-MM-DD'),
      to: moment(lastDay).format('YYYY-MM-DD'),
    },
  });
  const querySummary = useGetSummaryAttendanceStaffQuery({
    skip: !user,
    variables: {
      userId: Number(user?.id),
    },
  });

  if (loading) {
    return <></>;
  }

  const start = user?.fromTime?.split(':')[0] + ':' + user?.fromTime?.split(':')[1];
  const end = user?.toTime?.split(':')[0] + ':' + user?.toTime?.split(':')[1];
  const break_time = setting.find((f) => f.option === 'DEFAULT_BREAKWORK')?.value;

  const hw = Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'));
  const hww = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7;
  const hwm = (Number(end?.replace(':', '.')) - Number(start?.replace(':', '.'))) * 7 * 4;

  const todayServer = data?.getAttendanceStaff?.find(
    (f) => new Date(f?.checkDate as any).getTime() === new Date(moment(today).format('YYYY-MM-DD')).getTime(),
  );

  const x = (querySummary.data?.getSummaryAttendanceStaff.today || 0 / hw) * 100;
  const y = (querySummary.data?.getSummaryAttendanceStaff.week || 0 / hww) * 100;
  const z = (querySummary.data?.getSummaryAttendanceStaff.month || 0 / hwm) * 100;

  return (
    <Card>
      <Box>
        <Text as="h3" variant="headingMd">
          Statistics
        </Text>
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>Today</div>
          <div>
            {querySummary.data?.getSummaryAttendanceStaff.today || 0} / {hw} hrs
          </div>
        </div>
        <ProgressBar size="small" animated progress={x} tone="success" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>This Week</div>
          <div>
            {querySummary.data?.getSummaryAttendanceStaff.week || 0} / {hww.toFixed(2)} hrs
          </div>
        </div>
        <ProgressBar size="small" animated progress={y} tone="highlight" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>This Month</div>
          <div>
            {querySummary.data?.getSummaryAttendanceStaff.month || 0} / {hwm.toFixed(2)} hrs
          </div>
        </div>
        <ProgressBar size="small" animated progress={z} tone="primary" />
      </Box>
      <br />
      <Box background="bg-fill" borderRadius="200" padding={'300'} borderColor="border-secondary" borderWidth="025">
        <div className="flex flex-row justify-between items-center">
          <div>Overtime</div>
          <div>
            {querySummary.data?.getSummaryAttendanceStaff.ot || 0} / {10}
          </div>
        </div>
        <ProgressBar
          size="small"
          animated
          progress={(querySummary.data?.getSummaryAttendanceStaff.ot || 0 / 10) * 100}
          tone="critical"
        />
      </Box>
    </Card>
  );
}
