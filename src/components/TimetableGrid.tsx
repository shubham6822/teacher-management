"use client";

import type React from "react";

import { useState } from "react";
import type { Timetable } from "@/types/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { days, timeSlots } from "@/lib/mock-data-extended";

interface TimetableGridProps {
  timetable: Timetable[];
  onAddSlot: (day: string, time: string) => void;
  onEditSlot: (slot: Timetable) => void;
  onDeleteSlot: (id: string) => void;
}

export function TimetableGrid({
  timetable,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
}: TimetableGridProps) {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [deleteSlot, setDeleteSlot] = useState<Timetable | null>(null);

  const getSlotForDayAndTime = (day: string, time: string) => {
    return timetable.find(
      (slot) => slot.day === day && slot.startTime === time
    );
  };

  const getColorForSubject = (subject: string) => {
    const colors = {
      Mathematics:
        "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      Physics:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      Chemistry:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      English:
        "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
      History: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      "Physical Education":
        "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
    };
    return (
      colors[subject as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    );
  };

  const handleDeleteClick = (slot: Timetable, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteSlot(slot);
  };

  const handleDeleteConfirm = () => {
    if (deleteSlot) {
      onDeleteSlot(deleteSlot.id);
      setDeleteSlot(null);
    }
  };

  return (
    <>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Weekly Timetable</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={selectedWeek === "current" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWeek("current")}
                className="transition-all duration-200 hover:scale-105"
              >
                Current Week
              </Button>
              <Button
                variant={selectedWeek === "next" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWeek("next")}
                className="transition-all duration-200 hover:scale-105"
              >
                Next Week
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                <div className="font-medium text-sm text-gray-500 p-2">
                  Time
                </div>
                {days.map((day) => (
                  <div
                    key={day}
                    className="font-medium text-sm text-gray-900 p-2 text-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="space-y-2">
                {timeSlots.slice(0, 10).map((time) => (
                  <div key={time} className="grid grid-cols-6 gap-2">
                    <div className="text-sm text-gray-500 p-2 font-medium">
                      {time}
                    </div>
                    {days.map((day) => {
                      const slot = getSlotForDayAndTime(day, time);
                      return (
                        <div key={`${day}-${time}`} className="min-h-[60px]">
                          {slot ? (
                            <div
                              className={`p-2 rounded-lg border-2 h-full transition-all duration-200 hover:scale-105 hover:shadow-md ${getColorForSubject(
                                slot.subject
                              )}`}
                            >
                              <div className="text-xs font-medium truncate">
                                {slot.subject}
                              </div>
                              <div className="text-xs truncate">
                                {slot.class}
                              </div>
                              <div className="text-xs truncate">
                                {slot.room}
                              </div>
                              <div className="flex gap-1 mt-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 hover:bg-white/50 transition-all duration-200 hover:scale-110"
                                  onClick={() => onEditSlot(slot)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 hover:bg-white/50 transition-all duration-200 hover:scale-110"
                                  onClick={(e) => handleDeleteClick(slot, e)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              className="w-full h-full border-2 border-dashed border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105 hover:bg-gray-50"
                              onClick={() => onAddSlot(day, time)}
                            >
                              <Plus className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Subject Legend</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Mathematics",
                "Physics",
                "Chemistry",
                "English",
                "History",
                "Physical Education",
              ].map((subject) => (
                <Badge
                  key={subject}
                  className={`transition-all duration-200 hover:scale-105 ${getColorForSubject(
                    subject
                  )}`}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        open={!!deleteSlot}
        onOpenChange={(open) => !open && setDeleteSlot(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Time Slot"
        description="Are you sure you want to delete this time slot for"
        itemName={
          deleteSlot ? `${deleteSlot.subject} - ${deleteSlot.class}` : ""
        }
      />
    </>
  );
}
