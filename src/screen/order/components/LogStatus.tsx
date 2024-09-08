'use client';
import { Order, StatusOrder } from '@/gql/graphql';
import { Badge, Icon, IndexTable, Tooltip } from '@shopify/polaris';
import {
  CheckCircleIcon,
  ClipboardCheckFilledIcon,
  DeliveryIcon,
  InfoIcon,
  QuestionCircleIcon,
  StatusActiveIcon,
  XCircleIcon,
} from '@shopify/polaris-icons';
import React from 'react';

const toneStatus: any = {
  [StatusOrder.Pending]: 'attention-strong',
  [StatusOrder.Verify]: 'info-strong',
  [StatusOrder.Delivery]: 'success',
  [StatusOrder.Checkout]: 'success-strong',
  [StatusOrder.Cancelled]: 'critical-strong',
};

const toneIcon: any = {
  [StatusOrder.Pending]: InfoIcon,
  [StatusOrder.Verify]: CheckCircleIcon,
  [StatusOrder.Delivery]: StatusActiveIcon,
  [StatusOrder.Checkout]: ClipboardCheckFilledIcon,
  [StatusOrder.Cancelled]: XCircleIcon,
};

export function LogStatus({ item }: { item: Order | null }) {
  const logs = item?.log ? item.log : [];

  return (
    <Tooltip
      padding={'default'}
      width={'wide'}
      content={
        <div className="w-[350px] bg-white absolute -m-2">
          <IndexTable
            headings={[{ title: '#' }, { title: 'Date' }, { title: 'By' }]}
            selectable={false}
            itemCount={logs.length || 0}
          >
            {logs.map((x, i) => {
              return (
                <IndexTable.Row key={i} id={x?.text + ''} position={i}>
                  <IndexTable.Cell>
                    <small>{x?.text}</small>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <small>{x?.date}</small>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <small>{x?.by?.display}</small>
                  </IndexTable.Cell>
                </IndexTable.Row>
              );
            })}
          </IndexTable>
        </div>
      }
    >
      <Badge tone={toneStatus[item?.status || '']} size="small">
        {
          (
            <small className="flex flex-row justify-between items-center p-1">
              <div className="mr-1">
                <Icon source={toneIcon[item?.status || '']} />
              </div>
              {item?.status === 'DELIVERY' ? 'Deliver' : item?.status || ''}
            </small>
          ) as any
        }
      </Badge>
    </Tooltip>
  );
}
