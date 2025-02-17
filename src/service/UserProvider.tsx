"use client";
import {
  User,
  useCheckHaveOpenShiftTodayQuery,
  useMeQuery,
} from "@/gql/graphql";
import React, { PropsWithChildren, useContext, useEffect } from "react";

interface IUser extends User {
  isHaveShift: boolean;
}

const UserContext = React.createContext<IUser | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: PropsWithChildren<unknown>) {
  const { data } = useMeQuery();
  const queryCheck = useCheckHaveOpenShiftTodayQuery();

  return (
    <UserContext.Provider
      value={{
        ...((data?.me as IUser) || null),
        isHaveShift: queryCheck.data?.checkHaveOpenShiftToday || false,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
