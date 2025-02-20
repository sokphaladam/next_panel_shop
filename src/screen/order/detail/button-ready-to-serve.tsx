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
import { useState } from "react";

interface ButtonReadyToServeProps {
  id: number;
}

export function ButtonReadyToServe(props: ButtonReadyToServeProps) {
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
          >
            <HandPlatter className="h-3 w-3 text-secondary-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ready to serve</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
