'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useReportStaffPayrollQuery } from '@/gql/graphql';
import downloadExcelFile from '@/lib/DownloadExcelFile';
import { Avatar, Box, Card, Icon, IndexTable, Layout, Text, TextField, Tooltip } from '@shopify/polaris';
import { InfoIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import React, { useCallback, useState } from 'react';

export function ReportPayrollStaffScreen() {
  const now = moment(new Date());
  const [filter, setFilter] = useState({
    fromDate: now.startOf('month').format('YYYY-MM-DD'),
    toDate: moment(new Date()).endOf('month').format('YYYY-MM-DD'),
  });
  const { data, loading } = useReportStaffPayrollQuery({
    variables: {
      from: filter.fromDate,
      to: filter.toDate,
    },
  });

  const list = data?.reportStaffPayroll.filter((f: any) => ![null, 'Shareholder'].includes(f.user.position));

  const handleDownloadExcel = useCallback(() => {
    const header = [
      'ID',
      'Staff Name',
      'Position',
      'Working',
      'Base Salary',
      'Absent',
      'Check In Late',
      'Check Out Early',
      'Uncheck Out',
      'OT',
      'Holiday Bonus',
      'Total Work',
      'Earning',
      'Deduction',
      'Net Pay',
    ];

    const items = list.map((x: any) => {
      const salaryCut =
        Number(x.absentPay) + Number(x.checkInLatePay) + Number(x.checkOutEarlyPay) + Number(x.checkOutEmptyPay);
      const salaryFixed = Number(x.totalWorkDays) * Number(x.user.salaryDay) + Number(x.ot.pay) + Number(x.holiday);
      return [
        `EMP${String(x.user.id).padStart(3, '0')}`,
        x.user.name,
        x.user.position || '--',
        `${x.user.work.from} - ${x.user.work.to} (${Math.abs(Number(x.user.work.duration))} hrs)`,
        x.user.salary || 0,
        `${x.absent || 0} ($${x.absentPay || 0})`,
        `${x.checkInLate || 0} ($${x.checkInLatePay || 0})`,
        `${x.checkOutEarly || 0} ($${x.checkOutEarlyPay || 0})`,
        `${x.checkOutEmpty || 0} ($${x.checkOutEmptyPay || 0})`,
        `${x.ot.duration || 0} hrs ($${x.ot.pay || 0})`,
        `$${x.holiday || 0}`,
        `${x.totalWorkDays || 0} days`,
        `$${salaryFixed.toFixed(2)}`,
        `$${salaryCut.toFixed(2)}`,
        `$${(salaryFixed - salaryCut).toFixed(2)}`,
      ];
    });

    downloadExcelFile(
      `Staff_Payroll_${filter.fromDate}_${filter.toDate}.xlsx`,
      `${filter.fromDate}-${filter.toDate} (${items.length})`,
      [header, ...(items as any[])],
    );
  }, [filter, list]);

  return (
    <PolarisLayout
      title="Staff Payroll"
      fullWidth
      permission={[role_permission.ADMIN, role_permission.MANAGER, role_permission.SUPER_ADMIN]}
      secondaryActions={[{ content: 'Download Excel', onAction: handleDownloadExcel }]}
    >
      <Layout>
        <Layout.Section>
          <Card padding={'0'}>
            <Box padding={'200'}>
              <div className="flex flex-row gap-2">
                <div>
                  <TextField
                    value={filter.fromDate}
                    type="date"
                    label
                    labelHidden
                    autoComplete="off"
                    size="slim"
                    onChange={(v) => {
                      setFilter({ ...filter, fromDate: v });
                    }}
                  />
                </div>
                <div>
                  <TextField
                    value={filter.toDate}
                    type="date"
                    label
                    labelHidden
                    autoComplete="off"
                    size="slim"
                    onChange={(v) => {
                      setFilter({ ...filter, toDate: v });
                    }}
                  />
                </div>
              </div>
            </Box>
            <Box padding={'0'}>
              <IndexTable
                headings={[
                  { title: '#' },
                  { title: 'Staff' },
                  { title: 'Position' },
                  { title: 'Working' },
                  { title: 'Base Salary' },
                  { title: 'Absent' },
                  { title: 'Check In Late' },
                  { title: 'Check Out Early' },
                  { title: 'Uncheck Out' },
                  { title: 'OT' },
                  { title: 'Holiday Bonus' },
                  { title: 'Total Work' },
                  { title: 'Earning' },
                  { title: 'Deduction' },
                  { title: 'Net Pay' },
                ]}
                itemCount={list?.length || 1}
                loading={loading}
                selectable={false}
              >
                {list?.map((x: any, i: number) => {
                  const salaryCut =
                    Number(x.absentPay) +
                    Number(x.checkInLatePay) +
                    Number(x.checkOutEarlyPay) +
                    Number(x.checkOutEmptyPay);
                  const salaryFixed =
                    Number(x.totalWorkDays) * Number(x.user.salaryDay) + Number(x.ot.pay) + Number(x.holiday);
                  return (
                    <IndexTable.Row key={i} id={i + ''} position={i}>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          EMP{String(x.user.id).padStart(3, '0')}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <div className="flex flex-row items-center gap-2">
                          <Avatar
                            initials={String(x.user.name)
                              .split(' ')
                              .map((x) => x.charAt(0).toUpperCase())
                              .join('')}
                            source={x.user.profile}
                          />
                          <Text as="p" variant="bodySm">
                            {x.user.name}
                          </Text>
                        </div>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {x.user.position || '--'}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {x.user.work.from} - {x.user.work.to} ({Math.abs(Number(x.user.work.duration))} hrs)
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Tooltip
                          content={
                            <div>
                              <div>Base Salary: ${x.user.salary || 0}</div>
                              <div>Salary Per Day: ${x.user.salaryDay || 0}</div>
                              <div>Salary Per Hour: ${x.user.salaryHour || 0}</div>
                            </div>
                          }
                        >
                          <div className="flex flex-row items-center gap-1">
                            <div className="w-10">
                              <Text as="p" variant="bodySm" tone="success">
                                ${x.user.salary || 0}
                              </Text>
                            </div>
                            <div>
                              <Icon source={InfoIcon} />
                            </div>
                          </div>
                        </Tooltip>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.absent > 0 ? 'critical' : 'base'}>
                          {x.absent || 0} (${x.absentPay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.checkInLate > 0 ? 'critical' : 'base'}>
                          {x.checkInLate || 0} (${x.checkInLatePay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.checkOutEarly > 0 ? 'critical' : 'base'}>
                          {x.checkOutEarly || 0} (${x.checkOutEarlyPay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.checkOutEmpty > 0 ? 'critical' : 'base'}>
                          {x.checkOutEmpty || 0} (${x.checkOutEmptyPay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.ot.duration > 0 ? 'success' : 'base'}>
                          {x.ot.duration || 0} hrs (${x.ot.pay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone={x.holiday > 0 ? 'success' : 'base'}>
                          ${x.holiday || 0}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone="success">
                          {x.totalWorkDays || 0} days
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone="success">
                          ${salaryFixed.toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone="critical">
                          ${salaryCut.toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm" tone="success">
                          ${(salaryFixed - salaryCut).toFixed(2)}
                        </Text>
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
  );
}
