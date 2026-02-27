"use client";

import React, { useState } from "react";
import { useReportSaleBreakDownQuery, ReportSaleGroupBy } from "@/gql/graphql";
import { onGetExportExcel } from "@/lib/DownloadExcelFile";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function ReportSaleBreakDownScreen() {
  // Initialize date range state with default dates
  const now = moment();
  const [dateRange, setDateRange] = useState({
    from: new Date(now.clone().startOf("day").format("YYYY-MM-DD")),
    to: new Date(now.format("YYYY-MM-DD")),
  });
  const [groupByProduct, setGroupByProduct] = useState(true);

  const { data, loading } = useReportSaleBreakDownQuery({
    variables: {
      from: moment(dateRange.from).format("YYYY-MM-DD"),
      to: moment(dateRange.to).format("YYYY-MM-DD 23:59:59"),
      groupBy: groupByProduct
        ? ReportSaleGroupBy.Product
        : ReportSaleGroupBy.Date,
    },
  });

  if (!loading && !data?.reportSaleBreakDown) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  const { grandTotal, categories } = data?.reportSaleBreakDown || {
    grandTotal: {},
    categories: {},
  };

  const formatNumber = (value: number | string) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const exportToExcel = () => {
    if (!data?.reportSaleBreakDown) return;

    const { grandTotal, categories } = data.reportSaleBreakDown;

    // Prepare Excel data as array of objects
    const excelData: Record<string, unknown>[] = [];

    // Add Grand Total row
    excelData.push({
      Type: "GRAND TOTAL",
      "Product Code": "",
      "Product Name": "",
      ...(!groupByProduct && { "Ordered At": "" }),
      Quantity: parseFloat(grandTotal.quantity),
      "Supply Price": parseFloat(grandTotal.supply_price),
      "Total Price": parseFloat(grandTotal.total_price),
      Discount: parseFloat(grandTotal.discount),
      Revenue: parseFloat(grandTotal.revenue),
      Profit: parseFloat(grandTotal.profit),
    });

    // Add categories and products
    Object.entries(categories as Record<string, any>).forEach(
      ([categoryName, categoryData]) => {
        // Add Category Summary row
        excelData.push({
          Type: "Category Summary",
          "Product Code": "",
          "Product Name": `Category: ${categoryData.category}`,
          ...(!groupByProduct && { "Ordered At": "" }),
          Quantity: parseFloat(categoryData.summary.quantity),
          "Supply Price": parseFloat(categoryData.summary.supply_price),
          "Total Price": parseFloat(categoryData.summary.total_price),
          Discount: parseFloat(categoryData.summary.discount),
          Revenue: parseFloat(categoryData.summary.revenue),
          Profit: parseFloat(categoryData.summary.profit),
        });

        // Add product detail rows
        categoryData.products.forEach((product: any) => {
          const productName =
            product.product_name && product.product_name.trim()
              ? `${product.product_name} - ${product.sku_name}`
              : product.sku_name;

          excelData.push({
            Type: "Detail",
            "Product Code": `${product.product_code}-${product.product_id}-${product.sku_id}`,
            "Product Name": productName,
            ...(!groupByProduct && { "Ordered At": product.created_at }),
            Quantity: parseFloat(product.quantity),
            "Supply Price": parseFloat(product.supply_price),
            "Total Price": parseFloat(product.total_price),
            Discount: parseFloat(product.discount),
            Revenue: parseFloat(product.revenue),
            Profit: parseFloat(product.profit),
          });
        });
      }
    );

    // Generate filename with selected date range
    const fromDate = moment(dateRange.from).format("YYYY-MM-DD");
    const toDate = moment(dateRange.to).format("YYYY-MM-DD");
    const fileName = `Sale_Breakdown_Report_From_${fromDate}_to_${toDate}`;

    onGetExportExcel(
      excelData,
      fileName,
      `Sale Breakdown From ${moment(dateRange.from).format(
        "YYYY-MM-DD"
      )}-to-${moment(dateRange.to).format("YYYY-MM-DD")}`,
      {
        boldRows: ["GRAND TOTAL", "Category Summary"],
        title: `Sale Breakdown Report From ${moment(dateRange.from).format(
          "YYYY-MM-DD"
        )} to ${moment(dateRange.to).format("YYYY-MM-DD")}`,
      }
    );
  };

  const categoryEntries = Object.entries(categories as Record<string, any>);

  return (
    <div className="bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold">📋 Detailed Breakdown</h1>
          <div className="text-sm text-gray-600">
            Sale Breakdown Report From{" "}
            {moment(dateRange.from).format("YYYY-MM-DD")} to{" "}
            {moment(dateRange.to).format("YYYY-MM-DD")}
          </div>
          <div className="text-sm text-gray-600">
            {data?.reportSaleBreakDown
              ? Object.values(
                  data.reportSaleBreakDown.categories as Record<string, any>
                ).reduce(
                  (total, category: any) => total + category.products.length,
                  0
                )
              : 0}{" "}
            records
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Group By Product Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="groupByProduct"
              checked={groupByProduct}
              onCheckedChange={(checked) => setGroupByProduct(checked === true)}
            />
            <Label
              htmlFor="groupByProduct"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Group by Product
            </Label>
          </div>

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {moment(dateRange.from).format("MMM DD, YYYY")} -{" "}
                      {moment(dateRange.to).format("MMM DD, YYYY")}
                    </>
                  ) : (
                    moment(dateRange.from).format("MMM DD, YYYY")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from) {
                    setDateRange({
                      from: range.from,
                      to: range.to || range.from,
                    });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Export Button */}
          <button
            onClick={exportToExcel}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            📊 Export to Excel
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="border-r p-3 text-left font-medium text-gray-700">
                  Product Code
                </th>
                <th className="border-r p-3 text-left font-medium text-gray-700">
                  Product Name
                </th>
                {!groupByProduct && (
                  <th className="border-r p-3 text-left font-medium text-gray-700">
                    Ordered At
                  </th>
                )}
                <th className="border-r p-3 text-right font-medium text-gray-700">
                  Quantity
                </th>
                <th className="border-r p-3 text-right font-medium text-gray-700">
                  Supply Price
                </th>
                <th className="border-r p-3 text-right font-medium text-gray-700">
                  Total Price
                </th>
                <th className="border-r p-3 text-right font-medium text-gray-700">
                  Discount
                </th>
                <th className="border-r p-3 text-right font-medium text-gray-700">
                  Revenue
                </th>
                <th className="p-3 text-right font-medium text-gray-700">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Grand Total Row */}
              <tr className="border-b-2 border-blue-200 bg-blue-50 font-bold">
                <td className="border-r p-3">📈</td>
                <td className="border-r p-3 text-blue-800">GRAND TOTAL</td>
                {!groupByProduct && (
                  <td className="border-r p-3 text-blue-800">-</td>
                )}
                <td className="border-r p-3 text-right">
                  {formatNumber(grandTotal.quantity)}
                </td>
                <td className="border-r p-3 text-right">
                  {formatNumber(grandTotal.supply_price)}
                </td>
                <td className="border-r p-3 text-right text-blue-800">
                  {formatNumber(grandTotal.total_price)}
                </td>
                <td className="border-r p-3 text-right">
                  {formatNumber(grandTotal.discount)}
                </td>
                <td className="border-r p-3 text-right text-green-700">
                  {formatNumber(grandTotal.revenue)}
                </td>
                <td className="p-3 text-right text-green-700">
                  {formatNumber(grandTotal.profit)}
                </td>
              </tr>

              {/* Categories and Products */}
              {Object.entries(categories as Record<string, any>).map(
                ([categoryName, categoryData]) => (
                  <React.Fragment key={categoryName}>
                    {/* Category Header Row */}
                    <tr className="border-b bg-gray-100 font-semibold">
                      <td className="border-r p-3">🏷️</td>
                      <td className="border-r p-3 text-gray-700">
                        Category: {categoryData.category}
                      </td>
                      {!groupByProduct && (
                        <td className="border-r p-3 text-right">-</td>
                      )}
                      <td className="border-r p-3 text-right">
                        {formatNumber(categoryData.summary.quantity)}
                      </td>
                      <td className="border-r p-3 text-right">
                        {formatNumber(categoryData.summary.supply_price)}
                      </td>
                      <td className="border-r p-3 text-right">
                        {formatNumber(categoryData.summary.total_price)}
                      </td>
                      <td className="border-r p-3 text-right">
                        {formatNumber(categoryData.summary.discount)}
                      </td>
                      <td className="border-r p-3 text-right text-green-600">
                        {formatNumber(categoryData.summary.revenue)}
                      </td>
                      <td className="p-3 text-right text-green-600">
                        {formatNumber(categoryData.summary.profit)}
                      </td>
                    </tr>

                    {/* Product Rows */}
                    {categoryData.products.map(
                      (product: any, index: number) => (
                        <tr
                          key={`${categoryName}-${product.product_id}-${index}`}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="border-r p-3 text-sm">
                            {product.product_code}-{product.product_id}-
                            {product.sku_id}
                          </td>
                          <td className="border-r p-3 text-sm">
                            {product.product_name && product.product_name.trim()
                              ? `${product.product_name} - ${product.sku_name}`
                              : product.sku_name}
                          </td>
                          {!groupByProduct && (
                            <td className="border-r p-3 text-sm">
                              {product.created_at}
                            </td>
                          )}
                          <td className="border-r p-3 text-right text-sm">
                            {formatNumber(parseFloat(product.quantity))}
                          </td>
                          <td className="border-r p-3 text-right text-sm">
                            {formatNumber(parseFloat(product.supply_price))}
                          </td>
                          <td className="border-r p-3 text-right text-sm">
                            {formatNumber(parseFloat(product.total_price))}
                          </td>
                          <td className="border-r p-3 text-right text-sm">
                            {formatNumber(parseFloat(product.discount))}
                          </td>
                          <td className="border-r p-3 text-right text-sm text-green-600">
                            {formatNumber(parseFloat(product.revenue))}
                          </td>
                          <td className="p-3 text-right text-sm text-green-600">
                            {formatNumber(parseFloat(product.profit))}
                          </td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
