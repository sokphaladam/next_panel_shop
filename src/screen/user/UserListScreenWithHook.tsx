"use client";
import { useUserListQuery } from "@/gql/graphql";
import { useClientPagination } from "@/hook/usePagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Search, UserPlus, ChevronDown, Filter } from "lucide-react";
import React, { useState, useMemo } from "react";
import { UserListItem } from "./components/UserListItem";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdvancedPagination } from "@/components/ui/advanced-pagination";
import { SimplePagination } from "@/components/ui/simple-pagination";

export function UserListScreenWithHook() {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleItemsPerPageChange,
    getPaginatedData,
    getPaginationInfo,
  } = useClientPagination();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [paginationStyle, setPaginationStyle] = useState<
    "advanced" | "simple" | "compact"
  >("advanced");

  const { data, loading } = useUserListQuery({
    variables: {
      limit: 1000, // Fetch more data for client-side pagination
      offset: 0,
    },
  });

  // Extract unique roles and positions for filters
  const uniqueRoles = useMemo(() => {
    if (!data?.userList) return [];
    const roles = data.userList
      .map((user) => user?.role?.name)
      .filter((role): role is string => !!role);
    return Array.from(new Set(roles)).sort();
  }, [data?.userList]);

  const uniquePositions = useMemo(() => {
    if (!data?.userList) return [];
    const positions = data.userList
      .map((user) => user?.position)
      .filter((position): position is string => !!position);
    return Array.from(new Set(positions)).sort();
  }, [data?.userList]);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    if (!data?.userList) return [];

    return data.userList.filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user?.display?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.role?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user?.isActive) ||
        (statusFilter === "inactive" && !user?.isActive);

      const matchesRole =
        roleFilter === "all" || user?.role?.name === roleFilter;

      const matchesPosition =
        positionFilter === "all" || user?.position === positionFilter;

      return matchesSearch && matchesStatus && matchesRole && matchesPosition;
    });
  }, [data?.userList, searchTerm, statusFilter, roleFilter, positionFilter]);

  // Get paginated data and pagination info
  const paginatedUsers = getPaginatedData(filteredUsers);
  const paginationInfo = getPaginationInfo(filteredUsers.length);

  const activeUsers =
    data?.userList?.filter((user) => user?.isActive).length || 0;
  const inactiveUsers = (data?.userList?.length || 0) - activeUsers;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, roleFilter, positionFilter, setCurrentPage]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Staff Members (with Hook)</h1>
            <p className="text-sm text-muted-foreground">
              Enhanced pagination using useClientPagination hook
            </p>
          </div>
        </div>
        <Link
          href="/staff/create"
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex items-center gap-2"
          )}
        >
          <UserPlus className="h-4 w-4" />
          Add New Staff
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Staff
                </p>
                <p className="text-3xl font-bold">
                  {data?.userList?.length || 0}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {activeUsers}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Inactive
                </p>
                <p className="text-3xl font-bold text-gray-600">
                  {inactiveUsers}
                </p>
              </div>
              <div className="rounded-full bg-gray-100 p-3">
                <div className="h-6 w-6 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search, Filter, and Pagination Style Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("inactive")}
          >
            Inactive
          </Button>
        </div>
      </div>

      {/* Pagination Style Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Pagination Style:</span>
          <div className="flex gap-2">
            <Button
              variant={paginationStyle === "advanced" ? "default" : "outline"}
              size="sm"
              onClick={() => setPaginationStyle("advanced")}
            >
              Advanced
            </Button>
            <Button
              variant={paginationStyle === "simple" ? "default" : "outline"}
              size="sm"
              onClick={() => setPaginationStyle("simple")}
            >
              Simple
            </Button>
            <Button
              variant={paginationStyle === "compact" ? "default" : "outline"}
              size="sm"
              onClick={() => setPaginationStyle("compact")}
            >
              Compact
            </Button>
          </div>
        </div>
      </Card>

      {/* Staff List Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Staff List</CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {filteredUsers.length}{" "}
                {filteredUsers.length === 1 ? "result" : "results"}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Page {currentPage} of {paginationInfo.totalPages}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead className="w-20 text-center">Profile</TableHead>
                  <TableHead className="min-w-[150px]">Staff Name</TableHead>
                  <TableHead className="hidden text-center md:table-cell">
                    Gender
                  </TableHead>
                  <TableHead className="hidden text-center lg:table-cell">
                    Date of Birth
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden text-center lg:table-cell">
                    Start Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Position
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-20 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => {
                  return (
                    <UserListItem
                      user={{ ...user, id: user?.id || 0 }}
                      key={user?.id}
                    />
                  );
                })}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <td colSpan={11} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm || statusFilter !== "all"
                            ? "No users match your search criteria"
                            : "No users found"}
                        </p>
                        {(searchTerm || statusFilter !== "all") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchTerm("");
                              setStatusFilter("all");
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Dynamic Pagination Component */}
          {filteredUsers.length > 0 && (
            <div className="border-t p-4">
              {paginationStyle === "advanced" && (
                <AdvancedPagination
                  currentPage={currentPage}
                  totalItems={filteredUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showJumpToPage={true}
                  showItemsPerPageSelector={true}
                  pageSizeOptions={[10, 25, 50, 100]}
                />
              )}
              {paginationStyle === "simple" && (
                <SimplePagination
                  currentPage={currentPage}
                  totalItems={filteredUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  showItemCount={true}
                  compact={false}
                />
              )}
              {paginationStyle === "compact" && (
                <SimplePagination
                  currentPage={currentPage}
                  totalItems={filteredUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  showItemCount={true}
                  compact={true}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
