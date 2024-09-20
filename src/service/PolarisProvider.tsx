'use client';
import React, { useCallback, useState } from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, LegacyCard, Button, Frame, FooterHelp } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import '@/app/globals.css';
import { config_app } from '@/lib/config_app';
import { TopbarMarkup } from '@/components/TopbarMakerup';
import { NavigationMarkup } from '@/components/NavigationMarkup';
import { TokenVerification } from './TokenProvider';
import Link from 'next/link';
import { ModalComponent } from '@/components/ModalServer';
import { Modal } from '@/hook/modal';
import { useSetting } from './useSettingProvider';
import { useToggle } from './ToggleProvider';

const logo = {
  width: 35,
  topBarSource: config_app.public.assets.logo,
  contextualSaveBarSource: config_app.public.assets.logo,
  url: '/',
  accessibilityLabel: 'LOGO',
};

export function PolarisProvider({ children }: React.PropsWithChildren<any>) {
  const setting = useSetting();
  const { open } = useToggle();
  const [verify, setVerify] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((mobileNavigationActive) => !mobileNavigationActive),
    [],
  );

  const pwdwifi = setting.find((f) => f.option === 'GUEST_WIFI')?.value;

  return (
    <AppProvider
      i18n={enTranslations}
      features={{
        polarisSummerEditions2023: true,
        polarisSummerEditions2023ShadowBevelOptOut: true,
      }}
      linkComponent={({ children, url, ...rest }: { children?: React.ReactNode; url: string }) => {
        return (
          <Link href={url} {...rest}>
            {children}
          </Link>
        );
      }}
    >
      <TokenVerification onCompleted={setVerify} />
      <Frame
        logo={verify ? logo : undefined}
        topBar={
          verify ? (
            <TopbarMarkup
              mobileNavigationActive={mobileNavigationActive}
              setMobileNavigationActive={setMobileNavigationActive}
            />
          ) : null
        }
        showMobileNavigation={mobileNavigationActive && verify}
        onNavigationDismiss={toggleMobileNavigationActive}
        navigation={verify && open ? <NavigationMarkup onClick={toggleMobileNavigationActive} /> : null}
      >
        <div className="flex flex-col justify-between">
          {config_app.public.assets.dev === 'development' && (
            <div className="bg-sky-800 w-full p-1 text-white text-center text-xs sticky bottom-0">Developer Mode</div>
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
            <ModalComponent ref={(t) => Modal.setModal(t)} />
            {children}
          </div>
        </div>
      </Frame>
    </AppProvider>
  );
}
