import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactionStockListQuery } from "@/gql/graphql";
import Image from "next/image";

export function InventoryLog() {
  const { data, loading } = useTransactionStockListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  if (loading || !data) {
    return <div>Load Log...</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead colSpan={2}>Name</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.transactionStockList?.map((x) => {
            return (
              <TableRow key={x?.id}>
                <TableCell>
                  <div className="relative h-[35px] w-[35px]">
                    <Image
                      src={
                        (x?.sku as any)[0]?.image ?? x?.product?.images ?? ""
                      }
                      alt=""
                      width={75}
                      height={75}
                      className="h-[35px] w-[35px] rounded-md object-contain shadow-md"
                    />
                  </div>
                </TableCell>
                <TableCell>{x?.product?.title}</TableCell>
                <TableCell>{x?.sku?.name}</TableCell>
                <TableCell>
                  {`${x?.type === "OUT" ? "-" : ""}${x?.qty}`}
                </TableCell>
                <TableCell>{x?.date}</TableCell>
                <TableCell>{x?.by?.display}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
