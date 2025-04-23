import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MenuItems } from "@/lib/MenuItems";
import { useUser } from "@/service/UserProvider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useCallback } from "react";
import Image from "next/image";
import { config_app } from "@/lib/config_app";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  const user = useUser();
  const { theme, setTheme } = useTheme();
  const menus = MenuItems(user);

  const menuItems = (items: any[]) => {
    return items.map((item) => {
      if (item.items) {
        return (
          <SidebarMenu key={item.label}>
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild className="text-xs">
                    <Link href="#">
                      {React.cloneElement(<item.icon />, {
                        className: "h-3 w-3",
                      })}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((x: any) => {
                      return (
                        <SidebarMenuSubItem key={x.label}>
                          <SidebarMenuSubButton asChild className="text-xs">
                            <Link href={x.url}>
                              <span>{x.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        );
      }
      return (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton asChild className="text-xs">
            <Link href={item.url}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  const menuGroups = menus.map((menu, idx) => {
    return (
      <SidebarGroup key={idx}>
        <SidebarGroupLabel className="text-xs">{menu.title}</SidebarGroupLabel>
        <SidebarGroupContent>{menuItems(menu.items)}</SidebarGroupContent>
      </SidebarGroup>
    );
  });

  // const onTheme = useCallback(() => {
  //   if (theme === "dark") {
  //     setTheme("light");
  //   } else {
  //     setTheme("dark");
  //   }
  // }, [setTheme, theme]);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center justify-between">
                <Link href="/">
                  <Image
                    src={config_app.public.assets.logo}
                    alt=""
                    width={35}
                    height={35}
                  />
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{menuGroups}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
