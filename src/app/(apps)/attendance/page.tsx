"use client";

import { useState } from "react";
import type { Attendance } from "@/types/common";
import { mockAttendance } from "@/lib/mock-data-extended";
import { AttendanceOverview } from "@/components/AttendanceOverview";

export default function AttendancePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // In a real app, you would fetch attendance data for the selected date
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Attendance Management
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Live Tracking
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Track and manage teacher attendance records in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <AttendanceOverview
        attendance={attendance}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
    </div>
  );
}
