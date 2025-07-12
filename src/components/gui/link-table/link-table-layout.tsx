"use client";

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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTableSetListQuery } from "@/gql/graphql";
import { useState } from "react";
import { SelectTableLink } from "./select-table-link";
import { IndividualTableCard } from "./individual-table-card";
import { CombinedView } from "./combined-view";

export function LinkTableLayout() {
  const [selectedTableIds, setSelectedTableIds] = useState<string[]>([]);
  const [isLinked, setIsLinked] = useState(false);
  const { data, loading } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleTableSelection = (tableId: string) => {
    if (selectedTableIds.includes(tableId)) {
      setSelectedTableIds(selectedTableIds.filter((id) => id !== tableId));
    } else {
      setSelectedTableIds([...selectedTableIds, tableId]);
    }
  };

  const handleLinkTables = () => {
    if (selectedTableIds.length >= 2) {
      setIsLinked(true);
    } else {
      alert("Please select at least 2 tables to link");
    }
  };

  const selectedTables =
    data?.tableSetList?.filter((table) =>
      selectedTableIds.includes(table?.set + "")
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
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Link Tables</h1>
        </div>
      </main>

      {!isLinked ? (
        <SelectTableLink
          selectedTableIds={selectedTableIds}
          handleLinkTables={handleLinkTables}
          toggleTableSelection={toggleTableSelection}
          data={data}
        />
      ) : (
        <>
          <IndividualTableCard
            selectedTableIds={selectedTableIds}
            data={data}
          />
          <CombinedView selectedTableIds={selectedTableIds} data={data} />
        </>
      )}
    </div>
  );
}
