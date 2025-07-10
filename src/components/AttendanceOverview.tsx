"use client"

import type { Attendance } from "@/types/common"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClipboardCheck, Clock, Calendar } from "lucide-react"

interface AttendanceOverviewProps {
  attendance: Attendance[]
  selectedDate: string
  onDateChange: (date: string) => void
}

export function AttendanceOverview({ attendance, selectedDate, onDateChange }: AttendanceOverviewProps) {
  const getStatusColor = (status: Attendance["status"]) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "half-day":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Attendance["status"]) => {
    switch (status) {
      case "present":
        return "✓"
      case "absent":
        return "✗"
      case "late":
        return "⏰"
      case "half-day":
        return "½"
      default:
        return "?"
    }
  }

  const formatTime = (time?: string) => {
    if (!time) return "N/A"
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const stats = {
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
    halfDay: attendance.filter((a) => a.status === "half-day").length,
    total: attendance.length,
  }

  const attendanceRate =
    stats.total > 0 ? (((stats.present + stats.late + stats.halfDay) / stats.total) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-gray-600">Present</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-gray-600">Absent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <div className="text-sm text-gray-600">Late</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.halfDay}</div>
            <div className="text-sm text-gray-600">Half Day</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{attendanceRate}%</div>
            <div className="text-sm text-gray-600">Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Daily Attendance
            </CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendance.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:scale-[1.01]"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={record.teacherName} />
                    <AvatarFallback>
                      {record.teacherName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{record.teacherName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {record.checkInTime && (
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        In: {formatTime(record.checkInTime)}
                      </div>
                      {record.checkOutTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Out: {formatTime(record.checkOutTime)}
                        </div>
                      )}
                    </div>
                  )}
                  <Badge className={getStatusColor(record.status)}>
                    <span className="mr-1">{getStatusIcon(record.status)}</span>
                    {record.status}
                  </Badge>
                  {record.totalHours && <div className="text-sm font-medium text-gray-700">{record.totalHours}h</div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
