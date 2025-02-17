import { useCallback, useState } from "react";
import { InventoryProduct } from "./inventory-item";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { produce } from "immer";
import { TrashIcon } from "lucide-react";
import {
  TransactionStockInput,
  useCreateTransactionStockMutation,
} from "@/gql/graphql";
import { useCustomToast } from "@/components/custom/CustomToast";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  items: InventoryProduct[];
  setItems: (items: InventoryProduct[]) => void;
}

export function InventoryTransaction(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [description, setDescription] = useState("");
  const [create, { loading }] = useCreateTransactionStockMutation({
    refetchQueries: ["transactionStockList"],
  });

  const onClickStockOut = useCallback(() => {
    const input: TransactionStockInput[] = props.items.map((x) => {
      return {
        productId: Number(x.id),
        skuId: Number((x.sku as any)[0].id),
        qty: Number(x.qty),
        type: "OUT",
        description: description,
      };
    });

    create({
      variables: {
        data: input,
      },
    })
      .then((res) => {
        if (res.data?.createTransactionStock) {
          setToasts([
            ...toasts,
            { content: "Transaction successfully", status: "success" },
          ]);
          props.setItems([]);
          setDescription("");
        }
      })
      .catch(() => {
        setToasts([
          ...toasts,
          { content: "Somthing was wrong please try again", status: "error" },
        ]);
      });
  }, [create, description, props, setToasts, toasts]);

  const onClicRemove = useCallback(
    (index: number) => {
      props.setItems(props.items.filter((_, idx) => idx !== index));
    },
    [props]
  );

  return (
    <div>
      <div className="p-4">
        <Button variant={"destructive"} onClick={onClickStockOut}>
          OUT
        </Button>
      </div>
      <div>
        <Table>
          <TableBody>
            {props.items.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="relative h-[35px] w-[35px]">
                      <Image
                        src={(item.sku as any)[0]?.image ?? item.images ?? ""}
                        alt=""
                        width={75}
                        height={75}
                        className="h-[35px] w-[35px] rounded-md object-contain shadow-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.qty}
                      onChange={(e) => {
                        props.setItems(
                          produce(props.items, (draft) => {
                            draft[idx].qty =
                              Number(e.target.value) < 1
                                ? 1
                                : Number(e.target.value);
                          })
                        );
                      }}
                      className="max-w-[75px]"
                      type="number"
                      min={1}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => onClicRemove(idx)}
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <label>Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your description here."
        />
      </div>
    </div>
  );
}
