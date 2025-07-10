"use client";

import { useState } from "react";
import type { LeaveRequest } from "@/types/common";
import { mockLeaveRequests } from "@/lib/mock-data-extended";
import { LeaveRequestsTable } from "@/components/LeaveRequestsTable";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved",
              approvedBy: "Admin",
              approvedDate: new Date().toISOString().split("T")[0],
            }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  const handleView = (request: LeaveRequest) => {
    // Handle view request details
    console.log("Viewing request:", request);
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
        <p className="text-gray-600 mt-1">
          Manage teacher leave requests and approvals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <LeaveRequestsTable
        requests={requests}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />
    </div>
  );
}
