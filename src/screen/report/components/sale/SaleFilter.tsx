'use client';
import {
  ChoiceList,
  FilterInterface,
  Icon,
  IndexFilters,
  IndexFiltersMode,
  IndexFiltersProps,
  TextField,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import moment from 'moment';
import React, { useCallback } from 'react';

interface Props {
  filter: any;
  setFilter: any;
}

export function SaleFilter(props: Props) {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);

  const handleChangeStartDate = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        fromDate: value,
      });
    },
    [props],
  );

  const handleChangeEndDate = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        toDate: value,
      });
    },
    [props],
  );
  const handleChangeSignature = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        sign: value[0] === 'T' ? true : false,
      });
    },
    [props],
  );
  const handleChangeDiscount = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        discount: value[0] === 'T' ? true : false,
      });
    },
    [props],
  );

  const handleRemoveStartDate = useCallback(() => {
    props.setFilter({
      ...props.filter,
      fromDate: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
    });
  }, [props]);

  const handleRemoveEndDate = useCallback(() => {
    props.setFilter({
      ...props.filter,
      toDate: moment(new Date()).format('YYYY-MM-DD'),
    });
  }, [props]);

  const handleRemoveSignature = useCallback(() => {
    props.setFilter({
      ...props.filter,
      sign: false,
    });
  }, [props]);

  const handleRemoveDiscount = useCallback(() => {
    props.setFilter({
      ...props.filter,
      discount: false,
    });
  }, [props]);

  const handleFiltersClearAll = useCallback(() => {
    handleRemoveStartDate();
    handleRemoveEndDate();
    handleRemoveSignature();
    handleRemoveDiscount();
  }, [handleRemoveStartDate, handleRemoveEndDate, handleRemoveSignature, handleRemoveDiscount]);

  const filters: FilterInterface[] = [
    {
      key: 'start_date',
      label: 'Start Date',
      filter: (
        <TextField
          value={props.filter.fromDate}
          type="date"
          label
          labelHidden
          autoComplete="off"
          size="slim"
          onChange={handleChangeStartDate}
        />
      ),
      pinned: true,
      shortcut: true,
    },
    {
      key: 'end_date',
      label: 'End Date',
      filter: (
        <TextField
          value={props.filter.toDate}
          type="date"
          label
          labelHidden
          autoComplete="off"
          size="slim"
          onChange={handleChangeEndDate}
        />
      ),
      pinned: true,
      shortcut: true,
    },
    {
      key: 'discount',
      label: 'Discount',
      filter: (
        <ChoiceList
          selected={props.filter.discount ? ['T'] : ['F']}
          title
          titleHidden
          choices={[
            {
              label: 'Yes',
              value: 'T',
            },
            {
              label: 'No',
              value: 'F',
            },
          ]}
          onChange={handleChangeDiscount}
        />
      ),
      pinned: true,
      shortcut: true,
    },
    {
      key: 'signature',
      label: 'Signature',
      filter: (
        <ChoiceList
          selected={props.filter.sign ? ['T'] : ['F']}
          title
          titleHidden
          choices={[
            {
              label: 'Yes',
              value: 'T',
            },
            {
              label: 'No',
              value: 'F',
            },
          ]}
          onChange={handleChangeSignature}
        />
      ),
      pinned: true,
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];

  if (props.filter.fromDate && !isEmpty(props.filter.fromDate)) {
    const key = 'start_date';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.fromDate),
      onRemove: handleRemoveStartDate,
    });
  }

  if (props.filter.toDate && !isEmpty(props.filter.toDate)) {
    const key = 'end_date';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.toDate),
      onRemove: handleRemoveEndDate,
    });
  }

  if (props.filter.discount && !isEmpty(props.filter.discount)) {
    const key = 'discount';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.discount),
      onRemove: handleRemoveDiscount,
    });
  }

  if (props.filter.sign && !isEmpty(props.filter.sign)) {
    const key = 'signature';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.sign),
      onRemove: handleRemoveSignature,
    });
  }

  return (
    <IndexFilters
      filters={filters}
      mode={mode}
      setMode={setMode}
      onClearAll={handleFiltersClearAll}
      onQueryChange={() => {}}
      onQueryClear={() => {}}
      selected={0}
      tabs={[]}
      hideQueryField
      appliedFilters={appliedFilters}
    />
  );

  function disambiguateLabel(key: string, value: string | any[]): string {
    switch (key) {
      case 'start_date':
        return `Start Date ${value}`;
      case 'end_date':
        return `End Date ${value}`;
      case 'discount':
        return `Discount ${value ? 'Yes' : 'No'}`;
      case 'signature':
        return `Signature ${value ? 'Yes' : 'No'}`;
      default:
        return value as string;
    }
  }

  function isEmpty(value: string | any[]) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
