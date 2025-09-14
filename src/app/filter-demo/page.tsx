"use client";

import React, { useState } from "react";
import { UserListScreen } from "@/screen/user/UserListScreen";
import { UserListScreenWithHook } from "@/screen/user/UserListScreenWithHook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FilterDemoPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Enhanced User List with Filters</h1>
        <p className="mt-2 text-muted-foreground">
          Demonstrating advanced filtering by Status, Role, and Position
        </p>
      </div>

      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enhanced">Enhanced UserListScreen</TabsTrigger>
          <TabsTrigger value="hook">With Custom Hook</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced UserListScreen</CardTitle>
              <p className="text-sm text-muted-foreground">
                Original UserListScreen component enhanced with Role and
                Position filters
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted p-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Filter Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Search by name, contact, position, role</li>
                      <li>• Filter by active/inactive status</li>
                      <li>• Filter by role (dropdown)</li>
                      <li>• Filter by position (dropdown)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">UI Enhancements:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Active filter count indicator</li>
                      <li>• Clear all filters button</li>
                      <li>• Filter status badges</li>
                      <li>• Responsive filter layout</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">
                      Pagination Features:
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Advanced pagination component</li>
                      <li>• Jump to page functionality</li>
                      <li>• Items per page selector</li>
                      <li>• Client-side data handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <UserListScreen />
        </TabsContent>

        <TabsContent value="hook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UserListScreen with Custom Hook</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enhanced implementation using the useClientPagination hook with
                multiple pagination styles
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted p-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Hook Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• useClientPagination hook</li>
                      <li>• State management centralization</li>
                      <li>• Reusable pagination logic</li>
                      <li>• Helper functions included</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">
                      Pagination Styles:
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Advanced pagination</li>
                      <li>• Simple pagination</li>
                      <li>• Compact pagination</li>
                      <li>• Dynamic style switching</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">
                      Additional Features:
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• All filters from enhanced version</li>
                      <li>• Pagination style selector</li>
                      <li>• Enhanced badges and indicators</li>
                      <li>• Better state management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <UserListScreenWithHook />
        </TabsContent>
      </Tabs>

      {/* Filter Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold">Filter State Management</h4>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <div className="space-y-1">
                  <div>{`const [statusFilter, setStatusFilter] = useState("all");`}</div>
                  <div>{`const [roleFilter, setRoleFilter] = useState("all");`}</div>
                  <div>{`const [positionFilter, setPositionFilter] = useState("all");`}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">
                Filter Logic Implementation
              </h4>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <div className="space-y-1">
                  <div>{`const matchesRole = roleFilter === "all" ||`}</div>
                  <div>{`  user?.role?.name === roleFilter;`}</div>
                  <div className="mt-2">{`const matchesPosition = positionFilter === "all" ||`}</div>
                  <div>{`  user?.position === positionFilter;`}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 font-semibold">Unique Values Extraction</h4>
            <div className="rounded-lg bg-muted p-4 font-mono text-sm">
              <div className="space-y-1">
                <div>{`const uniqueRoles = useMemo(() => {`}</div>
                <div>{`  if (!data?.userList) return [];`}</div>
                <div>{`  const roles = data.userList`}</div>
                <div>{`    .map((user) => user?.role?.name)`}</div>
                <div>{`    .filter((role): role is string => !!role);`}</div>
                <div>{`  return Array.from(new Set(roles)).sort();`}</div>
                <div>{`}, [data?.userList]);`}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
