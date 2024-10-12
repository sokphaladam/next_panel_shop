'use client';
import { ProductInput, useCheckProductCodeMutation } from '@/gql/graphql';
import { TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';

interface Props {
  value: ProductInput;
  setValue: (e: ProductInput) => void;
  loading: boolean;
  onError: (v: boolean) => void;
}

export function ProductCode(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [check] = useCheckProductCodeMutation();

  const checkProductCode = useCallback(
    (value: string) => {
      check({
        variables: {
          code: value.trim(),
        },
      }).then((res) => {
        if (!res.data?.checkProductCode) {
          setErrorMessage('Product code was already exists!');
          props.onError(true);
        } else {
          setErrorMessage('');
        }
      });
    },
    [check, props],
  );

  return (
    <TextField
      disabled={props.loading}
      requiredIndicator
      autoComplete="off"
      label="Code"
      placeholder="Enter the product code"
      value={props.value.code || ''}
      onChange={(v) => {
        props.setValue({ ...props.value, code: v });

        if (!v) {
          setErrorMessage('');
        }

        if (v.length > 3) {
          checkProductCode(v);
        }
      }}
      error={errorMessage}
    />
  );
}
