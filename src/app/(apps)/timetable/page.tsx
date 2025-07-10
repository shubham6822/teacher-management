"use client";

import type React from "react";

import { useState } from "react";
import type { Timetable } from "@/types/common";
import { mockTimetable } from "@/lib/mock-data-extended";
import { mockTeachers } from "@/lib/mock-data";
import { TimetableGrid } from "@/components/TimetableGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { days, classes, rooms, timeSlots } from "@/lib/mock-data-extended";

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<Timetable[]>(mockTimetable);
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Timetable | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDay, setSelectedDay] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    teacherId: "",
    subject: "",
    class: "",
    day: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  const handleAddSlot = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setFormData({
      teacherId: "",
      subject: "",
      class: "",
      day: day,
      startTime: time,
      endTime: "",
      room: "",
    });
    setShowForm(true);
  };

  const handleEditSlot = (slot: Timetable) => {
    setEditingSlot(slot);
    setFormData({
      teacherId: slot.teacherId,
      subject: slot.subject,
      class: slot.class,
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      room: slot.room,
    });
    setShowForm(true);
  };

  const handleDeleteSlot = (id: string) => {
    setTimetable((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSlot) {
      // Update existing slot
      setTimetable((prev) =>
        prev.map((slot) =>
          slot.id === editingSlot.id ? { ...slot, ...formData } : slot
        )
      );
    } else {
      // Add new slot
      const newSlot: Timetable = {
        id: Date.now().toString(),
        ...formData,
      };
      setTimetable((prev) => [...prev, newSlot]);
    }

    setShowForm(false);
    setEditingSlot(undefined);
    setFormData({
      teacherId: "",
      subject: "",
      class: "",
      day: "",
      startTime: "",
      endTime: "",
      room: "",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSlot(undefined);
    setFormData({
      teacherId: "",
      subject: "",
      class: "",
      day: "",
      startTime: "",
      endTime: "",
      room: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Timetable Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage class schedules and teacher assignments
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Time Slot
        </Button>
      </div>

      {/* Timetable Grid */}
      <TimetableGrid
        timetable={timetable}
        onAddSlot={handleAddSlot}
        onEditSlot={handleEditSlot}
        onDeleteSlot={handleDeleteSlot}
      />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingSlot ? "Edit Time Slot" : "Add Time Slot"}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, teacherId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName} -{" "}
                          {teacher.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, class: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="day">Day</Label>
                  <Select
                    value={formData.day}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, day: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select
                      value={formData.startTime}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          startTime: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Select
                      value={formData.endTime}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, endTime: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="room">Room</Label>
                  <Select
                    value={formData.room}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, room: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSlot ? "Update" : "Add"} Slot
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
