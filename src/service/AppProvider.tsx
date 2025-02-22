"use client";
import { CustomToastMultiple } from "@/components/custom/CustomToast";
import { PolarisProvider } from "./PolarisProvider";
import { UserProvider } from "./UserProvider";
import { ApolloWrapper } from "./ApolloProvider";
import { LanguageProvider } from "./LanguageProvider";
import { NetworkProvider } from "./NetworkProvider";
import { SettingProvider, useSetting } from "./useSettingProvider";
import { ToggleProvider, useToggle } from "./ToggleProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { config_app } from "@/lib/config_app";
import { ModalComponent } from "@/components/ModalServer";
import { Modal } from "@/hook/modal";
import "@/app/globals.css";

function AppPage({ children }: React.PropsWithChildren<any>) {
  const setting = useSetting();
  const pwdwifi = setting.find((f) => f.option === "GUEST_WIFI")?.value;
  return (
    <div className="flex flex-col justify-between">
      {config_app.public.assets.dev === "development" && (
        <div className="sticky bottom-0 w-full bg-sky-800 p-1 text-center text-xs text-white">
          Developer Mode
        </div>
      )}
      <div className="w-full text-center">
        <div>
          Wifi: <b>Staff-GF</b>
        </div>
        <div>
          Password: <b>{pwdwifi}</b>
        </div>
      </div>
      <div>
        {/* <ModalComponent ref={(t) => Modal.setModal(t)} /> */}
        {children}
      </div>
    </div>
  );
}

export function AppProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <NetworkProvider>
      <ApolloWrapper>
        <LanguageProvider>
          <UserProvider>
            <SettingProvider>
              <ToggleProvider>
                <PolarisProvider>
                  <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full px-5">
                      <CustomToastMultiple>{children}</CustomToastMultiple>
                    </div>
                  </SidebarProvider>
                </PolarisProvider>
                {/* <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <SidebarTrigger />
                    <CustomToastMultiple>
                      <AppPage>{children}</AppPage>
                    </CustomToastMultiple>
                  </SidebarInset>
                </SidebarProvider> */}
              </ToggleProvider>
            </SettingProvider>
          </UserProvider>
        </LanguageProvider>
      </ApolloWrapper>
    </NetworkProvider>
  );
}
