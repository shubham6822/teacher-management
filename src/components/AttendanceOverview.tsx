"use client"

import type { Attendance } from "@/types/common"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClipboardCheck, Clock, Calendar, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface AttendanceOverviewProps {
  attendance: Attendance[]
  selectedDate: string
  onDateChange: (date: string) => void
}

export function AttendanceOverview({ attendance, selectedDate, onDateChange }: AttendanceOverviewProps) {
  const getStatusColor = (status: Attendance["status"]) => {
    switch (status) {
      case "present":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-sm"
      case "absent":
        return "bg-gradient-to-r from-red-400 to-pink-500 text-white border-0 shadow-sm"
      case "late":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm"
      case "half-day":
        return "bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 shadow-sm"
      default:
        return "bg-gray-100 text-gray-800 border-0"
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
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stats.present}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Present</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">-5%</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{stats.absent}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Absent</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">-2%</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.late}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Late</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">0%</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.halfDay}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Half Day</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Avg</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{attendanceRate}%</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              Daily Attendance Record
            </CardTitle>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <Calendar className="h-4 w-4 text-purple-600" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="border-0 outline-none text-sm font-medium text-gray-700 bg-transparent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {attendance.map((record, index) => (
              <div
                key={record.id}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:border-purple-200 hover:shadow-lg hover:scale-[1.02] animate-in slide-in-from-left-5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <Avatar className="relative border-2 border-purple-100 group-hover:border-purple-300 transition-all duration-300">
                      <AvatarImage src="/placeholder.svg" alt={record.teacherName} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium">
                        {record.teacherName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{record.teacherName}</div>
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
                    <div className="bg-gray-50 px-3 py-2 rounded-lg group-hover:bg-purple-50 transition-colors duration-300">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">In:</span> {formatTime(record.checkInTime)}
                      </div>
                      {record.checkOutTime && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Clock className="h-4 w-4 text-pink-600" />
                          <span className="font-medium">Out:</span> {formatTime(record.checkOutTime)}
                        </div>
                      )}
                    </div>
                  )}
                  <Badge className={`${getStatusColor(record.status)} px-3 py-1.5 font-medium group-hover:scale-105 transition-transform duration-300`}>
                    <span className="mr-1.5 text-lg">{getStatusIcon(record.status)}</span>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                  {record.totalHours && (
                    <div className="flex items-center gap-1 bg-indigo-50 px-3 py-2 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-indigo-700">{record.totalHours}h</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
