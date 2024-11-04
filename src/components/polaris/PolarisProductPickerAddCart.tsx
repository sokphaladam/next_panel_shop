/* eslint-disable @next/next/no-img-element */
'use client';

import {
  CartItemInput,
  Order,
  Product,
  Sku,
  Status_Product,
  Type_Product,
  useAddOrderItemMutation,
  useProductListQuery,
} from '@/gql/graphql';
import {
  Button,
  ButtonGroup,
  ChoiceList,
  Divider,
  Icon,
  Modal,
  RadioButton,
  Select,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import { ArrowLeftIcon, CartAbandonedFilledIcon, PackageOnHoldIcon } from '@shopify/polaris-icons';
import { useCallback, useMemo, useState } from 'react';
import { useCustomToast } from '../custom/CustomToast';
import Image from 'next/image';
import { config_app } from '@/lib/config_app';
import ListArrangement from '@/lib/ListArrangement';
import { CustomerOrderCategory } from './CustomOrderCategory';
import { useWindowSize } from '@/hook/useWindowSize';

interface Props {}

function TwoColumnList(props: { data: any[]; sku: any; setSelectSku: any; setSelectProduct: any }) {
  const [category, setCategory] = useState(null);
  const { height } = useWindowSize();
  const groups = props.data?.reduce((a: any, b: any) => {
    const key = b?.category?.name;

    if (!a[key]) {
      a[key] = [];
    }

    a[key].push(b);
    return a;
  }, {});

  return (
    <div className="overflow-x-auto scroll-smooth snap-y snap-mandatory" style={{ height: (height || 0) / 1.3 }}>
      <div className="sticky top-0 z-[999]">
        <CustomerOrderCategory productGroup={groups} selected={category} onSelected={setCategory} />
      </div>
      <div className="grid grid-cols-2 gap-4 p-3">
        {groups &&
          (category === null
            ? Object.keys(groups)
            : Object.keys(groups).filter((f) => f === (category as any).name)
          ).map((g) => {
            return groups[g].map((x: Product) => {
              return x.sku?.map((sku) => {
                return (
                  <div key={sku?.id}>
                    <ProductItem
                      display="CARD"
                      x={x || {}}
                      key={x?.id}
                      defaultSku={sku || {}}
                      onSelected={(v: any, sku: any) => {
                        props.setSelectSku(sku);
                        props.setSelectProduct({
                          ...v,
                          addonSelect:
                            v.addons?.map((ad: any) => {
                              return {
                                ...ad,
                                qty: 0,
                              };
                            }) || [],
                          skuSelect: sku.id,
                          remark: '',
                        });
                      }}
                    />
                  </div>
                );
              });
            });
          })}
      </div>
    </div>
  );
}

function ProductItem({
  x,
  onSelected,
  defaultSku,
  display,
}: {
  x: Product;
  onSelected: any;
  defaultSku?: Sku;
  display?: 'CARD' | 'LIST';
}) {
  if (display === 'CARD') {
    return (
      <div
        key={x?.id}
        className={`pb-2 overflow-hidden cursor-pointer border-collapse rounded-md border-gray-300 border-[0.5px] ${
          x.status === Status_Product.OutOfStock ||
          defaultSku?.status === Status_Product.OutOfStock ||
          defaultSku?.status === Status_Product.TimeOut
            ? 'bg-gray-400'
            : ''
        }`}
        onClick={() => {
          if (x.status === Status_Product.Available && defaultSku?.status === Status_Product.Available) {
            onSelected(x, defaultSku);
          }
        }}
      >
        <div className="w-full h-[125px]">
          <Image
            alt=""
            src={defaultSku?.image || x.images || ''}
            width={100}
            height={40}
            loading="lazy"
            className="w-full h-[125px] object-cover"
            // style={{ borderRadius: 5 }}
          />
        </div>
        <div className="p-2">
          <div>
            <h5>
              {x?.title} ({defaultSku?.name})
            </h5>
          </div>
          <div>
            <h5 className="text-green-800 font-bold">${Number(defaultSku?.price).toFixed(2)}</h5>
          </div>
          {(x.status === Status_Product.OutOfStock || defaultSku?.status === Status_Product.OutOfStock) && (
            <div className="flex flex-row items-center gap-1">
              <div>
                <Icon source={CartAbandonedFilledIcon} tone="critical" />
              </div>
              <small className="text-red-500">(Out Of Stock)</small>
            </div>
          )}
          {defaultSku?.status === Status_Product.TimeOut && (
            <div className="flex flex-row items-center gap-1">
              <div>
                <Icon source={PackageOnHoldIcon} tone="critical" />
              </div>
              <small className="text-red-500">(Time Out)</small>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      key={x?.id}
      className={`pb-2 cursor-pointer px-2 border-collapse border-gray-300 border-b-[0.5px] flex flex-row justify-between items-center ${
        x.status === Status_Product.OutOfStock ||
        defaultSku?.status === Status_Product.OutOfStock ||
        defaultSku?.status === Status_Product.TimeOut
          ? 'bg-gray-400'
          : ''
      }`}
      onClick={() => {
        if (x.status === Status_Product.Available && defaultSku?.status === Status_Product.Available) {
          onSelected(x, defaultSku);
        }
      }}
    >
      <div className="flex items-center gap-2">
        <Image
          alt=""
          src={defaultSku?.image || x.images || ''}
          width={40}
          height={40}
          loading="lazy"
          style={{ borderRadius: 5 }}
        />
        {/* <Thumbnail alt="" source={x?.images + ''} size="small" /> */}
        <div>
          <h5>
            {x?.title} ({defaultSku?.name})
          </h5>
          {(x.status === Status_Product.OutOfStock || defaultSku?.status === Status_Product.OutOfStock) && (
            <div className="flex flex-row items-center gap-1 mt-2">
              <div>
                <Icon source={CartAbandonedFilledIcon} tone="critical" />
              </div>
              <small className="text-red-500">(Out Of Stock)</small>
            </div>
          )}
          {defaultSku?.status === Status_Product.TimeOut && (
            <div className="flex flex-row items-center gap-1">
              <div>
                <Icon source={PackageOnHoldIcon} tone="critical" />
              </div>
              <small className="text-red-500">(Time Out)</small>
            </div>
          )}
        </div>
        <div>
          <h5 className="text-green-800 font-bold">${defaultSku?.price}</h5>
        </div>
      </div>
    </div>
  );
}

function ProductItemSelect(props: { product: Product; setProduct: any; sku: Sku; setSku: any }) {
  const [addons, setAddons] = useState<any[]>(
    props.product.addons?.map((ad) => {
      return {
        ...ad,
        qty: 0,
      };
    }) || [],
  );
  // const [sku, setSku] = useState<number>((props.product as any).selectSku);

  const [remark, setRemark] = useState('');
  const addon = addons
    .filter((x) => x.qty > 0)
    .reduce((a, b) => (a = a + Number(b.qty || '0') * (isNaN(Number(b.value || '0')) ? 0 : Number(b.value || '0'))), 0);
  // const selectedSku = props.sku ? props.product.sku?.find((f) => f?.id === props.sku) || {} : {};

  return (
    <div>
      {/* <Image alt="" src={props.product.images || ''} width={275} height={275} /> */}
      <Image
        src={props.sku.image || props.product.images || ''}
        alt=""
        className="w-full max-h-[275px] object-contain"
        width={300}
        height={275}
        loading="lazy"
      />
      <div className="p-4">
        <div className="text-lg font-bold">{props.product.title}</div>
        <div>{props.product.description}</div>
        <br />
        <div className="text-red-500 font-bold">${Number(props.sku.price) + addon}</div>
        <br />
        <Divider />
        <br />
        <div className="border-solid border-[0.5px] rounded-md mb-2 p-2 border-red-400">
          {props.product.sku?.map((x, i) => {
            return (
              <RadioButton
                checked={props.sku.id === x?.id}
                onChange={(v) => {
                  props.setSku(v === true ? x : {});
                  props.setProduct({
                    ...props.product,
                    skuSelect: v === true ? x?.id || 0 : 0,
                  });
                }}
                label={x?.name}
                key={i}
                helpText={(<div>${x?.price}</div>) as any}
                disabled={x?.status === Status_Product.OutOfStock || x?.status === Status_Product.TimeOut}
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

export function PolarisProductPickerAddCart({
  order,
  refetch,
  type,
}: {
  order: Order;
  refetch: any;
  type?: 'BUTTON' | 'LAYOUT';
}) {
  const [open, setOpen] = useState(false);
  const { setToasts, toasts } = useCustomToast();
  const [selectProduct, setSelectProduct] = useState<any>(null);
  const [selectSku, setSelectSku] = useState<any>(null);
  const { data, loading } = useProductListQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        type: [Type_Product.Production],
      },
      schedule: true,
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
    if (!selectSku) {
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
    const skuIndex = selectProduct.sku?.findIndex((f: any) => Number(f?.id) === selectSku.id);

    if (index >= 0) {
      data[index].qty = data[index].qty + 1;
    }

    const skuQuery = data.items?.find((f: any) => f.sku_id === selectSku.id && !f.isPrint);
    const addonPrice = selectProduct.addonSelect
      .filter((x: any) => x.qty > 0)
      .reduce(
        (a: any, b: any) =>
          (a = a + Number(b.qty || '0') * (isNaN(Number(b.value || '0')) ? 0 : Number(b.value || '0'))),
        0,
      );

    const input: CartItemInput = {
      skuId: selectSku.id,
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
  }, [addCart, open, order.id, order.items, refetch, selectProduct, selectSku, setToasts, toasts]);

  if (type === 'LAYOUT') {
    return (
      <div>
        <TwoColumnList
          setSelectProduct={(v: any) => {
            setSelectProduct(v);
            toggleOpen();
          }}
          data={data?.productList || []}
          sku={selectSku}
          setSelectSku={setSelectSku}
        />
        {selectProduct && (
          <Modal
            loading={loading}
            title="Product Picker"
            open={open}
            onClose={() => {
              toggleOpen();
              setSelectProduct(null);
              setSelectSku(null);
            }}
            // activator={activator}
            // footer={
            //   <div>
            //     <Button icon={ArrowLeftIcon} onClick={() => setSelectProduct(null)}>
            //       Back
            //     </Button>
            //   </div>
            // }
            primaryAction={{
              content: 'Add to cart',
              onAction: handleAddtoCart,
            }}
          >
            <Modal.Section flush>
              <ProductItemSelect
                product={selectProduct}
                setProduct={setSelectProduct}
                sku={selectSku}
                setSku={setSelectSku}
              />
            </Modal.Section>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <Modal
      loading={loading}
      title="Product Picker"
      open={open}
      onClose={() => {
        toggleOpen();
        setSelectProduct(null);
        setSelectSku(null);
      }}
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
              return x?.sku?.map((sku, indexSku) => {
                return (
                  <ProductItem
                    x={x || {}}
                    key={x?.id}
                    defaultSku={sku || {}}
                    onSelected={(v: any, sku: any) => {
                      setSelectSku(sku);
                      setSelectProduct({
                        ...v,
                        addonSelect:
                          v.addons?.map((ad: any) => {
                            return {
                              ...ad,
                              qty: 0,
                            };
                          }) || [],
                        skuSelect: sku.id,
                        remark: '',
                      });
                    }}
                  />
                );
              });
            })}
          </div>
        </Modal.Section>
      )}
      {selectProduct && (
        <>
          <Modal.Section flush>
            <ProductItemSelect
              product={selectProduct}
              setProduct={setSelectProduct}
              sku={selectSku}
              setSku={setSelectSku}
            />
          </Modal.Section>
        </>
      )}
    </Modal>
  );
}
