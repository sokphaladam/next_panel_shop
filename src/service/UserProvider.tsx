"use client";
import {
  Shift,
  User,
  useCheckHaveOpenShiftTodayQuery,
  useMeQuery,
  useShiftByIdQuery,
} from "@/gql/graphql";
import moment from "moment";
import React, { PropsWithChildren, useContext, useEffect } from "react";

interface IUser extends User {
  isHaveShift: boolean;
  shift: Shift | null;
}

const UserContext = React.createContext<IUser | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: PropsWithChildren<unknown>) {
  const { data } = useMeQuery();
  const queryCheck = useCheckHaveOpenShiftTodayQuery();
  const queryShift = useShiftByIdQuery({
    skip: !data?.me,
    variables: {
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      userId: data?.me?.id,
    },
  });

  return (
    <UserContext.Provider
      value={{
        ...((data?.me as IUser) || null),
        isHaveShift: queryCheck.data?.checkHaveOpenShiftToday || false,
        shift: queryShift.data?.shiftById || null,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
