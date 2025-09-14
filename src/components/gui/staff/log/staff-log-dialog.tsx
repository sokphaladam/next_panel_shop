/* eslint-disable @next/next/no-img-element */
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useProductQuery, User } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StaffLogEntry {
  id: string;
  date: string;
  userId: number;
  userName: string;
  type: string;
  status: string;
  text: string;
}

function isJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function StaffLogDialog({ log }: { log: StaffLogEntry }) {
  const json = isJSON(log.text) ? JSON.parse(log.text) : null;
  const productId = json
    ? json?.product_id || json.productId || undefined
    : undefined;
  const skuId = json ? json?.sku_id || json.skuId || undefined : undefined;
  const id = json ? json.order_id || json.id || undefined : undefined;
  const { data } = useProductQuery({
    skip: productId === undefined,
    variables: {
      productId,
    },
  });
  return (
    <Dialog>
      <DialogTrigger>{log.text}</DialogTrigger>
      <DialogContent className="m-2">
        {json && data?.product && (
          <div>
            <h3 className="mb-2 text-lg font-bold">Product Info</h3>
            <div className="flex flex-row gap-2">
              <img
                src={data.product.images || ""}
                alt=""
                className="h-10 w-10 object-contain shadow"
              />
              <div>
                <div>
                  {data.product.sku?.find((f) => f?.id === skuId)?.name || ""}
                </div>
              </div>
            </div>
          </div>
        )}
        {id && (
          <div>
            Reference:{" "}
            <Link
              href={`/order/detail/${id}`}
              target="_blank"
              className={cn("text-blue", buttonVariants)}
            >
              {id}
            </Link>
          </div>
        )}
        {log.userName && <div>User: {log.userName}</div>}
        {log.status && <div>Status: {log.status}</div>}
        <pre className="bg-secondary-foreground p-2 text-white">{log.text}</pre>
      </DialogContent>
    </Dialog>
  );
}
