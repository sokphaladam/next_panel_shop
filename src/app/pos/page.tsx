"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { config_app } from "@/lib/config_app";
import { cn } from "@/lib/utils";
import { useUser } from "@/service/UserProvider";
import { Clock, ShoppingCart, Sofa, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

export default function PosPage() {
  const user = useUser();

  const disableOrder =
    !user?.isHaveShift && ![1, 2].includes(user?.role?.id || 0);

  return (
    <div className="-mx-5">
      <div className="flex w-full flex-1 flex-row justify-between border bg-white p-2">
        <div className="flex items-center gap-4 rounded-md">
          <div className="flex items-center justify-center p-1">
            <Image
              src={config_app.public.assets.logo}
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">POS Restaurant</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant={"ghost"} size={"icon"}>
            <Sofa className="h-4 w-4" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <SquareArrowOutUpRight className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" />
          <Button variant={"ghost"} size={"icon"} className="relative">
            <Clock className="h-4 w-4" />
            <div
              className={cn(
                "absolute right-0 top-0 h-2 w-2 rounded-full",
                disableOrder ? "bg-red-700" : "bg-green-700"
              )}
            ></div>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-wrap md:flex-nowrap">
        <div className="flex-1 p-4"></div>
        <div className="sticky right-0 top-0 h-[calc(100vh-3rem)] w-[400px] flex-none border-l bg-white p-4"></div>
      </div>
    </div>
  );
}
