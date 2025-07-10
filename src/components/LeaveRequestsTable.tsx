"use client"

import type { LeaveRequest } from "@/types/common"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Eye, Calendar } from "lucide-react"

interface LeaveRequestsTableProps {
  requests: LeaveRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onView: (request: LeaveRequest) => void
}

export function LeaveRequestsTable({ requests, onApprove, onReject, onView }: LeaveRequestsTableProps) {
  const getStatusColor = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: LeaveRequest["type"]) => {
    switch (type) {
      case "sick":
        return "bg-red-50 text-red-700 border-red-200"
      case "vacation":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "personal":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "emergency":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Leave Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={request.teacherName} />
                    <AvatarFallback>
                      {request.teacherName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{request.teacherName}</h3>
                      <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-4">
                        <span>
                          <strong>Duration:</strong> {formatDate(request.startDate)} - {formatDate(request.endDate)}(
                          {calculateDays(request.startDate, request.endDate)} days)
                        </span>
                      </div>
                      <div>
                        <strong>Reason:</strong> {request.reason}
                      </div>
                      <div>
                        <strong>Applied:</strong> {formatDate(request.appliedDate)}
                      </div>
                      {request.status === "approved" && request.approvedBy && (
                        <div>
                          <strong>Approved by:</strong> {request.approvedBy} on {formatDate(request.approvedDate!)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(request)}
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {request.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onApprove(request.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReject(request.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
