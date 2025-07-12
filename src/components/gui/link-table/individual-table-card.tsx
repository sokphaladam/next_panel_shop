import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableSetListQuery } from "@/gql/graphql";

interface Props {
  selectedTableIds: string[];
  data: TableSetListQuery | undefined;
}

export function IndividualTableCard(props: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
      {props.selectedTableIds.map((x) => {
        const table = props.data?.tableSetList?.find(
          (f) => Number(f?.set || 0) === Number(x)
        );
        const total =
          table?.order?.items?.reduce((a, b) => {
            const discount = Number(b?.price || 0) * ((b?.discount || 0) / 100);
            const amount = ((b?.price || 0) - discount) * (b?.qty || 0);
            return (a = a + amount);
          }, 0) || 0;
        return (
          <Card key={x}>
            <CardHeader>
              <CardTitle>Table #{x.padStart(2, "0")}</CardTitle>
              <CardDescription>
                {table?.order?.items?.reduce(
                  (a, b) => (a = a + Number(b?.qty || 0)),
                  0
                )}{" "}
                items · ${total.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {table?.order?.items?.map((item) => {
                  const discountAmount =
                    (item?.price || 0) * ((item?.discount || 0) / 100);
                  const amountAfterDiscount =
                    ((item?.price || 0) - discountAmount) * (item?.qty || 0);
                  return (
                    <div
                      key={item?.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">
                          {(item?.qty || 0) > 1 && `${item?.qty}x `}
                          {item?.product?.title} ({item?.sku?.name})
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${(item?.price || 0).toFixed(2)} each
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          ${amountAfterDiscount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
