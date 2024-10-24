'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import { ReportSaleGroupBy, useReportSaleProductQuery } from '@/gql/graphql';
import { Box, Card, IndexTable, Select, Text, TextField, Thumbnail } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { SaleProductFilter } from './components/sale/SaleProductFilter';
import downloadExcelFile from '@/lib/DownloadExcelFile';

export function ReportSaleProductScreen() {
  const now = moment(new Date());
  const [filter, setFilter] = useState({
    fromDate: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
    toDate: now.format('YYYY-MM-DD'),
    filters: {
      category: [],
    },
    groupBy: ReportSaleGroupBy.Product,
  });

  const { data, loading } = useReportSaleProductQuery({
    variables: {
      from: filter.fromDate,
      to: filter.toDate,
      filters: filter.filters,
      groupBy: filter.groupBy,
    },
  });

  const handleDownloadExcel = useCallback(() => {
    const header =
      filter.groupBy === ReportSaleGroupBy.Product
        ? ['Date', 'Category', 'Product', 'Qty', 'Price', 'Total Amount']
        : [
            'Date',
            'Cash',
            'ABA Bank',
            'Discount',
            'Total Amount',
            'Total Customers',
            'Average Spending',
            'Qty. of bills',
            'Qty. of card slips',
          ];

    const items = data?.reportSaleProduct.map((x: any) => {
      if (filter.groupBy === ReportSaleGroupBy.Product) {
        return [x.data, x.categoryName, x.productName, x.qty, x.price, Number(Number(x.amount).toFixed(2))];
      }
      return [
        x.date,
        Number(Number(x.cash).toFixed(2)),
        Number(Number(x.aba).toFixed(2)),
        Number(Number(x.discount).toFixed(2)),
        Number(Number(x.amount).toFixed(2)),
        Number(Number(x.customer).toFixed(0)),
        Number((Number(x.amount) / Number(x.customer)).toFixed(2)),
        Number(x.bill),
        Number(x.card),
      ];
    });

    downloadExcelFile(
      `Sale Product Report ${moment(new Date()).format('YYYY-MM-DD HH_mm_ss')}.xlsx`,
      `${filter.fromDate}-${filter.toDate} (${items.length})`,
      [header, ...(items as any[])],
    );
  }, [data, filter]);

  return (
    <PolarisLayout
      title="Report Product"
      permission={[
        role_permission.ADMIN,
        role_permission.SUPER_ADMIN,
        role_permission.MANAGER,
        role_permission.CASHIER,
      ]}
      secondaryActions={[{ content: 'Download Excel', onAction: handleDownloadExcel }]}
    >
      <Card padding={'0'}>
        <Box padding={'0'}>
          <SaleProductFilter filter={filter} setFilter={setFilter} />
        </Box>
        <Box padding={'0'}>
          <IndexTable
            headings={
              filter.groupBy === ReportSaleGroupBy.Product
                ? [
                    { title: 'Date' },
                    { title: 'Category' },
                    { title: 'Product' },
                    { title: 'Qty' },
                    { title: 'Price' },
                    { title: 'Total Amount' },
                  ]
                : [
                    { title: 'Date' },
                    { title: 'Cash' },
                    { title: 'ABA Bank' },
                    { title: 'Discount' },
                    { title: 'Total Amount' },
                    { title: 'Total Customers' },
                    { title: 'Average Spending' },
                    { title: 'Qty. of bills' },
                    { title: 'Qty. of card slips' },
                  ]
            }
            loading={loading}
            itemCount={data?.reportSaleProduct.length || 0}
            selectable={false}
          >
            {data &&
              data.reportSaleProduct.map((x: any, i: number) => {
                if (filter.groupBy === ReportSaleGroupBy.Date) {
                  return (
                    <IndexTable.Row key={i} position={i} id={i + ''}>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {x.date}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.cash).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.aba).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.discount).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${Number(x.amount).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {Number(x.customer).toFixed(0)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          ${(Number(x.amount) / Number(x.customer)).toFixed(2)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {Number(x.bill).toFixed(0)}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                        <Text as="p" variant="bodySm">
                          {Number(x.card).toFixed(0)}
                        </Text>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                }
                return (
                  <IndexTable.Row key={i} position={i} id={i + ''}>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <Text as="p" variant="bodySm">
                        {x.date}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <Text as="p" variant="bodySm">
                        {x.categoryName}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <div className="flex flex-row gap-2 items-center">
                        <div>
                          <Thumbnail alt="" source={x.image ? x.image : x.productImage} size="extraSmall" />
                        </div>
                        <div>
                          <Text as="p" variant="bodySm">
                            {x.productName}
                          </Text>
                        </div>
                      </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <Text as="p" variant="bodySm">
                        {x.qty}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <Text as="p" variant="bodySm">
                        ${x.price}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="border-collapse border-solid border-r-[0.5px]">
                      <Text as="p" variant="bodySm">
                        ${Number(x.amount).toFixed(2)}
                      </Text>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                );
              })}
          </IndexTable>
        </Box>
      </Card>
    </PolarisLayout>
  );
}
