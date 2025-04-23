"use client";

import { useCustomToast } from "@/components/custom/CustomToast";
import { PrintShift } from "@/components/PrintShift";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ShiftInput,
  useCreateShiftMutation,
  useShiftByIdQuery,
  useShiftListQuery,
  useUpdateShiftMutation,
} from "@/gql/graphql";
import { useUser } from "@/service/UserProvider";
import {
  FooterHelp,
  InlineGrid,
  // Modal,
  Text,
  TextField,
} from "@shopify/polaris";
import moment from "moment";
import { useCallback, useRef, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  type?: "OPEN" | "CLOSE";
  onShift?: any;
}

export function FormShift(props: Props) {
  const user = useUser();
  const today = moment(new Date());
  const { toasts, setToasts } = useCustomToast();
  const refBtn = useRef<HTMLDivElement>(null);
  const [dateInput, setDateInput] = useState(
    today.format("YYYY-MM-DD HH:mm:ss")
  );
  const [usdInput, setUsdInput] = useState("0");
  const [khrInput, setKhrInput] = useState("0");
  const { data, loading } = useShiftByIdQuery({
    skip: moment(new Date(dateInput)).format("YYYY-MM-DD") === "Invalid Date",
    variables: {
      date: moment(new Date(dateInput)).format("YYYY-MM-DD HH:mm:ss"),
      userId: user?.id || 0,
    },
    onCompleted: (res) => {
      if (res.shiftById) {
        setUsdInput(String(res.shiftById.openCurrency?.usd || "0"));
        setKhrInput(String(res.shiftById.openCurrency?.khr || "0"));
        props.onShift(true);
      } else {
        setUsdInput("0");
        setKhrInput("0");
      }
    },
  });

  const [create, propCreate] = useCreateShiftMutation({
    refetchQueries: ["shiftById"],
  });
  const [update, propUpdate] = useUpdateShiftMutation({
    refetchQueries: ["shiftById"],
  });

  const toggleOpen = useCallback(() => props.setOpen(!props.open), [props]);

  const handleShiftClose = useCallback(() => {
    const input: ShiftInput = {
      open: data?.shiftById?.open,
      close: moment(new Date(dateInput)).format("YYYY-MM-DD HH:mm:ss"),
      openCurrency: {
        khr: Number(khrInput),
        usd: Number(usdInput),
      },
      userId: user?.id || 0,
    };

    if (data?.shiftById) {
      update({
        variables: {
          updateShiftId: data.shiftById.id || 0,
          data: input,
          expected: true,
        },
      })
        .then((res) => {
          if (res.data?.updateShift) {
            setToasts([
              ...toasts,
              { content: "Open shift", status: "success" },
            ]);
            setTimeout(() => {
              if (refBtn) {
                refBtn.current?.click();
              }
            }, 500);
          } else {
            setToasts([
              ...toasts,
              {
                content: "Oop! somthing wrong please try again.",
                status: "error",
              },
            ]);
          }
        })
        .catch((err) => {
          setToasts([
            ...toasts,
            {
              content: "Oop! somthing wrong please try again.",
              status: "error",
            },
          ]);
        });
    }
  }, [
    data,
    dateInput,
    khrInput,
    setToasts,
    toasts,
    update,
    usdInput,
    user?.id,
    refBtn,
  ]);

  const handleShiftOpen = useCallback(() => {
    const input: ShiftInput = {
      open: data?.shiftById
        ? data.shiftById.open
        : moment(new Date(dateInput)).format("YYYY-MM-DD HH:mm:ss"),
      openCurrency: {
        khr: Number(khrInput),
        usd: Number(usdInput),
      },
      userId: user?.id || 0,
    };

    create({
      variables: {
        data: input,
      },
    })
      .then((res) => {
        if (res.data?.createShift) {
          setToasts([...toasts, { content: "Open shift", status: "success" }]);
          props.setOpen(false);
          setTimeout(() => {
            process.browser && window.location.reload();
          }, 500);
        } else {
          setToasts([
            ...toasts,
            {
              content: "Oop! somthing wrong please try again.",
              status: "error",
            },
          ]);
        }
      })
      .catch((err) => {
        setToasts([
          ...toasts,
          { content: "Oop! somthing wrong please try again.", status: "error" },
        ]);
      });
  }, [
    create,
    data,
    dateInput,
    khrInput,
    props,
    setToasts,
    toasts,
    usdInput,
    user?.id,
  ]);

  if (propCreate.loading) {
    return <></>;
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={
        propCreate.loading || propUpdate.loading ? () => {} : () => toggleOpen()
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shift</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="my-3">
            <div className="my-1">
              {data?.shiftById ? "Close Date" : "Open Date"}
            </div>
            <div>
              <Input
                type="datetime-local"
                value={dateInput}
                autoComplete="off"
                onChange={(e) => setDateInput(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3">
            <div className="my-1">Deposited</div>
            <div className="flex w-full flex-wrap gap-4">
              <div className="w-[48%]">
                <Input
                  value={usdInput}
                  type="number"
                  prefix="USD"
                  onFocus={(e) => e.currentTarget.select()}
                  disabled={!!data?.shiftById}
                  onChange={(e) => setUsdInput(e.target.value)}
                  className="w-full"
                />
                <small>USD amount</small>
              </div>
              <div className="w-[48%]">
                <Input
                  value={khrInput}
                  type="number"
                  prefix="KHR"
                  onFocus={(e) => e.currentTarget.select()}
                  disabled={!!data?.shiftById}
                  onChange={(e) => setKhrInput(e.target.value)}
                  className="w-full"
                />
                <small>KHR amount</small>
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter className="items-center">
          {!!data?.shiftById?.close && (
            <>
              <Alert className="flex flex-row gap-2" variant={"destructive"}>
                <AlertDescription>
                  Current shift date select are already closed.
                  <PrintShift refBtn={refBtn} data={data.shiftById} />
                </AlertDescription>
              </Alert>
            </>
          )}
          <Button
            onClick={data?.shiftById ? handleShiftClose : handleShiftOpen}
            disabled={
              !!data?.shiftById?.close ||
              propCreate.loading ||
              propUpdate.loading
            }
          >
            {data?.shiftById ? "Close Shift" : "Open Shift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
