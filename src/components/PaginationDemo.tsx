"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedPagination } from "@/components/ui/advanced-pagination";
import { SimplePagination } from "@/components/ui/simple-pagination";
import { Badge } from "@/components/ui/badge";

// Sample data for demonstration
const generateSampleData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.3 ? "active" : "inactive",
  }));
};

export function PaginationDemo() {
  const [sampleData] = useState(() => generateSampleData(234)); // Sample 234 items

  // Advanced Pagination State
  const [advancedPage, setAdvancedPage] = useState(1);
  const [advancedItemsPerPage, setAdvancedItemsPerPage] = useState(25);

  // Simple Pagination State
  const [simplePage, setSimplePage] = useState(1);
  const [simpleItemsPerPage] = useState(10);

  // Compact Pagination State
  const [compactPage, setCompactPage] = useState(1);
  const [compactItemsPerPage] = useState(15);

  // Get paginated data for each example
  const getAdvancedData = () => {
    const start = (advancedPage - 1) * advancedItemsPerPage;
    const end = start + advancedItemsPerPage;
    return sampleData.slice(start, end);
  };

  const getSimpleData = () => {
    const start = (simplePage - 1) * simpleItemsPerPage;
    const end = start + simpleItemsPerPage;
    return sampleData.slice(start, end);
  };

  const getCompactData = () => {
    const start = (compactPage - 1) * compactItemsPerPage;
    const end = start + compactItemsPerPage;
    return sampleData.slice(start, end);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Pagination Components Demo</h1>
        <p className="mt-2 text-muted-foreground">
          Showcasing different pagination styles for client-side data
        </p>
      </div>

      {/* Advanced Pagination Example */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Pagination</CardTitle>
          <p className="text-sm text-muted-foreground">
            Full-featured pagination with page numbers, jump-to-page, and
            items-per-page selector
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sample data display */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getAdvancedData().map((item) => (
              <div key={item.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.email}
                    </p>
                  </div>
                  <Badge
                    variant={item.status === "active" ? "default" : "secondary"}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <AdvancedPagination
            currentPage={advancedPage}
            totalItems={sampleData.length}
            itemsPerPage={advancedItemsPerPage}
            onPageChange={setAdvancedPage}
            onItemsPerPageChange={(newSize) => {
              setAdvancedItemsPerPage(newSize);
              setAdvancedPage(1);
            }}
            showJumpToPage={true}
            showItemsPerPageSelector={true}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        </CardContent>
      </Card>

      {/* Simple Pagination Example */}
      <Card>
        <CardHeader>
          <CardTitle>Simple Pagination</CardTitle>
          <p className="text-sm text-muted-foreground">
            Clean and minimal pagination with navigation buttons
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sample data display */}
          <div className="space-y-2">
            {getSimpleData().map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                </div>
                <Badge
                  variant={item.status === "active" ? "default" : "secondary"}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>

          <SimplePagination
            currentPage={simplePage}
            totalItems={sampleData.length}
            itemsPerPage={simpleItemsPerPage}
            onPageChange={setSimplePage}
            showItemCount={true}
            compact={false}
          />
        </CardContent>
      </Card>

      {/* Compact Pagination Example */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Pagination</CardTitle>
          <p className="text-sm text-muted-foreground">
            Space-efficient pagination perfect for mobile or tight spaces
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sample data display */}
          <div className="grid grid-cols-2 gap-2">
            {getCompactData().map((item) => (
              <div key={item.id} className="rounded-lg border p-2">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.email}</p>
                <Badge
                  variant={item.status === "active" ? "default" : "secondary"}
                  className="mt-1 text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>

          <SimplePagination
            currentPage={compactPage}
            totalItems={sampleData.length}
            itemsPerPage={compactItemsPerPage}
            onPageChange={setCompactPage}
            showItemCount={true}
            compact={true}
          />
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">
                Advanced Pagination Features:
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Page number buttons with ellipsis</li>
                <li>• Jump to specific page input</li>
                <li>• Items per page selector</li>
                <li>• First/Last page quick navigation</li>
                <li>• Responsive design</li>
                <li>• Detailed item count display</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">
                Simple Pagination Features:
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Previous/Next navigation</li>
                <li>• Current page indicator</li>
                <li>• Optional item count</li>
                <li>• First/Last page buttons</li>
                <li>• Compact mode available</li>
                <li>• Mobile-friendly design</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-semibold">Usage Examples:</h4>
            <div className="rounded-lg bg-muted p-4 font-mono text-sm">
              <div className="mb-2">{`// Advanced Pagination`}</div>
              <div className="mb-2">{`<AdvancedPagination`}</div>
              <div className="mb-2">{`  currentPage={page}`}</div>
              <div className="mb-2">{`  totalItems={totalItems}`}</div>
              <div className="mb-2">{`  itemsPerPage={itemsPerPage}`}</div>
              <div className="mb-2">{`  onPageChange={setPage}`}</div>
              <div className="mb-2">
                {`  onItemsPerPageChange={setItemsPerPage}`}
              </div>
              <div className="mb-2">{`/>`}</div>
              <div className="mb-2 mt-4">{`// Simple Pagination`}</div>
              <div className="mb-2">{`<SimplePagination`}</div>
              <div className="mb-2">{`  currentPage={page}`}</div>
              <div className="mb-2">{`  totalItems={totalItems}`}</div>
              <div className="mb-2">{`  itemsPerPage={itemsPerPage}`}</div>
              <div className="mb-2">{`  onPageChange={setPage}`}</div>
              <div className="mb-2">
                {`  compact={true} // for compact mode`}
              </div>
              <div>{`/>`}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
