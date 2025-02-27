"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  StatusOrderItem,
  TableSet,
  useGenerateTableSetMutation,
  useGenerateTokenOrderMutation,
  useOrderSubscriptSubscription,
  useTableSetListQuery,
} from "@/gql/graphql";
import { Modal } from "@/hook/modal";
import { cn } from "@/lib/utils";
import { useUser } from "@/service/UserProvider";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function TableItem({ x }: { x: TableSet }) {
  const { push } = useRouter();
  const [table, propsTable] = useGenerateTableSetMutation({
    refetchQueries: ["tableSetList"],
  });
  const [generate, propsUpdate] = useGenerateTokenOrderMutation({
    refetchQueries: ["tableSetList"],
  });
  const handleLogPress = () => {
    console.log("long press");

    generate({
      variables: {
        set: Number(x.set),
      },
    }).then((res) => {
      setTimeout(() => {
        const doc = document.getElementById(`table_${x.set}`);
        doc?.click();
      }, 1000);
    });
  };

  const handleClick = () => {
    if (propsUpdate.loading || x.order) {
      push("/order/detail/" + x?.order?.id);
      return;
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const handleGenerate = useCallback(
    (value: string, x: any) => {
      if (propsUpdate.loading || x.order) {
        push("/order/detail/" + x?.order.id);
        return;
      }
    },
    [propsUpdate.loading, push]
  );

  // const logPressEvent = useLongPress(handleLogPress, handleClick, defaultOptions);
  let bg = "";
  if (x.order) bg = "bg-emerald-700 text-white";
  if (x.order?.firstPrint) bg = "bg-orange-300";

  console.log(x.order && x);

  const totalOrder = x.order?.items?.length;
  const totalCompleted = x.order?.items?.filter(
    (f) => f?.status === StatusOrderItem.Completed
  ).length;

  return (
    <div
      className="cursor-pointer"
      onDoubleClick={handleLogPress}
      onClick={handleClick}
      suppressHydrationWarning
    >
      <div
        id={`table_${x?.set}`}
        onClick={() => handleGenerate(x.set + "", x)}
      ></div>
      <Card>
        <CardContent className="p-4">
          <div className="flex h-[5rem] w-full flex-col items-center justify-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border p-1 text-center shadow-md",
                bg
              )}
            >
              {!!x.fake ? "D" + x.set : x.set}
            </div>
            {x.order && (
              <Badge
                className={cn(
                  totalCompleted === totalOrder
                    ? totalCompleted === 0
                      ? ""
                      : "bg-emerald-800"
                    : "bg-orange-300",
                  "rounded-full text-xs font-light opacity-80"
                )}
              >
                {totalCompleted} / {totalOrder}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SetScreen() {
  const user = useUser();
  const { data, loading, refetch } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  const [table, propsTable] = useGenerateTableSetMutation({
    refetchQueries: ["tableSetList"],
  });
  const [generate, propsUpdate] = useGenerateTokenOrderMutation({
    refetchQueries: ["tableSetList"],
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (
        res.data.data?.orderSubscript.status === 2 ||
        !!res.data.data?.orderSubscript.uuid
      ) {
        refetch();
      }
    },
  });

  const handleGenerateTable = useCallback(() => {
    const pr = window.prompt("How many table for generate?");

    if (!!pr && !isNaN(Number(pr))) {
      Modal.dialog({
        title: "Confirmation",
        body: [<div key={1}>Are you sure want to generate {pr} tables?</div>],
        buttons: [
          {
            title: "Yes",
            class: "primary",
            onPress: () => {
              table({
                variables: {
                  sets: Number(pr),
                },
              });
            },
          },
        ],
      });
    }
  }, [table]);

  if (!user?.isHaveShift && ![1, 2].includes(user?.role?.id || 0)) {
    return (
      <div className="flex flex-1 p-4">
        <Alert variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Permission Shift</AlertTitle>
          <AlertDescription>
            តម្រូវការ openshift របស់អ្នកមុនពេលដំណើរការ! (your need open shift
            before proccess!)
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading || propsTable.loading) {
    <div>
      <div>...</div>
    </div>;
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-row items-center gap-4">
        <Badge className="bg-emerald-500">
          <div className="flex flex-row items-center justify-between p-1">
            Available = {data?.tableSetList?.filter((x) => !x?.order).length}
          </div>
        </Badge>
        <Badge className="bg-yellow-500">
          <div className="flex flex-row items-center justify-between p-1">
            In Order = {data?.tableSetList?.filter((x) => !!x?.order).length}
          </div>
        </Badge>
        <Badge className="bg-orange-300">
          <div className="flex flex-row items-center justify-between p-1">
            Print Order ={" "}
            {data?.tableSetList?.filter((x) => !!x?.order?.firstPrint).length}
          </div>
        </Badge>
      </div>
      <br />
      <div className="max-xs:grid-cols-1 grid grid-cols-12 gap-4 max-lg:grid-cols-12 max-md:grid-cols-6 max-sm:grid-cols-3">
        {data &&
          data?.tableSetList?.map((x) => {
            return (
              <div key={x?.set}>
                <TableItem key={x?.set} x={x || {}} />
              </div>
            );
          })}
      </div>
    </div>
  );

  /*
  return (
    <Page
      title="Table"
      subtitle={
        (
          <div
            className="flex flex-row items-center gap-4"
            suppressHydrationWarning
          >
            <Badge tone="success">
              {
                (
                  <div className="flex flex-row items-center justify-between p-1">
                    Available ={" "}
                    {data?.tableSetList?.filter((x) => !x?.order).length}
                  </div>
                ) as any
              }
            </Badge>
            <Badge tone="attention">
              {
                (
                  <div className="flex flex-row items-center justify-between p-1">
                    In Order ={" "}
                    {data?.tableSetList?.filter((x) => !!x?.order).length}
                  </div>
                ) as any
              }
            </Badge>
            <Badge tone="warning">
              {
                (
                  <div className="flex flex-row items-center justify-between p-1">
                    Print Order ={" "}
                    {
                      data?.tableSetList?.filter((x) => !!x?.order?.firstPrint)
                        .length
                    }
                  </div>
                ) as any
              }
            </Badge>
          </div>
        ) as any
      }
      primaryAction={{
        content: "GenerateTable",
        onAction: handleGenerateTable,
        destructive: true,
      }}
    >
      <Layout>
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}>
            {data &&
              data?.tableSetList?.map((x) => {
                return (
                  <Grid.Cell key={x?.set}>
                    <TableItem key={x?.set} x={x || {}} />
                  </Grid.Cell>
                );
              })}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
  */
}

export default SetScreen;
