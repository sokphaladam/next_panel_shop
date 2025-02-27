"use client";
import React, { useCallback, useState } from "react";
import {
  Icon,
  IconableAction,
  Text,
  TextField,
  TopBar,
} from "@shopify/polaris";
import {
  CheckSmallIcon,
  ExitIcon,
  ButtonPressIcon,
  ContractFilledIcon,
  MenuIcon,
  BarcodeIcon,
} from "@shopify/polaris-icons";
import { deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/service/UserProvider";
import { useLanguage } from "@/service/LanguageProvider";
import { FormShift } from "./polaris/form/FormShift";
import { useToggle } from "@/service/ToggleProvider";
import { useWindowSize } from "@/hook/useWindowSize";
import { FormSearchOrderItem } from "./polaris/form/FormSearchOrderItem";

interface Props {
  mobileNavigationActive: any;
  setMobileNavigationActive: any;
}

export function TopbarMarkup(props: Props) {
  const user = useUser();
  const { setOpen, open } = useToggle();
  const { width } = useWindowSize();
  const [shift, setShift] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const { lng, setLng } = useLanguage();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSecondaryMenuOpenQr, setIsSecondaryMenuOpenQr] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      props.setMobileNavigationActive(
        (mobileNavigationActive: any) => !mobileNavigationActive
      ),
    [props]
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpenQr = useCallback(
    () =>
      setIsSecondaryMenuOpenQr(
        (isSecondaryMenuOpenQr) => !isSecondaryMenuOpenQr
      ),
    []
  );

  const userMenuActions: { items: IconableAction[] }[] = [
    {
      items: [
        [1, 2, 6].includes(user?.role?.id || 0)
          ? {
              content: !!isShift ? "Close Shift" : "Open Shift",
              icon: !!shift ? ContractFilledIcon : ButtonPressIcon,
              onAction: () => {
                setShift(!shift);
              },
            }
          : {},
        {
          content: "Logout",
          icon: ExitIcon,
          onAction: async () => {
            await deleteCookie("tk_token");
            await push("/");
            if (process.browser) {
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }
          },
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user?.display || ""}
      detail={user?.role?.name + ""}
      initials={(user?.display || "")
        .split(" ")
        .map((x) => x.charAt(0).toUpperCase())
        .join("")}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      avatar={user?.profile || ""}
    />
  );

  const secondaryMenuMarkup = (
    <div className="flex flex-row items-center">
      <FormSearchOrderItem
        open={isSecondaryMenuOpenQr}
        setOpen={setIsSecondaryMenuOpenQr}
      />
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon source={BarcodeIcon} tone="inherit" />
          </span>
        }
        open={isSecondaryMenuOpenQr}
        onClose={() => {}}
        onOpen={toggleIsSecondaryMenuOpenQr}
        actions={[]}
      />
      <TopBar.Menu
        activatorContent={
          <span>
            <Text as="span">{lng.toUpperCase()}</Text>
          </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[
          {
            items: [
              {
                content: "English",
                suffix: lng === "en" ? <Icon source={CheckSmallIcon} /> : "",
                onAction: () => setLng("en"),
              },
              {
                content: "Khmer",
                suffix: lng === "km" ? <Icon source={CheckSmallIcon} /> : "",
                onAction: () => setLng("km"),
              },
            ],
          },
        ]}
      />
    </div>
  );

  return (
    <React.Fragment>
      <FormShift open={shift} setOpen={setShift} onShift={setIsShift} />
      <TopBar
        showNavigationToggle
        userMenu={userMenuMarkup}
        onNavigationToggle={toggleMobileNavigationActive}
        secondaryMenu={secondaryMenuMarkup}
        logoSuffix={
          (width || 0) < 1000 && (width || 0) > 770 ? (
            <div
              className="cursor-pointer text-white"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Icon source={MenuIcon} tone="inherit" />
            </div>
          ) : undefined
        }
      />
    </React.Fragment>
  );
}
