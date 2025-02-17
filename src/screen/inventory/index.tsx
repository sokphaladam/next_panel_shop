"use client";
import { InventoryItem, InventoryProduct } from "./inventory-item";
import { useRef, useState } from "react";
import { InventoryTransaction } from "./inventory-transaction";
import { InventoryLog } from "./inventory-log";

export function InventoryScreen() {
  const refMain = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<InventoryProduct[]>([]);

  return (
    <div className="h-full w-full" ref={refMain}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-md p-4 shadow-md">
          <h4 className="mb-3 text-lg">Inventory</h4>
          <div className="no-scrollbar h-[500px] scroll-m-0 overflow-auto scroll-smooth bg-secondary hover:scroll-auto">
            <InventoryItem items={items} setItems={setItems} />
          </div>
        </div>
        <div className="rounded-md bg-secondary shadow-md">
          <InventoryTransaction items={items} setItems={setItems} />
        </div>
        <div className="col-span-3 rounded-md bg-secondary p-4 shadow-md">
          <h4 className="mb-3 text-lg">Transaction Log</h4>
          <InventoryLog />
        </div>
      </div>
    </div>
  );
}
