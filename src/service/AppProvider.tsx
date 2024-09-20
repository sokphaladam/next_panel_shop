'use client';
import { CustomToastMultiple } from '@/components/custom/CustomToast';
import { PolarisProvider } from './PolarisProvider';
import { UserProvider } from './UserProvider';
import { ApolloWrapper } from './ApolloProvider';
import { LanguageProvider } from './LanguageProvider';
import { NetworkProvider } from './NetworkProvider';
import { SettingProvider } from './useSettingProvider';
import { ToggleProvider } from './ToggleProvider';

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
