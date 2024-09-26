'use client';
import { PolarisLayout, role_permission } from '@/components/polaris/PolarisLayout';
import {
  Order,
  StatusOrder,
  useOrderBalanceSummaryQuery,
  useOrderListLazyQuery,
  useOrderListQuery,
} from '@/gql/graphql';
import { Box, Card, Divider, Icon, Layout, SkeletonDisplayText, Spinner, Text } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { SaleTable } from './components/sale/SaleTable';
import { SaleFilter } from './components/sale/SaleFilter';
import moment from 'moment';
import { usePagination } from '@/hook/usePagination';
import downloadExcelFile from '@/lib/DownloadExcelFile';
import { Modal } from '@/hook/modal';
import { DownloadAll } from './components/sale/DownloadAll';
import { ChevronDownIcon } from '@shopify/polaris-icons';

export function SaleReportScreen() {
  const now = moment(new Date());
  const { offset, setOffset, limit, setLimit, handleResetPage } = usePagination();
  const [download, setDownload] = useState(false);
  const [filter, setFilter] = useState({
    fromDate: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
    toDate: now.format('YYYY-MM-DD'),
    sign: false,
    discount: false,
  });
  const { data, loading } = useOrderListQuery({
    variables: {
      limit,
      offset: offset * limit,
      status: [StatusOrder.Checkout],
      ...filter,
    },
  });
  const query = useOrderBalanceSummaryQuery({
    variables: {
      from: filter.fromDate,
      to: filter.toDate,
    },
  });

  useEffect(() => {
    setLimit(100);
  }, [setLimit]);

  const handleExcelCurrentPage = useCallback(() => {
    const header = [
      'No.',
      'Date',
      'Items',
      'Qty',
      'Amount ($)',
      'Discount (%)',
      'Total ($)',
      'Signature',
      'Payment',
      'Currency',
    ];
    const items: any = data?.orderList?.map((x) => {
      const date = x?.log?.find((f) => f?.text === 'Checkout')?.date;
      const signature = x?.log?.find((f) => f?.text === 'Signature')?.by;
      const item: any = x?.items?.reduce((a: any, b: any) => {
        return {
          qty: (a.qty || 0) + (b?.qty || 0),
        };
      });
      const discountPrice = (Number(x?.total || 0) * (x?.discount || 0)) / 100;
      const priceAfterDiscount = Number(x?.total || 0) - discountPrice;
      return [
        x?.invoice?.toString().padStart(5, '0') + '',
        moment(date).format('YYYY-MM-DD'),
        x?.items?.length,
        item.qty,
        x?.total,
        x?.discount?.toFixed(2),
        priceAfterDiscount.toFixed(2),
        signature ? signature.display : '--',
        x?.bankType,
        x?.currency,
      ];
    });
    downloadExcelFile(
      `Sale Report ${moment(new Date()).format('YYYY-MM-DD HH_mm_ss')}.xlsx`,
      `${filter.fromDate}-${filter.toDate} (${items.length})`,
      [header, ...(items as any[])],
    );
  }, [data?.orderList, filter.fromDate, filter.toDate]);

  return (
    <PolarisLayout
      title="Sale Report"
      permission={[role_permission.ADMIN, role_permission.MANAGER, role_permission.SUPER_ADMIN]}
      fullWidth
      actionGroups={[
        {
          title: 'Download',
          actions: [
            { content: 'Download Current Page (100)', onAction: handleExcelCurrentPage },
            {
              content: `Download All (${filter.fromDate} - ${filter.toDate})`,
              onAction: () => {
                setDownload(true);
              },
            },
          ],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <DownloadAll
            title={`Download All (${filter.fromDate} - ${filter.toDate})`}
            open={download}
            setOpen={setDownload}
            filter={filter}
          />
          <Card padding={'0'}>
            <Box padding={'0'}>
              <div className="flex flex-row gap-4">
                <div className="p-3">
                  <Text as="h4" variant="headingMd">
                    <span className="flex flex-row items-center">Total Balance</span>
                  </Text>
                  <div className="ml-4 mt-2">
                    {query.loading && !query.data ? (
                      <SkeletonDisplayText size="medium" />
                    ) : (
                      <Text as="h3" variant="heading2xl" tone="success">
                        ${Number(query.data?.orderBalanceSummary.order || 0).toFixed(2)}
                      </Text>
                    )}
                  </div>
                </div>
                <div className="border-collapse border-solid border-r-[0.5px]"></div>
                <div className="p-3">
                  <Text as="h4" variant="headingMd">
                    <span className="flex flex-row items-center">Discount</span>
                  </Text>
                  <div className="ml-4 mt-2">
                    {query.loading && !query.data ? (
                      <SkeletonDisplayText size="medium" />
                    ) : (
                      <Text as="h3" variant="heading2xl" tone="magic">
                        {Number(query.data?.orderBalanceSummary.discount || 0).toFixed(0)}
                      </Text>
                    )}
                  </div>
                </div>
                <div className="border-collapse border-solid border-r-[0.5px]"></div>
                <div className="p-3">
                  <Text as="h4" variant="headingMd">
                    <span className="flex flex-row items-center">Signture</span>
                  </Text>
                  <div className="ml-4 mt-2">
                    {query.loading && !query.data ? (
                      <SkeletonDisplayText size="medium" />
                    ) : (
                      <Text as="h3" variant="heading2xl" tone="magic">
                        {Number(query.data?.orderBalanceSummary.signature || 0).toFixed(0)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </Box>
            <Divider />
            <Box>
              <SaleFilter filter={filter} setFilter={setFilter} />
            </Box>
            <Box padding={'0'}>
              <SaleTable
                setOffset={setOffset}
                offset={offset}
                limit={limit}
                orders={(data?.orderList || []) as Order[]}
                loading={loading}
              />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
