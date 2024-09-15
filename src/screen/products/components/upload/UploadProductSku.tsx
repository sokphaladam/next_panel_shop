import { ActionList, Icon, IndexTable, Popover, Select, Spinner, TextField, Tooltip } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { MenuVerticalIcon, PlusIcon } from '@shopify/polaris-icons';
import { ProductInput, Sku, Status_Product } from '@/gql/graphql';
import { PolarisUpload } from '@/components/polaris/PolarisUpload';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void;
  isEdit?: boolean;
}

function UploadProductSkuItem(props: {
  value: ProductInput;
  setValue: (v: ProductInput) => void;
  current: Sku;
  latest: boolean;
  index: number;
  isEdit?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeText = useCallback(
    (v: string, text: string) => {
      let dummy: any = (props.value.sku as any).map((x: any) => {
        return {
          ...x,
        };
      });
      dummy[props.index][text] = v;
      props.setValue({
        ...props.value,
        sku: dummy,
      });
    },
    [props],
  );

  if (!props.value.sku) {
    return <></>;
  }

  return (
    <IndexTable.Row id="0" position={0}>
      {props.isEdit && (
        <IndexTable.Cell>
          <Select
            label
            labelHidden
            value={props.value.sku[props.index]?.status || ''}
            options={[
              { label: 'Available', value: Status_Product.Available },
              { label: 'Out of stock', value: Status_Product.OutOfStock },
            ]}
            onChange={(v) => {
              handleChangeText(v, 'status');
            }}
          />
        </IndexTable.Cell>
      )}
      <IndexTable.Cell>
        <TextField
          autoComplete="off"
          label
          labelHidden
          size="slim"
          value={props.value.sku[props.index]?.name || ''}
          onChange={(v) => handleChangeText(v, 'name')}
          disabled={loading}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextField
          autoComplete="off"
          label
          labelHidden
          size="slim"
          type="number"
          prefix="$"
          value={props.value.sku[props.index]?.price + ''}
          onChange={(v) => handleChangeText(v, 'price')}
          disabled={loading}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextField
          autoComplete="off"
          label
          labelHidden
          size="slim"
          type="number"
          suffix="%"
          value={props.value.sku[props.index]?.discount + ''}
          onChange={(v) => handleChangeText(v, 'discount')}
          disabled={loading}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        {loading ? (
          <Spinner size="small" />
        ) : (
          <PolarisUpload
            url={props.value.sku[props.index]?.image || ''}
            setUrl={(v) => handleChangeText(v, 'image')}
            onLoading={setLoading}
            isSmall
          />
        )}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Popover
          preferredPosition="above"
          activator={
            <div className="cursor-pointer" onClick={() => setOpen(!open)}>
              <Icon source={MenuVerticalIcon} />
            </div>
          }
          active={open}
          onClose={() => setOpen(false)}
        >
          <Popover.Pane>
            <ActionList
              items={[
                {
                  content: 'Insert row below',
                  onAction: () => {
                    props.setValue({
                      ...props.value,
                      sku: [
                        ...(props.value.sku || []),
                        { name: '', discount: 0, price: 0, unit: '', status: Status_Product.Available, image: '' },
                      ],
                    });
                    setOpen(false);
                  },
                  disabled: !props.latest,
                },
                {
                  content: 'Remove',
                  destructive: true,
                  onAction: () => {
                    props.setValue({
                      ...props.value,
                      sku: [...(props.value.sku || []).filter((x, i) => i !== props.index)],
                    });
                    setOpen(false);
                  },
                  disabled: (props.value.sku || []).length <= 1,
                },
              ]}
            />
          </Popover.Pane>
        </Popover>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}

export function UploadProductSku(props: Props) {
  return (
    <div>
      <IndexTable
        headings={
          props.isEdit
            ? [
                { title: '' },
                { title: 'Name' },
                { title: 'Price' },
                { title: 'Discount' },
                { title: 'Image' },
                { title: 'control' },
              ]
            : [{ title: 'Name' }, { title: 'Price' }, { title: 'Discount' }, { title: 'Image' }, { title: 'control' }]
        }
        itemCount={1}
        selectable={false}
      >
        {(props.value.sku || []).map((x, i) => {
          return (
            <UploadProductSkuItem
              current={x || {}}
              {...props}
              key={i}
              latest={(props.value.sku || []).length === i + 1}
              index={i}
              isEdit={props.isEdit}
            />
          );
        })}
      </IndexTable>
      <div
        className="border-collapse border-dotted border-[0.5px] rounded-md p-2 hover:bg-gray-300 cursor-pointer"
        onClick={() => {
          props.setValue({
            ...props.value,
            sku: [
              ...(props.value.sku || []),
              { name: '', discount: 0, price: 0, unit: '', status: Status_Product.Available, image: '' },
            ],
          });
        }}
      >
        <Icon source={PlusIcon} />
      </div>
    </div>
  );
}
