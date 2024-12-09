import { useCustomToast } from '@/components/custom/CustomToast';
import { Product, Sku, useSetItemShowOnMutation } from '@/gql/graphql';
import { IndexTable, Modal, RadioButton, Select, Spinner, Thumbnail } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  product: Product;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export function ControllerShowProductOn(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [update, setUpdate] = useState({
    count: 0,
    start: 0,
  });
  const [sku, setSku] = useState<any[]>(props.product.sku || []);
  const togggleOpen = useCallback(() => props.setOpen(!props.open), [props]);

  const [set, propSet] = useSetItemShowOnMutation({
    refetchQueries: ['product', 'productList'],
  });

  useEffect(() => {
    if (update.count === update.start && update.count > 0) {
      setUpdate({
        start: 0,
        count: 0,
      });
      setToasts([...toasts, { content: 'Done!', status: 'success' }]);
      togggleOpen();
    }
  }, [setToasts, toasts, update, togggleOpen]);

  const handleSave = useCallback(() => {
    let dummy = {
      start: 0,
      count: sku.length,
    };
    setUpdate(dummy);
    for (const x of sku) {
      set({
        variables: {
          productId: Number(props.product.id),
          skuId: Number(x.id),
          status: x.enabledOn,
        },
      }).then((res) => {
        if (!!res.data?.setItemShowOn) {
          dummy = {
            ...dummy,
            start: dummy.start + 1,
          };
          console.log(dummy);
          setUpdate(dummy);
        }
      });
    }
  }, [sku, set, props.product.id]);

  return (
    <Modal
      title="Product display on"
      onClose={togggleOpen}
      open={props.open}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        disabled: propSet.loading,
        loading: propSet.loading,
      }}
    >
      <Modal.Section flush>
        <IndexTable
          headings={[{ title: 'Info' }, { title: 'Display On' }]}
          itemCount={props.product.sku?.length || 0}
          selectable={false}
        >
          {sku.map((item, index) => {
            return (
              <IndexTable.Row key={index} id={item?.id + ''} position={index}>
                <IndexTable.Cell>
                  <div className="flex flex-row gap-2">
                    <Thumbnail source={item?.image || props.product.images || ''} size="small" alt="" />
                    <div>
                      <div>
                        <b>{item?.name}</b>
                      </div>
                      <div>
                        <small>${item?.price}</small>
                      </div>
                    </div>
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <div className="w-[150px]">
                    <Select
                      label
                      labelHidden
                      options={[
                        { label: 'All', value: 'ALL' },
                        { label: 'Web', value: 'WEB' },
                        { label: 'Quick Order', value: 'QORDER' },
                      ]}
                      value={item.enabledOn}
                      onChange={(v) => {
                        const x = [...sku];
                        x[index].enabledOn = v;
                        setSku(x);
                      }}
                    />
                  </div>
                </IndexTable.Cell>
              </IndexTable.Row>
            );
          })}
        </IndexTable>
      </Modal.Section>
      {update.count >= sku.length && (
        <Modal.Section>
          <div className="flex flex-row gap-2">
            <div>
              <Spinner size="small" />
            </div>
            <small>
              Updating {update.start}/{update.count}
            </small>
          </div>
        </Modal.Section>
      )}
    </Modal>
  );
}
