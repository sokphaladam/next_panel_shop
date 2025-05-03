import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSetListQuery } from "@/gql/graphql";

interface Props {
  selectedTableIds: string[];
  data: TableSetListQuery | undefined;
}

export function CombinedView(props: Props) {
  const selectedTables =
    props.data?.tableSetList?.filter((table) =>
      props.selectedTableIds.includes(table?.set + "")
    ) || [];

  const tabOptions = [
    { id: "all", label: "All Tables" },
    ...selectedTables.map((table) => ({
      id: table?.set,
      label: `Table ${table?.set}`,
    })),
  ];

  const calculateCombinedTotal = () => {
    return selectedTables
      .map(
        (x) =>
          x?.order?.items?.reduce((a, b) => {
            const discount = Number(b?.price || 0) * ((b?.discount || 0) / 100);
            const amount = ((b?.price || 0) - discount) * (b?.qty || 0);
            return (a = a + amount);
          }, 0) || 0
      )
      .reduce((a, b) => (a = a + b), 0);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Combined View</CardTitle>
        <CardDescription>All items from linked tables</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            {tabOptions.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id + ""}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-6">
              {selectedTables.map((table) => (
                <div key={table?.set} className="rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-medium">
                    Table #{String(table?.set).padStart(2, "0")}
                  </h3>
                  {table?.order?.items?.map((item) => {
                    const discountAmount =
                      (item?.price || 0) * ((item?.discount || 0) / 100);
                    const amountAfterDiscount =
                      ((item?.price || 0) - discountAmount) * (item?.qty || 0);
                    return (
                      <div key={item?.id} className="flex justify-between py-1">
                        <div>
                          {(item?.qty || 0) > 1 && `${item?.qty}x `}
                          {item?.product?.title} ({item?.sku?.name})
                        </div>
                        <div>${amountAfterDiscount.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Combined Total</span>
                <span>${calculateCombinedTotal().toFixed(2)}</span>
              </div>
            </div>
          </TabsContent>
          {selectedTables.map((table) => {
            const total =
              table?.order?.items?.reduce((a, b) => {
                const discount =
                  Number(b?.price || 0) * ((b?.discount || 0) / 100);
                const amount = ((b?.price || 0) - discount) * (b?.qty || 0);
                return (a = a + amount);
              }, 0) || 0;
            return (
              <TabsContent key={table?.set} value={table?.set + ""}>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    {table?.order?.items?.map((item) => {
                      const discountAmount =
                        (item?.price || 0) * ((item?.discount || 0) / 100);
                      const amountAfterDiscount =
                        ((item?.price || 0) - discountAmount) *
                        (item?.qty || 0);
                      return (
                        <div
                          key={item?.id}
                          className="flex justify-between py-1"
                        >
                          <div>
                            {(item?.qty || 0) > 1 && `${item?.qty}x `}
                            {item?.product?.title} ({item?.sku?.name})
                          </div>
                          <div>${amountAfterDiscount.toFixed(2)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>
                      Table {String(table?.set).padStart(2, "0")} Total
                    </span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
