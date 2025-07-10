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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Attendance Management
        </h1>
        <p className="text-gray-600 mt-1">
          Track and manage teacher attendance records
        </p>
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
