'use client';

import { useTopProductSellQuery } from '@/gql/graphql';
import { Box, Card, Icon, IndexTable, Layout, Text, TextField } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';

export function TopSell() {
  const now = moment(new Date());
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(now.subtract(7, 'days').format('YYYY-MM-DD')),
    end: new Date(),
  });
  const { data, loading } = useTopProductSellQuery({
    variables: {
      from: moment(selectedDates.start).format('YYYY-MM-DD'),
      to: moment(selectedDates.end).format('YYYY-MM-DD'),
    },
  });

  return (
    <Layout.Section variant="oneHalf">
      <div className="flex flex-row justify-between items-center">
        <Text as="h5" variant="headingMd">
          Top Sell
        </Text>
        <div className="flex flex-row items-center gap-3">
          <TextField
            type="date"
            label
            labelHidden
            value={moment(selectedDates.start).format('YYYY-MM-DD')}
            onChange={(v) => {
              setSelectedDates({
                start: new Date(v),
                end: selectedDates.end,
              });
            }}
            autoComplete="off"
          />
          <div>
            <Icon source={ArrowRightIcon} />
          </div>
          <TextField
            type="date"
            label
            labelHidden
            value={moment(selectedDates.end).format('YYYY-MM-DD')}
            onChange={(v) => {
              setSelectedDates({
                end: new Date(v),
                start: selectedDates.start,
              });
            }}
            autoComplete="off"
          />
        </div>
      </div>
      <br />
      <Card padding={'0'}>
        <Box padding={'0'}>
          <IndexTable
            headings={[{ title: 'Product' }, { title: '' }]}
            itemCount={data?.topProductSell?.length || 0}
            loading={loading}
            selectable={false}
          >
            {data?.topProductSell?.map((x, i) => {
              return (
                <IndexTable.Row key={i} id={i + ''} position={i}>
                  <IndexTable.Cell>
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        alt=""
                        src={x?.sku?.image || x?.product?.images || ''}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain', borderRadius: 5 }}
                      />
                      <div>
                        <b>
                          {x?.product?.title} ({x?.sku?.name})
                        </b>
                      </div>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div className="flex flex-col gap-2 text-right items-end">
                      <b>{x?.qty}</b>
                      <b className="text-emerald-700">${Number(x?.total || 0).toFixed(2)}</b>
                    </div>
                  </IndexTable.Cell>
                </IndexTable.Row>
              );
            })}
          </IndexTable>
        </Box>
      </Card>
    </Layout.Section>
  );
}
