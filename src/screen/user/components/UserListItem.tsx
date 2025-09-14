"use client";

import { User } from "@/gql/graphql";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Eye } from "lucide-react";
import Link from "next/link";

export function UserListItem({ user }: { user: User | null }) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase())
      .join("");
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="text-center font-medium">
        <span className="text-sm text-muted-foreground">#{user?.id}</span>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex justify-center">
          <Avatar className="h-10 w-10 shadow">
            {user?.profile && (
              <AvatarImage src={user.profile} alt={user.display || "User"} />
            )}
            <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
              {getInitials(user?.display)}
            </AvatarFallback>
          </Avatar>
        </div>
      </TableCell>

      <TableCell>
        <div className="font-medium">{user?.display || "-"}</div>
      </TableCell>

      <TableCell className="hidden text-center md:table-cell">
        <span className="text-sm capitalize text-muted-foreground">
          {user?.gender?.toLowerCase() || "-"}
        </span>
      </TableCell>

      <TableCell className="hidden text-center lg:table-cell">
        <span className="text-sm text-muted-foreground">
          {formatDate(user?.dob)}
        </span>
      </TableCell>

      <TableCell className="hidden sm:table-cell">
        <span className="text-sm text-muted-foreground">
          {user?.contact || "-"}
        </span>
      </TableCell>

      <TableCell className="hidden text-center lg:table-cell">
        <span className="text-sm text-muted-foreground">
          {formatDate(user?.startingAt)}
        </span>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <span className="text-sm text-muted-foreground">
          {user?.position || "-"}
        </span>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <Badge variant="secondary" className="text-xs">
            {user?.role?.name || "Unknown"}
          </Badge>
          <div className="text-xs text-muted-foreground">
            ({user?.type ?? "SYS"})
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Badge
          variant={user?.isActive ? "default" : "secondary"}
          className={
            user?.isActive
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-gray-100 text-gray-700"
          }
        >
          {user?.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        {user?.type === "STAFF" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/staff/edit/${user?.id}`}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Staff
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/staff/view/${user?.id}`}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
}
