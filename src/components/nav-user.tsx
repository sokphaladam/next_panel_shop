"use client";
import { ChevronsUpDown, LogOut, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useUser } from "@/service/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormShift } from "./polaris/form/FormShift";
import { useState } from "react";

export function NavUser() {
  const user = useUser();
  const { push } = useRouter();
  const { isMobile } = useSidebar();
  const [shift, setShift] = useState(false);
  const [isShift, setIsShift] = useState(false);

  const onLogout = async () => {
    await deleteCookie("tk_token");
    await push("/");
    if (process.browser) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <>
      <FormShift open={shift} setOpen={setShift} onShift={setIsShift} />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profile || ""}
                    alt={user?.display || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {(user?.display || "")
                      .split(" ")
                      .map((x) => x.charAt(0).toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.display}
                  </span>
                  <span className="truncate text-xs">
                    {user?.role?.name || ""}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.profile || ""}
                      alt={user?.display || ""}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.display || ""}
                    </span>
                    <span className="truncate text-xs">
                      {user?.role?.name || ""}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setShift(!shift)}>
                  <Sparkles />
                  {!!isShift ? "Close Shift" : "Open Shift"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
