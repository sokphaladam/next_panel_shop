import {
  Product,
  Sku,
  Status_Product,
  Type_Product,
  useProductListQuery,
} from "@/gql/graphql";
import Image from "next/image";
import { useCallback } from "react";
import { produce } from "immer";
import { CircleMinus } from "lucide-react";

export interface InventoryProduct extends Product {
  qty: number;
}

interface Props {
  items: InventoryProduct[];
  setItems: (items: InventoryProduct[]) => void;
}

export function InventoryItem(props: Props) {
  const { data, loading } = useProductListQuery({
    variables: {
      offset: 0,
      limit: 10000,
      filter: {
        status: [Status_Product.Available],
        type: [Type_Product.Production],
      },
    },
  });

  const onClick = useCallback(
    (item: Product, sku: Sku) => {
      const existsProduct = props.items.findIndex(
        (f) =>
          f.id === item.id && Array.isArray(f.sku) && f.sku[0]?.id === sku.id
      );
      if (existsProduct >= 0) {
        props.setItems(
          produce(props.items, (draft) => {
            draft[existsProduct].qty++;
          })
        );
      } else {
        props.setItems(
          produce(props.items, (draft) => {
            draft.push({
              ...item,
              sku: [sku],
              qty: 1,
            });
          })
        );
      }
    },
    [props]
  );

  const onClickRemove = useCallback(
    (item: InventoryProduct) => {
      const index = props.items.findIndex(
        (f) =>
          f.id === item.id &&
          Array.isArray(f.sku) &&
          Array.isArray(item.sku) &&
          f.sku[0]?.id === item.sku[0]?.id
      );
      if (props.items[index].qty === 1) {
        props.setItems(props.items.filter((_, idx) => idx !== index));
      } else {
        props.setItems(
          produce(props.items, (draft) => {
            draft[index].qty--;
          })
        );
      }
    },
    [props]
  );

  if (loading || !data) {
    return <div>Load Inventory...</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.productList?.map((item) => {
        return item?.sku?.map((sku, idx) => {
          const existsProduct = props.items.find(
            (f) =>
              f.id === item.id &&
              Array.isArray(f.sku) &&
              f.sku[0]?.id === sku?.id
          );
          return (
            <div
              key={item.id + "" + idx}
              className="relative my-3 h-[100px] w-[75px] cursor-pointer transition-all hover:scale-105"
            >
              {existsProduct && (
                <div>
                  <div className="absolute -left-1 -top-2 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-red-500 p-2 text-secondary">
                    {existsProduct?.qty}
                  </div>
                  <div
                    className="absolute -right-1 -top-2 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-secondary text-secondary"
                    onClick={() => onClickRemove(existsProduct)}
                  >
                    <CircleMinus className="h-[25px] w-[25px] text-secondary-foreground" />
                  </div>
                </div>
              )}
              <Image
                src={sku?.image ?? item.images ?? ""}
                alt=""
                width={75}
                height={75}
                className="h-[75px] w-[75px] rounded-md object-contain shadow-md"
                onClick={() => onClick(item, sku || {})}
              />
              <div className="mt-2">
                {item.title} ({sku?.name})
              </div>
            </div>
          );
        });
      })}
    </div>
  );
}
