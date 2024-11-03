'use client';
import { OrderScheduleInput, useCreateOrderScheduleMutation } from '@/gql/graphql';
import { FormLayout, TextField } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { ProductSelect } from './ProductSelect';

interface Props {
  value: OrderScheduleInput | undefined;
  setValue: (v: OrderScheduleInput) => void;
  error: any[];
}

export function OrderScheduleForm({ value, setValue, error }: Props) {
  const handleChangeInput = useCallback(
    (v: any, o: any) => {
      setValue({
        ...value,
        [o]: v,
      });
    },
    [value, setValue],
  );

  const errName = error.length > 0 ? (error.find((f) => f.obj === 'name') || { text: '' }).text : '';
  const errStartAt = error.length > 0 ? (error.find((f) => f.obj === 'startAt') || { text: '' }).text : '';
  const errEndAt = error.length > 0 ? (error.find((f) => f.obj === 'endAt') || { text: '' }).text : '';
  const errItems = error.length > 0 ? (error.find((f) => f.obj === 'items') || { text: '' }).text : '';

  return (
    <div>
      <FormLayout>
        <TextField
          label="Name"
          autoComplete="off"
          placeholder="What is your schedule name?"
          value={value?.name || ''}
          onChange={(v) => handleChangeInput(v, 'name')}
          error={errName}
        />
        <FormLayout.Group condensed>
          <TextField
            label="Start At"
            autoComplete="off"
            placeholder="Start Order At..."
            value={value?.startAt || ''}
            onChange={(v) => handleChangeInput(v, 'startAt')}
            type="time"
            error={errStartAt}
          />
          <TextField
            label="End At"
            autoComplete="off"
            placeholder="Close Order At..."
            value={value?.endAt || ''}
            onChange={(v) => handleChangeInput(v, 'endAt')}
            type="time"
            error={errEndAt}
          />
        </FormLayout.Group>
        <ProductSelect
          selectedOptions={value?.items?.map((x) => String(x?.skuId)) || []}
          setSelectedOptions={(v) => {
            setValue({
              ...value,
              items: v.map((x) => {
                return {
                  skuId: Number(x),
                };
              }),
            });
          }}
          error={errItems}
        />
      </FormLayout>
    </div>
  );
}
