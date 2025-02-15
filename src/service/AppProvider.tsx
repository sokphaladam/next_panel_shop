"use client";
import { CustomToastMultiple } from "@/components/custom/CustomToast";
import { PolarisProvider } from "./PolarisProvider";
import { UserProvider } from "./UserProvider";
import { ApolloWrapper } from "./ApolloProvider";
import { LanguageProvider } from "./LanguageProvider";
import { NetworkProvider } from "./NetworkProvider";
import { SettingProvider } from "./useSettingProvider";
import { ToggleProvider } from "./ToggleProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function AppProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <NetworkProvider>
      <ApolloWrapper>
        <LanguageProvider>
          <UserProvider>
            <SettingProvider>
              <ToggleProvider>
                <PolarisProvider>
                  <CustomToastMultiple>{children}</CustomToastMultiple>
                </PolarisProvider>
              </ToggleProvider>
            </SettingProvider>
          </UserProvider>
        </LanguageProvider>
      </ApolloWrapper>
    </NetworkProvider>
  );
}
