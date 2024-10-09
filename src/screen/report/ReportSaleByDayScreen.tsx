'use client';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { useReportSaleByDayQuery } from '@/gql/graphql';
import { IndexTable, Layout, Text } from '@shopify/polaris';
import React from 'react';

export function ReportSaleByDayScreen() {
  const { data, loading } = useReportSaleByDayQuery({
    variables: {
      from: '2024-10-01',
      to: '2024-10-30',
    },
  });

  return (
    <PolarisLayout title="Sale By Day" fullWidth>
      <Layout>
        <Layout.Section>
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
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
