'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { useReportSaleByDayQuery } from '@/gql/graphql';
import downloadExcelFile from '@/lib/DownloadExcelFile';
import { IndexTable, Layout, Text, Card, Box, TextField } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useState } from 'react';

export function ReportSaleByDayScreen() {
  const now = moment(new Date());
  const [filter, setFilter] = useState({
    fromDate: moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD'),
    toDate: now.format('YYYY-MM-DD'),
  });
  const { data, loading } = useReportSaleByDayQuery({
    variables: {
      from: filter.fromDate,
      to: filter.toDate,
    },
  });

  const handleDownloadExcel = useCallback(() => {
    const header = [
      'Date',
      'Qty',
      'Total Amount',
      'Total Discount',
      'Total After Discount',
      ...data?.reportSaleByDay.header.map((x: any) => {
        return x.split('(')[1].replace(')', '');
      }),
    ];

    const items = data?.reportSaleByDay.data.map((x: any) => {
      const product = data.reportSaleByDay.header.map((h: any) =>
        x[h].qty === 0 ? '--' : `${x[h].qty} ($${x[h].total})`,
      );
      return [
        x.date,
        x.qty,
        Number(x.totalAmount).toFixed(2),
        Number(x.totalDiscount).toFixed(2),
        Number(x.totalAfterDiscount).toFixed(2),
        ...product,
      ];
    });

    downloadExcelFile(
      `Sale By Day Report ${moment(new Date()).format('YYYY-MM-DD HH_mm_ss')}.xlsx`,
      `${filter.fromDate}-${filter.toDate} (${items.length})`,
      [header, ...(items as any[])],
    );
  }, [data, filter]);

  return (
    <PolarisLayout
      title="Sale By Day"
      fullWidth
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
                headings={
                  data?.reportSaleByDay
                    ? [
                        { title: 'Date' },
                        { title: 'Qty' },
                        { title: 'Total Amount' },
                        { title: 'Total Discount' },
                        { title: 'Total After Discount' },
                        ...data.reportSaleByDay.header.map((x: any) => {
                          return {
                            title: x.split('(')[1].replace(')', ''),
                            alignment: 'end',
                          };
                        }),
                      ]
                    : [{ title: '' }]
                }
                loading={loading}
                itemCount={data?.reportSaleByDay.data.length || 0}
                selectable={false}
              >
                {data?.reportSaleByDay.data.map((x: any, i: number) => {
                  return (
                    <IndexTable.Row key={i} id={i + ''} position={i}>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {x.date}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {x.qty}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.totalAmount).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.totalDiscount).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.totalAfterDiscount).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      {data.reportSaleByDay.header.map((h: any, ii: number) => {
                        return (
                          <IndexTable.Cell key={ii} className="border-collapse border-solid border-r-[0.5px]">
                            <Text
                              as="p"
                              variant="bodySm"
                              alignment={ii === data.reportSaleByDay.header.length - 1 ? 'end' : 'end'}
                            >
                              {x[h].qty === 0 ? '--' : `${x[h].qty} ($${x[h].total})`}
                            </Text>
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
