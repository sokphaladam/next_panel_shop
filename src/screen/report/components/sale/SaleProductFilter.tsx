'use client';
import { ReportSaleGroupBy, useCategoryListQuery } from '@/gql/graphql';
import {
  ChoiceList,
  FilterInterface,
  Icon,
  IndexFilters,
  IndexFiltersMode,
  IndexFiltersProps,
  Select,
  TextField,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import moment from 'moment';
import React, { useCallback } from 'react';

interface Props {
  filter: any;
  setFilter: any;
}

export function SaleProductFilter(props: Props) {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
  const { data, loading } = useCategoryListQuery();

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

  const handleChangeGroup = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        groupBy: value[0],
      });
    },
    [props],
  );

  const handleChangeCategory = useCallback(
    (value: any) => {
      // console.log(value);
      props.setFilter({
        ...props.filter,
        filters: {
          category: value.map((x: any) => Number(x)),
        },
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

  const handleRemoveGroup = useCallback(() => {
    props.setFilter({
      ...props.filter,
      groupBy: ReportSaleGroupBy.Product,
    });
  }, [props]);

  const handleRemoveCategory = useCallback(() => {
    props.setFilter({
      ...props.filter,
      filters: {
        category: [],
      },
    });
  }, [props]);

  const handleFiltersClearAll = useCallback(() => {
    props.setFilter({
      fromDate: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
      groupBy: ReportSaleGroupBy.Product,
      toDate: moment(new Date()).format('YYYY-MM-DD'),
      filters: {
        category: [],
      },
    });
  }, [props]);

  const filters: FilterInterface[] = [
    {
      key: 'groupBy',
      label: 'Group By',
      filter: (
        <ChoiceList
          selected={[props.filter.groupBy]}
          title
          titleHidden
          choices={[
            {
              label: 'Product',
              value: ReportSaleGroupBy.Product,
            },
            {
              label: 'Date',
              value: ReportSaleGroupBy.Date,
            },
          ]}
          onChange={handleChangeGroup}
        />
      ),
      pinned: true,
      shortcut: true,
    },
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
      key: 'category',
      label: 'Category',
      pinned: true,
      shortcut: true,
      filter: (
        <ChoiceList
          title
          titleHidden
          choices={
            data
              ? data?.categoryList.raw.map((x: any) => {
                  return {
                    label: x.name,
                    value: x.id + '',
                  };
                })
              : []
          }
          selected={props.filter.filters.category.map((x: any) => x + '')}
          disabled={loading || props.filter.groupBy === ReportSaleGroupBy.Date}
          allowMultiple={true}
          onChange={handleChangeCategory}
        />
      ),
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

  if (props.filter.groupBy && !isEmpty(props.filter.groupBy)) {
    const key = 'groupBy';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.groupBy),
      onRemove: handleRemoveGroup,
    });
  }

  if (props.filter.filters && !isEmpty(props.filter.filters.category)) {
    const key = 'category';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.filters.category),
      onRemove: handleRemoveCategory,
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
      case 'groupBy':
        return `Group By ${value}`;
      case 'category':
        return `Category ${value.length}`;
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
