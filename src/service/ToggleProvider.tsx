'use client';
import { User, useMeQuery } from '@/gql/graphql';
import React, { PropsWithChildren, useContext, useState } from 'react';

const ToggleContext = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({
  open: true,
  setOpen: (v) => {},
});

export function useToggle() {
  return useContext(ToggleContext);
}

export function ToggleProvider(props: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState(true);

  return <ToggleContext.Provider value={{ open, setOpen }}>{props.children}</ToggleContext.Provider>;
}
