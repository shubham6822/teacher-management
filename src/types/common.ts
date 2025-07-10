export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "teacher" | "student"
  avatar?: string
}

export interface Timetable {
  id: string
  teacherId: string
  subject: string
  class: string
  day: string
  startTime: string
  endTime: string
  room: string
}

export interface LeaveRequest {
  id: string
  teacherId: string
  teacherName: string
  type: "sick" | "personal" | "vacation" | "emergency"
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
  approvedBy?: string
  approvedDate?: string
}

export interface Attendance {
  id: string
  teacherId: string
  teacherName: string
  date: string
  status: "present" | "absent" | "late" | "half-day"
  checkInTime?: string
  checkOutTime?: string
  totalHours?: number
}

export interface Performance {
  id: string
  teacherId: string
  teacherName: string
  subject: string
  month: string
  year: number
  studentsCount: number
  averageGrade: number
  attendanceRate: number
  feedbackScore: number
  completedLessons: number
  totalLessons: number
}
