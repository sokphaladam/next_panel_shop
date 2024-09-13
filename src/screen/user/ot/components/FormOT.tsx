'use client';
import { OverTimeInput } from '@/gql/graphql';
import { Box, Card, InlineGrid, Layout, TextField } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

interface Props {
  value: OverTimeInput;
  setValue: (v: OverTimeInput) => void;
}

export function FormOT(props: Props) {
  const start = new Date().setHours(Number(props.value.startat?.replace(':', '.')));
  const end = new Date().setHours(Number(props.value.endAt?.replace(':', '.')));
  return (
    <Layout>
      <Layout.Section>
        <Card>
          <Box>
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
