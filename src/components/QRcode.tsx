import React from 'react';
import { useQRCode } from 'next-qrcode';

export function QRcode({ value }: { value: string }) {
  const { SVG } = useQRCode();
  return (
    <SVG
      text={value}
      options={{
        margin: 2,
        width: 100,
        // color: {
        //   dark : '#010599FF',
        //   light: '#FFBF60FF',
        // },
      }}
    />
  );
}
