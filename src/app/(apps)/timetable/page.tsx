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
import { Plus, X, Calendar, Clock, Sparkles } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Timetable Management
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Schedule Hub
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Manage class schedules, teacher assignments, and time slots
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </div>
          </div>
        </div>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  {editingSlot ? "Edit Time Slot" : "Add Time Slot"}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={closeForm} className="hover:bg-red-50 hover:text-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="teacher" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Teacher
                  </Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, teacherId: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id} className="hover:bg-purple-50">
                          {teacher.firstName} {teacher.lastName} - {teacher.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                    placeholder="Enter subject name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Class
                  </Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, class: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls} className="hover:bg-green-50">
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Day
                  </Label>
                  <Select
                    value={formData.day}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, day: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day} className="hover:bg-orange-50">
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      Start Time
                    </Label>
                    <Select
                      value={formData.startTime}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          startTime: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="hover:bg-pink-50">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      End Time
                    </Label>
                    <Select
                      value={formData.endTime}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, endTime: value }))
                      }
                    >
                      <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-300">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="hover:bg-indigo-50">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    Room
                  </Label>
                  <Select
                    value={formData.room}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, room: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-300">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room} className="hover:bg-emerald-50">
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeForm}
                    className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
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
