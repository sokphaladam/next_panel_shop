"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Building2,
  Hash,
  Edit2,
  Check,
  X,
  Settings,
} from "lucide-react";

interface Floor {
  id: string;
  name: string;
  rangeStart: number;
  rangeEnd: number;
  color?: string;
}

interface GridTableFormProps {
  onSubmit?: (floors: Floor[]) => void;
  initialFloors?: Floor[];
  trigger?: React.ReactNode;
}

const defaultColors = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
];

export default function GridTableForm({
  onSubmit,
  initialFloors,
  trigger,
}: GridTableFormProps) {
  const [open, setOpen] = useState(false);
  const [floors, setFloors] = useState<Floor[]>(
    initialFloors || [
      {
        id: "1",
        name: "Ground Floor",
        rangeStart: 1,
        rangeEnd: 100,
        color: defaultColors[0],
      },
      {
        id: "2",
        name: "1st Floor",
        rangeStart: 101,
        rangeEnd: 200,
        color: defaultColors[1],
      },
    ]
  );

  const [editingFloor, setEditingFloor] = useState<string | null>(null);
  const [tempFloorData, setTempFloorData] = useState<Partial<Floor>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFloor = (
    floor: Partial<Floor>,
    excludeId?: string
  ): string[] => {
    const issues: string[] = [];

    if (!floor.name?.trim()) {
      issues.push("Floor name is required");
    }

    if (!floor.rangeStart || floor.rangeStart < 1) {
      issues.push("Start range must be at least 1");
    }

    if (!floor.rangeEnd || floor.rangeEnd < 1) {
      issues.push("End range must be at least 1");
    }

    if (
      floor.rangeStart &&
      floor.rangeEnd &&
      floor.rangeStart > floor.rangeEnd
    ) {
      issues.push("Start range cannot be greater than end range");
    }

    // Check for overlapping ranges
    const otherFloors = floors.filter((f) => f.id !== excludeId);
    for (const otherFloor of otherFloors) {
      if (floor.rangeStart && floor.rangeEnd) {
        const hasOverlap =
          floor.rangeStart <= otherFloor.rangeEnd &&
          floor.rangeEnd >= otherFloor.rangeStart;

        if (hasOverlap) {
          issues.push(
            `Range overlaps with ${otherFloor.name} (${otherFloor.rangeStart}-${otherFloor.rangeEnd})`
          );
        }
      }
    }

    return issues;
  };

  const addFloor = () => {
    const lastFloor = floors[floors.length - 1];
    const newFloor: Floor = {
      id: Date.now().toString(),
      name: `Floor ${floors.length + 1}`,
      rangeStart: lastFloor ? lastFloor.rangeEnd + 1 : 1,
      rangeEnd: lastFloor ? lastFloor.rangeEnd + 100 : 100,
      color: defaultColors[floors.length % defaultColors.length],
    };

    setFloors([...floors, newFloor]);
    setEditingFloor(newFloor.id);
    setTempFloorData(newFloor);
  };

  const removeFloor = (floorId: string) => {
    setFloors(floors.filter((f) => f.id !== floorId));
    if (editingFloor === floorId) {
      setEditingFloor(null);
      setTempFloorData({});
    }
  };

  const startEditing = (floor: Floor) => {
    setEditingFloor(floor.id);
    setTempFloorData({ ...floor });
    setErrors({});
  };

  const saveEditing = () => {
    if (!editingFloor || !tempFloorData) return;

    const issues = validateFloor(tempFloorData, editingFloor);

    if (issues.length > 0) {
      setErrors({ [editingFloor]: issues.join(", ") });
      return;
    }

    setFloors(
      floors.map((f) =>
        f.id === editingFloor ? ({ ...f, ...tempFloorData } as Floor) : f
      )
    );

    setEditingFloor(null);
    setTempFloorData({});
    setErrors({});
  };

  const cancelEditing = () => {
    setEditingFloor(null);
    setTempFloorData({});
    setErrors({});
  };

  const getTotalTables = () => {
    return floors.reduce((total, floor) => {
      return total + (floor.rangeEnd - floor.rangeStart + 1);
    }, 0);
  };

  const handleSubmit = () => {
    // Validate all floors before submitting
    const allIssues: string[] = [];

    floors.forEach((floor, index) => {
      const issues = validateFloor(floor, floor.id);
      if (issues.length > 0) {
        allIssues.push(`Floor ${index + 1}: ${issues.join(", ")}`);
      }
    });

    if (allIssues.length > 0) {
      alert("Please fix the following issues:\n" + allIssues.join("\n"));
      return;
    }

    onSubmit?.(floors);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset to initial floors when canceling
    setFloors(
      initialFloors || [
        {
          id: "1",
          name: "Ground Floor",
          rangeStart: 1,
          rangeEnd: 100,
          color: defaultColors[0],
        },
        {
          id: "2",
          name: "1st Floor",
          rangeStart: 101,
          rangeEnd: 200,
          color: defaultColors[1],
        },
      ]
    );
    setEditingFloor(null);
    setTempFloorData({});
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configure Grid Tables
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Grid Table Configuration
          </DialogTitle>
          <DialogDescription>
            Configure your restaurant floor layout and table numbering ranges.
            Each floor can have a custom name and table number range.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Section */}
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Summary</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {getTotalTables()} Total Tables
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {floors.map((floor) => (
                <Badge
                  key={floor.id}
                  variant="outline"
                  style={{ borderColor: floor.color, color: floor.color }}
                >
                  {floor.name}: {floor.rangeStart}-{floor.rangeEnd}(
                  {floor.rangeEnd - floor.rangeStart + 1} tables)
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Floor Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Floor Configuration</h3>
              <Button
                onClick={addFloor}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Floor
              </Button>
            </div>

            <div className="grid max-h-60 gap-4 overflow-y-auto">
              {floors.map((floor, index) => (
                <Card key={floor.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Color Indicator */}
                      <div
                        className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: floor.color }}
                      />

                      {editingFloor === floor.id ? (
                        // Edit Mode
                        <>
                          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                              <label className="mb-1 block text-xs text-muted-foreground">
                                Floor Name
                              </label>
                              <Input
                                value={tempFloorData.name || ""}
                                onChange={(e) =>
                                  setTempFloorData({
                                    ...tempFloorData,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="e.g., Ground Floor"
                                className="h-8"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-xs text-muted-foreground">
                                Start Table #
                              </label>
                              <Input
                                type="number"
                                min="1"
                                value={tempFloorData.rangeStart || ""}
                                onChange={(e) =>
                                  setTempFloorData({
                                    ...tempFloorData,
                                    rangeStart: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="h-8"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-xs text-muted-foreground">
                                End Table #
                              </label>
                              <Input
                                type="number"
                                min="1"
                                value={tempFloorData.rangeEnd || ""}
                                onChange={(e) =>
                                  setTempFloorData({
                                    ...tempFloorData,
                                    rangeEnd: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="h-8"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={saveEditing}
                              size="sm"
                              variant="default"
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={cancelEditing}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        // View Mode
                        <>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="font-medium">{floor.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                Tables {floor.rangeStart}-{floor.rangeEnd}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {floor.rangeEnd - floor.rangeStart + 1} tables in
                              this floor
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => startEditing(floor)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            {floors.length > 1 && (
                              <Button
                                onClick={() => removeFloor(floor.id)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {errors[floor.id] && (
                      <div className="mt-2 rounded bg-destructive/10 p-2 text-sm text-destructive">
                        {errors[floor.id]}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Layout Preview</h3>
            <div className="max-h-60 overflow-y-auto rounded-lg bg-muted/30 p-4">
              <div className="grid gap-4">
                {floors.map((floor) => (
                  <div key={floor.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: floor.color }}
                      />
                      <h4 className="text-sm font-medium">{floor.name}</h4>
                    </div>
                    <div className="sm:grid-cols-15 md:grid-cols-20 grid grid-cols-10 gap-1">
                      {Array.from(
                        {
                          length: Math.min(
                            floor.rangeEnd - floor.rangeStart + 1,
                            60
                          ),
                        },
                        (_, i) => {
                          const tableNumber = floor.rangeStart + i;
                          return (
                            <div
                              key={tableNumber}
                              className="flex aspect-square items-center justify-center rounded border font-mono text-xs"
                              style={{
                                borderColor: floor.color + "40",
                                backgroundColor: floor.color + "10",
                                color: floor.color,
                              }}
                            >
                              {tableNumber}
                            </div>
                          );
                        }
                      )}
                      {floor.rangeEnd - floor.rangeStart + 1 > 60 && (
                        <div className="flex aspect-square items-center justify-center rounded border border-dashed text-xs text-muted-foreground">
                          +{floor.rangeEnd - floor.rangeStart + 1 - 60}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
