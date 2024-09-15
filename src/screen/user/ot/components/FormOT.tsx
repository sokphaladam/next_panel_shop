'use client';
import { PolarisUser } from '@/components/polaris/PolarisUser';
import { OverTimeInput } from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { Box, Card, InlineGrid, Layout, TextField } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

interface Props {
  value: OverTimeInput;
  setValue: (v: OverTimeInput) => void;
  selectUser: number;
  setSelectUser: any;
  isEdit?: boolean;
}

export function FormOT(props: Props) {
  const user = useUser();
  const start = new Date().setHours(
    Number(props.value.startat?.split(':')[0]),
    Number(props.value.startat?.split(':')[1]),
  );
  const end = new Date().setHours(Number(props.value.endAt?.split(':')[0]), Number(props.value.endAt?.split(':')[1]));

  return (
    <Layout>
      <Layout.Section>
        <Card>
          <Box>
            {!props.isEdit && [1, 2, 5].includes(user?.role?.id || 0) && (
              <PolarisUser id={props.selectUser} title="Staff Request" onChange={props.setSelectUser} />
            )}
            <br />
            <TextField
              value={props.value.otDate || ''}
              autoComplete="off"
              label="Date"
              onChange={(v) => {
                props.setValue({
                  ...props.value,
                  otDate: v,
                });
              }}
              type="date"
            />
            <br />
            <InlineGrid columns={['oneHalf', 'oneHalf']} gap={'300'}>
              <TextField
                value={props.value.startat || ''}
                autoComplete="off"
                label="From Time"
                type="time"
                onChange={(v) => {
                  props.setValue({
                    ...props.value,
                    startat: v,
                  });
                }}
              />
              <TextField
                value={props.value.endAt || ''}
                autoComplete="off"
                label="To Time"
                type="time"
                onChange={(v) => {
                  props.setValue({
                    ...props.value,
                    endAt: v,
                  });
                }}
              />
            </InlineGrid>
            <br />
            <div className="text-emerald-600">Duration: {moment(end).diff(moment(start), 'hour')} hour</div>
            <br />
            <TextField
              autoComplete="off"
              label="Reason"
              placeholder="Please write your reason here.."
              value={props.value.note || ''}
              onChange={(v) => {
                props.setValue({
                  ...props.value,
                  note: v,
                });
              }}
              multiline={5}
            />
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
