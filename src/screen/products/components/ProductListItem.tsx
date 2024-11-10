import { Product, Status_Product, useUpdateStatusProductMutation } from '@/gql/graphql';
import { ActionList, Badge, Icon, IndexTable, Popover, Text, Thumbnail } from '@shopify/polaris';
import react, { useCallback, useState } from 'react';
import { ProductListItemSku } from './ProductListItemSku';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import { useCustomToast } from '@/components/custom/CustomToast';

interface Props {
  item: Product | null;
  index: number;
}

export function ProductListItem({ item, index }: Props) {
  const [open, setOpen] = useState(false);
  const { toasts, setToasts } = useCustomToast();
  const [update, { loading }] = useUpdateStatusProductMutation({
    refetchQueries: ['productList', 'product'],
  });

  const toggelOpen = useCallback(() => setOpen(!open), [open]);

  const handleStatus = useCallback(
    (e: Status_Product) => {
      update({
        variables: {
          updateStatusProductId: Number(item?.id),
          status: e,
        },
      })
        .then((res) => {
          if (res.data?.updateStatusProduct) {
            setToasts([...toasts, { content: `Change status product to ${e}`, status: 'success' }]);
            setTimeout(() => {
              process.browser && window.location.reload();
            }, 500);
          } else {
            setToasts([...toasts, { content: `Oop! something was wrong please try again`, status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: `Oop! something was wrong please try again`, status: 'error' }]);
        });
    },
    [item?.id, setToasts, toasts, update],
  );

  const menus: any = [{ content: 'Edit', url: `/products/edit/${item?.id}` }];

  if (item?.status !== Status_Product.Available) {
    menus.push({
      content: 'Available',
      disabled: loading,
      onAction: () => handleStatus(Status_Product.Available),
    });
  }

  if (item?.status !== Status_Product.OutOfStock) {
    menus.push({
      content: 'Out Of Stock',
      disabled: loading,
      onAction: () => handleStatus(Status_Product.OutOfStock),
    });
  }

  if (item?.status !== Status_Product.Inactive) {
    menus.push({
      content: 'In Active',
      disabled: loading,
      onAction: () => handleStatus(Status_Product.Inactive),
    });
  }

  return (
    <IndexTable.Row id={item?.id + ''} position={item?.id || 0}>
      <IndexTable.Cell className="flex flex-row items-center">
        <Text as="span" variant="bodyMd">
          {index}
        </Text>
        <div className="pl-2 text-center">
          <Thumbnail alt="" source={item?.images?.split(',')[0] || ''} size="medium" />
          <Text as="p" variant="bodyMd" fontWeight="semibold">
            {item?.code}
          </Text>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="p" variant="bodySm" truncate>
          {item?.title}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="p" variant="bodyMd">
          {item?.category?.name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ProductListItemSku sku={item?.sku || []} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className="max-w-[75px]">
          {item?.type?.map((ty) => {
            return (
              <div key={ty} className="m-1">
                <Badge size="small" tone="enabled" progress="complete">
                  {ty + ''}
                </Badge>
              </div>
            );
          })}
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge
          size="small"
          tone={item?.status === 'OUT_OF_STOCK' ? 'critical' : item?.status === 'INACTIVE' ? 'attention' : 'enabled'}
          progress={item?.status === Status_Product.Available ? 'complete' : 'incomplete'}
        >
          {item?.status || ''}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Popover
          activator={
            <div
              className="cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center"
              onClick={toggelOpen}
            >
              <Icon source={MenuVerticalIcon} tone="base" />
            </div>
          }
          active={open}
          onClose={toggelOpen}
        >
          <ActionList items={menus} />
        </Popover>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
