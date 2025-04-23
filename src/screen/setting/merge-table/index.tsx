"use client";
import { useCustomToast } from "@/components/custom/CustomToast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMergeOrderMutation, useTableSetListQuery } from "@/gql/graphql";
import Image from "next/image";
import React, { useState } from "react";

export function MergeTableScreen() {
  const { setToasts, toasts } = useCustomToast();
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [targetTable, setTargetTable] = useState<number | null>(null);
  const [mergeComplete, setMergeComplete] = useState(false);
  const { data, loading } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  const [merge] = useMergeOrderMutation();

  if (loading) {
    return <div></div>;
  }

  const handleTableSelection = (tableId: number) => {
    if (selectedTables.includes(tableId)) {
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    } else {
      setSelectedTables([...selectedTables, tableId]);
    }
  };

  const handleTargetTableSelection = (tableId: number) => {
    setTargetTable(tableId);
  };

  const handleMergeTables = () => {
    // In a real app, this would send a request to the server to merge the orders
    const fromOrder: number[] =
      data?.tableSetList
        ?.filter((x) =>
          selectedTables.filter((f) => f !== targetTable).includes(x?.set || 0)
        )
        .map((x) => x?.order?.id || 0) || [];
    const toOrder = data?.tableSetList?.find((f) => f?.set === targetTable)
      ?.order?.id;

    merge({
      variables: {
        fromOrderId: fromOrder,
        toOrderId: toOrder,
      },
    })
      .then(() => {
        setToasts([
          ...toasts,
          { content: "Merge table has been done.", status: "success" },
        ]);
        setMergeComplete(true);
      })
      .catch(() => {
        setToasts([
          ...toasts,
          { content: "Failed to merge table.", status: "error" },
        ]);
      });
  };

  // Calculate merged order items and total
  const mergedItems = selectedTables.flatMap((tableId) => {
    const table = data?.tableSetList?.find((t) => t?.set === tableId);
    return table ? table.order?.items : [];
  });

  const mergedTotal = mergedItems.reduce((sum, item) => {
    const priceAfterDis =
      Number(item?.price) -
      (Number(item?.price) * Number(item?.discount)) / 100;
    const amount = priceAfterDis * Number(item?.qty || 0);
    return sum + amount;
  }, 0);

  // Get the target table object
  const targetTableObject = data?.tableSetList?.find(
    (t) => t?.set === targetTable
  );

  if (mergeComplete) {
    return (
      <div className="h-full w-full p-4">
        <h3 className="text-lg font-bold">Merge Table Orders</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Orders Merged Successfully</CardTitle>
              <CardDescription>
                Orders from {selectedTables.length} tables have been merged to
                Table {targetTableObject?.set}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-green-50 p-4 text-green-800">
                <p className="font-medium">
                  The following orders have been merged:
                </p>
                <ul className="mt-2 list-disc pl-5">
                  {selectedTables.map((tableId) => {
                    const table = data?.tableSetList?.find(
                      (t) => t?.set === tableId
                    );
                    const total =
                      table?.order?.items?.reduce((sum, item) => {
                        const priceAfterDis =
                          Number(item?.price) -
                          (Number(item?.price) * Number(item?.discount)) / 100;
                        const amount = priceAfterDis * Number(item?.qty || 0);
                        return sum + amount;
                      }, 0) || 0;
                    return (
                      <li key={tableId}>
                        Table {table?.set} (${total.toFixed(2)})
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4">New total: ${mergedTotal.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4">
      <h3 className="text-lg font-bold">Merge Table Orders</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Select Tables to Merge</CardTitle>
            <CardDescription>
              Choose the tables whose orders you want to combine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.tableSetList
                ?.filter((x) => x?.order)
                .map((table, idx) => {
                  const total = table?.order?.items?.reduce((sum, item) => {
                    const priceAfterDis =
                      Number(item?.price) -
                      (Number(item?.price) * Number(item?.discount)) / 100;
                    const amount = priceAfterDis * Number(item?.qty || 0);
                    return sum + amount;
                  }, 0);
                  return (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        id={`table-${table?.set}`}
                        checked={selectedTables.includes(table?.set || 0)}
                        onCheckedChange={() =>
                          handleTableSelection(table?.set || 0)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={`table-${table?.set || 0}`}
                          className="text-base"
                        >
                          Table {table?.set || 0} (${total?.toFixed(2)})
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {table?.order?.items?.length} items
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Select Target Table</CardTitle>
            <CardDescription>
              Choose which table will receive the combined order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTables.length > 0 ? (
                <>
                  {selectedTables.map((tableId) => {
                    const table = data?.tableSetList?.find(
                      (t) => t?.set === tableId
                    );
                    return (
                      <div
                        key={tableId}
                        className="flex items-start space-x-3 space-y-0"
                      >
                        <Checkbox
                          id={`target-${tableId}`}
                          checked={targetTable === tableId}
                          onCheckedChange={() =>
                            handleTargetTableSelection(tableId)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={`target-${tableId}`}
                            className="text-base"
                          >
                            Table {table?.set || 0}
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="text-muted-foreground">
                  Please select tables to merge first
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={selectedTables.length < 2 || !targetTable}
              onClick={handleMergeTables}
            >
              Merge Orders
            </Button>
          </CardFooter>
        </Card>

        {selectedTables.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Preview Merged Order</CardTitle>
              <CardDescription>
                {selectedTables.length} tables selected with{" "}
                {mergedItems.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mergedItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="flex flex-row items-center gap-4">
                      <div>
                        <Image
                          alt=""
                          src={item?.sku?.image || item?.product?.images || ""}
                          width={40}
                          height={40}
                          objectFit="contain"
                          style={{
                            width: 40,
                            borderRadius: 5,
                            maxHeight: 40,
                            objectFit: "cover",
                          }}
                          loading="lazy"
                          className="border border-dotted"
                        />
                      </div>
                      <div className="font-medium">
                        {(item?.qty || 0) > 1 && `${item?.qty}x `}
                        {`${item?.product?.title} (${item?.sku?.name})`}
                      </div>
                    </div>
                    <div className="font-medium">
                      $
                      {(
                        Number(item?.price || 0) * Number(item?.qty || 0)
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${mergedTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
