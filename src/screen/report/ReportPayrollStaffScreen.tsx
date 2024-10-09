'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { useReportStaffPayrollQuery } from '@/gql/graphql';
import { Box, Card, Icon, IndexTable, Layout, Text, TextField, Tooltip } from '@shopify/polaris';
import { InfoIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import React, { useState } from 'react';

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

  return (
    <PolarisLayout
      title="Staff Payroll"
      fullWidth
      permission={[role_permission.ADMIN, role_permission.MANAGER, role_permission.SUPER_ADMIN]}
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
                  { title: 'OT' },
                  { title: 'Holiday Bonus' },
                  { title: 'Earning' },
                  { title: 'Deduction' },
                  { title: 'Net Pay' },
                ]}
                itemCount={data?.reportStaffPayroll?.length || 1}
                loading={loading}
                selectable={false}
              >
                {data?.reportStaffPayroll?.map((x: any, i: number) => {
                  const salaryCut = Number(x.absentPay) + Number(x.checkInLatePay) + Number(x.checkOutEarlyPay);
                  const salaryFixed = Number(x.user.salary) + Number(x.ot.pay) + Number(x.holiday);
                  return (
                    <IndexTable.Row key={i} id={i + ''} position={i}>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm">
                          EMP{String(x.user.id).padStart(3, '0')}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm">
                          {x.user.name}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm">
                          {x.user.position || '--'}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm">
                          {x.user.work.from} - {x.user.work.to} ({Math.abs(Number(x.user.work.duration))} hrs)
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
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
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone={x.absent > 0 ? 'critical' : 'base'}>
                          {x.absent || 0} (${x.absentPay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone={x.checkInLate > 0 ? 'critical' : 'base'}>
                          {x.checkInLate || 0} (${x.checkInLatePay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone={x.checkOutEarly > 0 ? 'critical' : 'base'}>
                          {x.checkOutEarly || 0} (${x.checkOutEarlyPay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone={x.ot.duration > 0 ? 'success' : 'base'}>
                          {x.ot.duration || 0} hrs (${x.ot.pay || 0})
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone={x.holiday > 0 ? 'success' : 'base'}>
                          ${x.holiday || 0}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone="success">
                          ${salaryFixed.toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="p" variant="bodySm" tone="critical">
                          ${salaryCut.toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
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
