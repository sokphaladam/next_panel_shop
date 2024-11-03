'use client';
import { useProductListQuery } from '@/gql/graphql';
import { Autocomplete, LegacyStack, Tag, Thumbnail } from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';

interface Props {
  selectedOptions: string[];
  setSelectedOptions: (v: string[]) => void;
  error: string;
}

export function ProductSelect({ selectedOptions, setSelectedOptions, error }: Props) {
  const { data, loading } = useProductListQuery({
    onCompleted: (res) => {
      setOptions(
        res
          ? res?.productList
              ?.map((x) => {
                return x?.sku?.map((sku) => {
                  return {
                    label: `${x.title || ''} (${sku?.name}) #${x.code}`,
                    value: (sku?.id + '') as any,
                    media: <Thumbnail source={sku?.image || x.images || ''} alt="" size="extraSmall" />,
                  };
                });
              })
              .flat()
          : [],
      );
    },
  });
  const deselectedOptions = useMemo(
    () =>
      data
        ? data?.productList
            ?.map((x) => {
              return x?.sku?.map((sku) => {
                return {
                  label: `${x.title || ''} (${sku?.name}) #${x.code}`,
                  value: sku?.id || 0,
                  media: <Thumbnail source={sku?.image || x.images || ''} alt="" size="extraSmall" />,
                };
              });
            })
            .flat()
        : [],
    [data],
  );
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = (deselectedOptions as any[]).filter((option) => option.label.match(filterRegex));

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions, setSelectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = '';
          tagLabel = deselectedOptions?.find((f) => Number(f?.value) === Number(option))?.label || '';
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Product Tags"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
      loading={loading}
      error={error}
    />
  );

  return (
    <Autocomplete
      allowMultiple
      options={options as any}
      selected={selectedOptions}
      onSelect={setSelectedOptions}
      listTitle="Suggested Tags"
      textField={textField}
      loading={loading}
    />
  );

  function titleCase(string: string) {
    return (
      string
        .toLowerCase()
        .split(' ')
        // .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join('')
    );
  }
}
