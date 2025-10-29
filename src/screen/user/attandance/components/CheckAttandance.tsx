"use client";

import { useCustomToast } from "@/components/custom/CustomToast";
import {
  useCheckAttendanceMutation,
  useGetAttendanceStaffTodayQuery,
} from "@/gql/graphql";
import { Modal } from "@/hook/modal";
import { haversineDistance } from "@/lib/loacationDistance";
import { useUser } from "@/service/UserProvider";
import { useSetting } from "@/service/useSettingProvider";
import { Box, Card, Text } from "@shopify/polaris";
import moment from "moment";
import React, { useCallback, useState } from "react";

export function CheckAttandance() {
  const setting = useSetting();
  const user = useUser();
  const { toasts, setToasts } = useCustomToast();
  const [allow] = useState(true);
  const { data, loading } = useGetAttendanceStaffTodayQuery({
    variables: {
      date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    },
  });
  const [attendance, propUpdate] = useCheckAttendanceMutation({
    refetchQueries: ["getAttendanceStaffToday", "getAttendanceStaff"],
  });

  const handleCheckIn = useCallback(() => {
    const d = new Date();
    Modal.dialog({
      title: "Confirmation",
      body: [
        <div key={1}>
          You are check in at {moment(d).format("YYYY-MM-DD HH:mm:ss")}
        </div>,
      ],
      buttons: [
        {
          title: "Confirm",
          onPress: () => {
            attendance({
              variables: {
                userId: Number(user?.id),
                date: moment(d).format("YYYY-MM-DD HH:mm:ss"),
              },
            })
              .then((res) => {
                if (res.data?.checkAttendance) {
                  setToasts([
                    ...toasts,
                    {
                      content: `Check in at ${moment(d).format("YYYY-MM-DD HH:mm:ss")}`,
                      status: "success",
                    },
                  ]);
                  setTimeout(() => {
                    typeof window !== "undefined" && window.location.reload();
                  }, 500);
                } else {
                  setToasts([
                    ...toasts,
                    {
                      content: `Oop! someting was wrong please try again.`,
                      status: "error",
                    },
                  ]);
                }
              })
              .catch(() => {
                setToasts([
                  ...toasts,
                  {
                    content: `Oop! someting was wrong please try again.`,
                    status: "error",
                  },
                ]);
              });
          },
        },
      ],
    });
  }, [attendance, setToasts, toasts, user?.id]);

  const handleCheckOut = useCallback(() => {
    const d = new Date();
    Modal.dialog({
      title: "Confirmation",
      body: [
        <div key={1}>
          You are check out at {moment(d).format("YYYY-MM-DD HH:mm:ss")}
        </div>,
      ],
      buttons: [
        {
          title: "Confirm",
          onPress: () => {
            attendance({
              variables: {
                userId: Number(user?.id),
                date: moment(d).format("YYYY-MM-DD HH:mm:ss"),
              },
            })
              .then((res) => {
                if (res.data?.checkAttendance) {
                  setToasts([
                    ...toasts,
                    {
                      content: `Check out at ${moment(d).format("YYYY-MM-DD HH:mm:ss")}`,
                      status: "success",
                    },
                  ]);
                  setTimeout(() => {
                    typeof window !== "undefined" && window.location.reload();
                  }, 500);
                } else {
                  setToasts([
                    ...toasts,
                    {
                      content: `Oop! someting was wrong please try again.`,
                      status: "error",
                    },
                  ]);
                }
              })
              .catch(() => {
                setToasts([
                  ...toasts,
                  {
                    content: `Oop! someting was wrong please try again.`,
                    status: "error",
                  },
                ]);
              });
          },
        },
      ],
    });
  }, [attendance, setToasts, toasts, user?.id]);

  if (setting.length <= 0 && !user?.id) {
    return <></>;
  }

  console.log(user);

  const today = moment(new Date()).format("DD-MMM-YYYY");
  const start = user?.fromTime;
  const end = user?.toTime;
  const break_time = setting.find(
    (f) => f.option === "DEFAULT_BREAKWORK"
  )?.value;

  if (loading || !!propUpdate.loading) {
    return <></>;
  }

  return (
    <Card>
      <Box>
        <Text as="h3" variant="headingMd">
          Timesheet {today}
        </Text>
      </Box>
      <br />
      <Box
        background="bg-fill-secondary"
        borderRadius="200"
        padding={"300"}
        borderColor="input-border-active"
      >
        {data && (
          <div className="flex flex-row justify-between">
            {data?.getAttendanceStaffToday &&
              data?.getAttendanceStaffToday.checkIn && (
                <Text as="h3" variant="headingMd">
                  CheckIn (
                  {moment(data?.getAttendanceStaffToday.checkIn).format("LT")})
                </Text>
              )}
            {data?.getAttendanceStaffToday &&
              data?.getAttendanceStaffToday?.checkOut && (
                <Text as="h3" variant="headingMd">
                  CheckOut: (
                  {moment(data?.getAttendanceStaffToday.checkOut).format("LT")})
                </Text>
              )}
          </div>
        )}
      </Box>
      <br />
      <Box>
        <div className="flex flex-col items-center justify-between">
          <div className="my-5 border-collapse border-spacing-1 rounded-full border-4 border-[#e2e4e6] bg-[#f9f9f9] px-8 py-10 text-lg font-bold">
            {data
              ? (data?.getAttendanceStaffToday?.checkOut
                  ? moment(data?.getAttendanceStaffToday.checkOut)
                  : moment(new Date())
                ).diff(
                  moment(data?.getAttendanceStaffToday?.checkIn),
                  "hours"
                ) || 0
              : 0}{" "}
            hrs
          </div>
          {!allow && (
            <div className="text-red-800">
              Your current location are out of range cannot allow to check in or
              check out!
            </div>
          )}
          {!!allow && !data?.getAttendanceStaffToday?.checkIn && (
            <div
              className="cursor-pointer rounded-xl bg-emerald-500 p-3 text-lg font-bold text-white"
              onClick={handleCheckIn}
            >
              Check In
            </div>
          )}
          {!!allow &&
            data &&
            !!data.getAttendanceStaffToday?.checkIn &&
            !data.getAttendanceStaffToday.checkOut && (
              <div
                className="cursor-pointer rounded-xl bg-orange-500 p-3 text-lg font-bold text-white"
                onClick={handleCheckOut}
              >
                Check Out
              </div>
            )}
        </div>
      </Box>
      <Box padding={"300"}>
        <div className="flex flex-row justify-between gap-4">
          <div className="border-2 border-gray-300 bg-gray-200 p-2">
            Work Start: {start} hrs
          </div>
          <div className="border-2 border-gray-300 bg-gray-200 p-2">
            Work End: {end} hrs
          </div>
          <div className="border-2 border-gray-300 bg-gray-200 p-2">
            Break: {break_time} hrs
          </div>
        </div>
      </Box>
    </Card>
  );
}
