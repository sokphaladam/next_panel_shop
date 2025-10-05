"use client";

import { useActivityStaffQuery, useUserListQuery } from "@/gql/graphql";
import moment from "moment";
import { useState, useMemo } from "react";
import { CalendarIcon, Users, Activity, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StaffLogDialog } from "./staff-log-dialog";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface StaffLogEntry {
  id: string;
  date: string;
  userId: number;
  userName: string;
  type: string;
  status: string;
  text: string;
}

const activityTypes = [
  { value: "all", label: "All Activities" },
  { value: "ATTENDANCE", label: "Attendance" },
  { value: "CHANGE_STATUS_ORDER", label: "Change Status" },
  { value: "ADD_ORDER_ITEM", label: "Add Order Item" },
  { value: "CREATE_ORDER", label: "Create Order" },
  { value: "REMOVE_ORDER_ITEM", label: "Remove Order Item" },
  { value: "PLUS_ORDER_ITEM", label: "Plus Order Item" },
  { value: "SUB_ORDER_ITEM", label: "Subtract Order Item" },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "work":
      return "default";
    case "absent":
      return "destructive";
    case "leave_request":
      return "secondary";
    case "overtime":
      return "outline";
    default:
      return "secondary";
  }
};

export function StaffLog() {
  const today = moment();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: today.clone().subtract(1, "days").toDate(),
    to: today.toDate(),
  });
  const [selectedStaff, setSelectedStaff] = useState<string>("all");
  const [selectedActivityType, setSelectedActivityType] =
    useState<string>("all");

  // Format dates for API
  const from = dateRange.from
    ? moment(dateRange.from).format("YYYY-MM-DD")
    : "";
  const to = dateRange.to ? moment(dateRange.to).format("YYYY-MM-DD") : "";

  const { data: activityData, loading: activityLoading } =
    useActivityStaffQuery({
      variables: {
        from: `${from} 00:00:00`,
        to: `${to} 23:59:59`,
        type:
          selectedActivityType === "all" ? undefined : [selectedActivityType],
        userId: selectedStaff === "all" ? undefined : parseInt(selectedStaff),
      },
      skip: !from || !to,
    });

  const { data: staffData, loading: staffLoading } = useUserListQuery({
    variables: {
      limit: 1000,
      offset: 0,
    },
  });

  // Process activity data
  const staffLogs = useMemo(() => {
    if (!activityData?.activityStaff) return [];

    try {
      const logs = Array.isArray(activityData.activityStaff)
        ? activityData.activityStaff
        : JSON.parse(activityData.activityStaff);

      return logs.map((log: any, index: number) => ({
        id: `${log.user_id}-${log.created_at}-${index}`,
        date: log.created_at,
        userId: log.user_id,
        userName:
          staffData?.userList?.find((f) => f?.id === log.user_id)?.display ||
          "Unknown",
        type: log.type,
        status: log.type,
        text:
          typeof log.description === "string"
            ? log.description
            : JSON.stringify(log.description, null, 2),
      }));
    } catch (error) {
      console.error("Error parsing activity data:", error);
      return [];
    }
  }, [activityData, staffData]);

  // Filter staff list to only active staff members
  const activeStaff = useMemo(() => {
    if (!staffData?.userList) return [];
    return staffData.userList.filter(
      (user: any) => user?.type === "STAFF" && user?.isActive
    );
  }, [staffData]);

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "--";
    return moment(timeString).format("HH:mm");
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMM DD, YYYY");
  };

  if (staffLoading || activityLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Staff Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-[260px] justify-start text-left font-normal",
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
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        });
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Staff Activity Logs
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          View and filter staff activity logs
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-end gap-4">
            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-[260px] justify-start text-left font-normal",
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
                      setDateRange({
                        from: range?.from,
                        to: range?.to,
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Staff Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Staff Member</label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger className="w-[180px]">
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  {activeStaff.map((staff: any) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.display || staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Activity Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Type</label>
              <Select
                value={selectedActivityType}
                onValueChange={setSelectedActivityType}
              >
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Activity type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {staffLogs.length > 0 ? (
                <>
                  Showing {staffLogs.length} entries from {formatDate(from)} to{" "}
                  {formatDate(to)}
                </>
              ) : (
                "No entries found for the selected criteria"
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Activity Type</TableHead>
                  <TableHead>Logs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffLogs.length > 0 ? (
                  staffLogs.map((log: StaffLogEntry) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.date}</TableCell>
                      <TableCell>{log.userName}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(log.type)}>
                          {log.type.replaceAll("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] cursor-pointer truncate">
                        <StaffLogDialog log={log} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Search className="h-8 w-8 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          No activity logs found for the selected criteria
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Try adjusting your filters or date range
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
