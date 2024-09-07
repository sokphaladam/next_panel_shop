/* eslint-disable @next/next/no-img-element */
'use client';

import {
  CartItemInput,
  Order,
  Product,
  Type_Product,
  useAddOrderItemMutation,
  useProductListQuery,
} from '@/gql/graphql';
import {
  Button,
  ButtonGroup,
  ChoiceList,
  Divider,
  Modal,
  RadioButton,
  Select,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';
import { useCustomToast } from '../custom/CustomToast';

interface Props {}

function ProductItem({ x, onSelected }: { x: Product; onSelected: any }) {
  // const [selectSku, setSelectSku] = useState((x.sku || [])[0]?.id + '');

  // const sku = x?.sku ? x?.sku?.map((x) => ({ label: `${x?.name} ($${x?.price})`, value: x?.id + '' })) : [];

  return (
    <div
      key={x?.id}
      className="pb-2 cursor-pointer px-2 border-collapse border-gray-300 border-b-[0.5px] flex flex-row justify-between items-center"
      onClick={() => {
        onSelected(x);
      }}
    >
      <div className="flex items-center gap-2">
        <Thumbnail alt="" source={x?.images + ''} size="small" />
        <div>
          <h5>{x?.title}</h5>
        </div>
      </div>
    </div>
  );
}

function ProductItemSelect(props: { product: Product; setProduct: any }) {
  const [addons, setAddons] = useState<any[]>(
    props.product.addons?.map((ad) => {
      return {
        ...ad,
        qty: 0,
      };
    }) || [],
  );
  const [sku, setSku] = useState<number>(
    (props.product.sku?.length || 0) > 0 ? (props.product.sku || [])[0]?.id || 0 : 0,
  );

  const [remark, setRemark] = useState('');
  const addon = addons
    .filter((x) => x.qty > 0)
    .reduce((a, b) => (a = a + Number(b.qty || '0') * (isNaN(Number(b.value || '0')) ? 0 : Number(b.value || '0'))), 0);

  return (
    <div>
      <img src={props.product.images || ''} alt="" className="w-full max-h-[275px] object-contain" />
      <div className="p-4">
        <div className="text-lg font-bold">{props.product.title}</div>
        <div>{props.product.description}</div>
        <br />
        <div className="text-red-500 font-bold">${Number((props.product.sku || [])[0]?.price) + addon}</div>
        <br />
        <Divider />
        <br />
        <div className="border-solid border-[0.5px] rounded-md mb-2 p-2 border-red-400">
          {props.product.sku?.map((x, i) => {
            return (
              <RadioButton
                checked={sku === x?.id}
                onChange={(v) => {
                  setSku(v === true ? x?.id || 0 : 0);
                  props.setProduct({
                    ...props.product,
                    skuSelect: v === true ? x?.id || 0 : 0,
                  });
                }}
                label={x?.name}
                key={i}
                helpText={(<div>${x?.price}</div>) as any}
              />
            );
          })}
        </div>
        {(props.product.addons || []).length > 0 && (
          <div>
            {addons?.map((x: any, i) => {
              return (
                <div key={i} className="border-solid border-[0.5px] rounded-md mb-2 p-2">
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      {x?.name} (${x?.value})
                    </div>
                    <div className="text-right flex flex-col gap-2">
                      <div>
                        <ButtonGroup variant="segmented">
                          <Button
                            onClick={() => {
                              const dummy = [...(props.product as any).addonSelect];
                              dummy[i].qty = dummy[i].qty > 0 ? dummy[i].qty - 1 : 0;
                              setAddons(dummy);
                              props.setProduct({
                                ...props.product,
                                addonSelect: dummy,
                              });
                            }}
                            disabled={x.qty === 0}
                          >
                            -
                          </Button>
                          <Button disabled>{String(x.qty || 0)}</Button>
                          <Button
                            onClick={() => {
                              const dummy = [...addons];
                              dummy[i].qty = dummy[i].qty + 1;
                              setAddons(dummy);
                              props.setProduct({
                                ...props.product,
                                addonSelect: dummy,
                              });
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
                      {x?.isRequired ? 'Required' : 'Optional'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <TextField
          value={remark}
          onChange={(v) => {
            setRemark(v);
            props.setProduct({
              ...props.product,
              remark: v,
            });
          }}
          label="Special instructions"
          multiline={3}
          autoComplete="off"
          placeholder={`Special requests are subject to the restaurant's approval. Tell us here!`}
        />
      </div>
    </div>
  );
}

export function PolarisProductPickerAddCart({ order, refetch }: { order: Order; refetch: any }) {
  const [open, setOpen] = useState(false);
  const { setToasts, toasts } = useCustomToast();
  const [selectProduct, setSelectProduct] = useState<any>(null);
  const { data, loading } = useProductListQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        type: [Type_Product.Production],
      },
    },
  });
  const [addCart] = useAddOrderItemMutation({
    refetchQueries: ['order'],
  });

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <Button size="micro" onClick={toggleOpen}>
      Select Product
    </Button>
  );

  const handleAddtoCart = useCallback(() => {
    if (selectProduct.skuSelect === 0) {
      return;
    }

    const data: any = [...(order.items || [])];
    const addonValue = selectProduct.addonSelect
      .filter((x: any) => x.qty > 0)
      .map((x: any) => `${x.name}(x${x.qty})`)
      .join(',');
    const index = data.findIndex(
      (f: any) =>
        f.id === selectProduct.id &&
        f.addon_value.join(',').trim() === addonValue.trim() &&
        f.remark.trim() === selectProduct.remark.trim(),
    );
    const skuIndex = selectProduct.sku?.findIndex((f: any) => Number(f?.id) === selectProduct.skuSelect);

    if (index >= 0) {
      data[index].qty = data[index].qty + 1;
    }

    const skuQuery = data.items?.find((f: any) => f.sku_id === selectProduct.skuSelect && !f.isPrint);
    const addonPrice = selectProduct.addonSelect
      .filter((x: any) => x.qty > 0)
      .reduce(
        (a: any, b: any) =>
          (a = a + Number(b.qty || '0') * (isNaN(Number(b.value || '0')) ? 0 : Number(b.value || '0'))),
        0,
      );

    const input: CartItemInput = {
      skuId: selectProduct.skuSelect,
      productId: selectProduct.id,
      addons: addonValue,
      discount: skuIndex !== undefined ? Number((selectProduct.sku || [])[skuIndex]?.discount) : 0,
      price: skuIndex !== undefined ? Number((selectProduct.sku || [])[skuIndex]?.price) + addonPrice : 0,
      qty: index >= 0 && !!skuQuery ? data[index].qty + 1 : 1,
      remark: selectProduct.remark,
    };

    addCart({
      variables: {
        orderId: Number(order.id),
        data: input,
      },
    }).then((res) => {
      if (res.data?.addOrderItem) {
        setToasts([
          ...toasts,
          {
            content: `Add ${selectProduct.title} to cart`,
            status: 'info',
          },
        ]);
        refetch();
      }
    });

    setOpen(!open);
    setSelectProduct(null);
  }, [addCart, open, order, refetch, selectProduct, setToasts, toasts]);

  return (
    <Modal
      loading={loading}
      title="Product Picker"
      open={open}
      onClose={toggleOpen}
      activator={activator}
      footer={
        <div>
          <Button icon={ArrowLeftIcon} onClick={() => setSelectProduct(null)}>
            Back
          </Button>
        </div>
      }
      primaryAction={{
        content: 'Add to cart',
        onAction: handleAddtoCart,
      }}
    >
      {selectProduct === null && (
        <Modal.Section flush>
          <div className="flex flex-col gap-2">
            {data?.productList?.map((x) => {
              return (
                <ProductItem
                  x={x || {}}
                  key={x?.id}
                  onSelected={(v: any) => {
                    setSelectProduct({
                      ...v,
                      addonSelect:
                        v.addons?.map((ad: any) => {
                          return {
                            ...ad,
                            qty: 0,
                          };
                        }) || [],
                      skuSelect: (v.sku?.length || 0) > 0 ? (v.sku || [])[0]?.id || 0 : 0,
                      remark: '',
                    });
                  }}
                />
              );
            })}
          </div>
        </Modal.Section>
      )}
      {selectProduct && (
        <>
          <Modal.Section flush>
            <ProductItemSelect product={selectProduct} setProduct={setSelectProduct} />
          </Modal.Section>
        </>
      )}
    </Modal>
  );
}
