"use client";
import { Button } from "@/components/ui/button";
import { useTableSetListQuery } from "@/gql/graphql";
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable_" + props.set,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="m-2 w-16 p-5"
      variant={"default"}
    >
      {props.set}
    </Button>
  );
}

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    borderColor: isOver ? `rgb(21 128 61 / var(--tw-border-opacity, 1))` : "",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-1 h-[100px] w-full rounded-md border p-2"
    >
      {props.children}
    </div>
  );
}

export function MergeTableScreen() {
  const [parent, setParent] = useState<any[]>([]);
  const { data, loading } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });

  if (loading) {
    return <div></div>;
  }

  function handleDragEnd(event: any) {
    const { over, active } = event;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    const dummy = structuredClone(parent);
    if (over && active) {
      const find = data?.tableSetList?.find(
        (f) => String(f?.set) === String(active.id.split("_")[1])
      );
      dummy.push(find);
    } else {
      dummy.filter((f) => String(f.id) === String(active.id.split("_")[1]));
    }
    setParent(dummy);
  }

  return (
    <div className="h-full w-full p-4">
      <h3 className="bold text-lg">Merge Table</h3>
      <DndContext onDragEnd={handleDragEnd}>
        <div>
          <Droppable>
            {parent.length > 0
              ? parent.map((item, idx) => {
                  return <Draggable {...item} key={idx} />;
                })
              : "Drop table to merge here"}
          </Droppable>
          <div className="max-h-[300px] overflow-auto">
            {data?.tableSetList?.map((item, idx) => {
              return <Draggable {...item} key={idx} />;
            })}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
