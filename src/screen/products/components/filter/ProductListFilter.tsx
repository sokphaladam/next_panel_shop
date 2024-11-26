'use client';
import { useCategoryListQuery } from '@/gql/graphql';
import {
  ChoiceList,
  FilterInterface,
  IndexFilters,
  IndexFiltersMode,
  IndexFiltersProps,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

interface Props {
  filter: any;
  setFilter: any;
}

const optionType = [
  { label: 'Product for Sale', value: 'PRODUCTION' },
  { label: 'Product stock', value: 'RAW' },
];

export function ProductListFilter(props: Props) {
  const [searchInput, setSearchInput] = useState('');
  const { data, loading } = useCategoryListQuery();
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);

  const handleChangeCategory = useCallback(
    (value: any) => {
      // console.log(value);
      props.setFilter({
        ...props.filter,
        filters: {
          ...props.filter.filters,
          category: value.map((x: any) => Number(x)),
        },
      });
    },
    [props],
  );

  const handleChangeStatus = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        filters: {
          ...props.filter.filters,
          status: value.map((x: any) => String(x)),
        },
      });
    },
    [props],
  );

  const handleChangeType = useCallback(
    (value: any) => {
      props.setFilter({
        ...props.filter,
        filters: {
          ...props.filter.filters,
          type: value.map((x: any) => String(x)),
        },
      });
    },
    [props],
  );

  const handleRemoveCategory = useCallback(() => {
    props.setFilter({
      ...props.filter,
      filters: {
        ...props.filter.filters,
        category: [],
      },
    });
  }, [props]);

  const handleRemoveStatus = useCallback(() => {
    props.setFilter({
      ...props.filter,
      filters: {
        ...props.filter.filters,
        status: ['AVAILABLE', 'OUT_OF_STOCK'],
      },
    });
  }, [props]);

  const handleRemoveType = useCallback(() => {
    props.setFilter({
      ...props.filter,
      filters: {
        ...props.filter.filters,
        type: ['PRODUCTION'],
      },
    });
  }, [props]);

  const handleFiltersClearAll = useCallback(() => {
    props.setFilter({
      code: '',
      filters: {
        status: ['AVAILABLE', 'OUT_OF_STOCK'],
        category: [],
        type: ['PRODUCTION'],
      },
    });
  }, [props]);

  const filters: FilterInterface[] = [
    {
      key: 'type',
      label: 'Type',
      pinned: true,
      shortcut: true,
      filter: (
        <ChoiceList
          title
          titleHidden
          choices={optionType}
          allowMultiple={true}
          selected={props.filter.filters.type}
          onChange={handleChangeType}
        />
      ),
    },
    {
      key: 'status',
      label: 'Status',
      pinned: true,
      shortcut: true,
      filter: (
        <ChoiceList
          title
          titleHidden
          choices={[
            { label: 'Available', value: 'AVAILABLE' },
            { label: 'Out of stock', value: 'OUT_OF_STOCK' },
            { label: 'Inactive & Deleted', value: 'INACTIVE' },
          ]}
          allowMultiple={true}
          selected={props.filter.filters.status}
          onChange={handleChangeStatus}
        />
      ),
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
          allowMultiple={true}
          onChange={handleChangeCategory}
        />
      ),
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];

  if (props.filter.filters && !isEmpty(props.filter.filters.category)) {
    const key = 'category';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.filters.category),
      onRemove: handleRemoveCategory,
    });
  }

  if (props.filter.filters && !isEmpty(props.filter.filters.status)) {
    const key = 'status';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.filters.status),
      onRemove: handleRemoveStatus,
    });
  }

  if (props.filter.filters && !isEmpty(props.filter.filters.type)) {
    const key = 'type';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, props.filter.filters.type),
      onRemove: handleRemoveType,
    });
  }

  return (
    <div
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          props.setFilter({
            ...props.filter,
            code: searchInput,
          });
        }
      }}
    >
      <IndexFilters
        filters={filters}
        mode={mode}
        setMode={setMode}
        onQueryChange={(value) => {
          setSearchInput(value);
          if (value === '') {
            props.setFilter({
              ...props.filter,
              code: '',
            });
          }
        }}
        onClearAll={handleFiltersClearAll}
        onQueryClear={() => {
          setSearchInput('');
          props.setFilter({
            ...props.filter,
            code: '',
          });
        }}
        selected={0}
        tabs={[]}
        appliedFilters={appliedFilters}
        queryValue={searchInput}
        queryPlaceholder="Search code product"
      />
    </div>
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
      case 'type':
        const str = value ? optionType.filter((f) => !!value.includes(f.value)).map((x) => x.label) : [];
        return `Type ${str.join(',')}`;
      case 'status':
        return `Status ${(value as any).join(',')}`;
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
