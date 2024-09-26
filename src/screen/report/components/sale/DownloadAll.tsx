'use client';
import { StatusOrder, useOrderListLazyQuery, useOrderListQuery } from '@/gql/graphql';
import downloadExcelFile from '@/lib/DownloadExcelFile';
import { Modal, Spinner } from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback } from 'react';

interface Props {
  title: string;
  open: boolean;
  setOpen: any;
  filter: any;
}

export function DownloadAll(props: Props) {
  const { data, loading } = useOrderListQuery({
    skip: !props.open,
    variables: {
      limit: 100000,
      offset: 0,
      status: [StatusOrder.Checkout],
      ...props.filter,
    },
  });

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
      `${props.filter.fromDate}-${props.filter.toDate} (${items.length})`,
      [header, ...(items as any[])],
    );
  }, [data?.orderList, props]);

  return (
    <Modal
      title={props.title}
      open={props.open}
      onClose={() => props.setOpen(false)}
      primaryAction={{
        content: 'Download',
        onAction: handleExcelCurrentPage,
      }}
    >
      <Modal.Section>
        {loading && (
          <div className="flex flex-row items-center">
            <Spinner size="small" />
            <p>Loading...</p>
          </div>
        )}
        {data && <div>Total sale records: {data.orderList?.length}</div>}
      </Modal.Section>
    </Modal>
  );
}
