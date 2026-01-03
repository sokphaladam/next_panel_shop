import { useCustomToast } from "@/components/custom/CustomToast";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusOrderItem, useMarkOrderItemStatusMutation } from "@/gql/graphql";
import { HandPlatter } from "lucide-react";
import { useRef, useState, forwardRef } from "react";

interface ButtonReadyToServeProps {
  id: number;
  as?: "button" | "text";
}

export const ButtonReadyToServe = forwardRef<
  HTMLButtonElement,
  ButtonReadyToServeProps
>((props, ref) => {
  const { toasts, setToasts } = useCustomToast();
  const [mark, { loading }] = useMarkOrderItemStatusMutation({
    refetchQueries: ["order"],
  });

  const handleClick = () => {
    mark({
      variables: {
        markOrderItemStatusId: Number(props.id),
        status: StatusOrderItem.Completed,
      },
    })
      .then((res) => {
        if (res.data?.markOrderItemStatus) {
          setToasts([
            ...toasts,
            { content: "Order item is ready to serve", status: "success" },
          ]);
        } else {
          setToasts([
            ...toasts,
            { content: "Failed to mark order item status", status: "error" },
          ]);
        }
      })
      .catch(() => {
        setToasts([
          ...toasts,
          { content: "Failed to mark order item status", status: "error" },
        ]);
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={loading}
            size={"sm"}
            className="bg-secondary hover:bg-secondary"
            onClick={handleClick}
            ref={ref}
            style={props.as === "text" ? { display: "none" } : {}}
          >
            <HandPlatter className="h-3 w-3 text-secondary-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ready to serve</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

ButtonReadyToServe.displayName = "ButtonReadyToServe";
