'use client';
import React, { useEffect, useState } from 'react';

export function NetworkProvider({ children }: React.PropsWithChildren<any>) {
  const [offline, setOffLine] = useState(false);
  useEffect(() => {
    if (process.browser) {
      window.addEventListener('load', () => {
        if (navigator.onLine) {
          //
        }

        window.addEventListener('offline', () => {
          setOffLine(true);
          alert('You might be offline please check you internet connection!');
        });
      });
    }
  }, []);

  if (!!offline) {
    return (
      <React.Fragment>
        <div>Offline</div>
      </React.Fragment>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
