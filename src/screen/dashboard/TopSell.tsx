"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTopProductSellQuery } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

export function TopSell() {
  const now = moment(new Date());
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(now.subtract(7, "days").format("YYYY-MM-DD")),
    end: new Date(),
  });
  const { data, loading } = useTopProductSellQuery({
    variables: {
      from: moment(selectedDates.start).format("YYYY-MM-DD"),
      to: moment(selectedDates.end).format("YYYY-MM-DD"),
    },
  });

  return (
    <div>
      <div className="mb-4 flex flex-row flex-wrap items-center justify-between">
        <div>
          <h5 className="text-lg font-bold">Top Sell</h5>
        </div>
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !selectedDates && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {selectedDates?.start ? (
                  selectedDates.end ? (
                    <>
                      {moment(selectedDates.start).format("YYYY-MM-DD")} -{" "}
                      {moment(selectedDates.end).format("YYYY-MM-DD")}
                    </>
                  ) : (
                    moment(selectedDates.start).format("YYYY-MM-DD")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedDates?.start}
                selected={{ from: selectedDates.start, to: selectedDates.end }}
                onSelect={(v) => {
                  console.log(v);
                  setSelectedDates({
                    start: v?.from || new Date(),
                    end: v?.to || new Date(),
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.topProductSell?.map((x, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex flex-row items-center gap-4">
                        <div className="h-[40px] w-[40px]">
                          <Image
                            alt=""
                            src={x?.sku?.image || x?.product?.images || ""}
                            width={40}
                            height={40}
                            className="h-[40px] w-[40px] rounded-md object-contain"
                          />
                        </div>
                        <div>
                          {x?.product?.title} ({x?.sku?.name})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <b>{x?.qty}</b>
                        <b className="text-emerald-700">
                          ${Number(x?.total || 0).toFixed(2)}
                        </b>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
