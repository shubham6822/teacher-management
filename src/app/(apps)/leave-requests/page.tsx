"use client";

import { useState } from "react";
import type { LeaveRequest } from "@/types/common";
import { mockLeaveRequests } from "@/lib/mock-data-extended";
import { LeaveRequestsTable } from "@/components/LeaveRequestsTable";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, XCircle, ClipboardList } from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-pink-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Leave Requests
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <ClipboardList className="h-3 w-3" />
                  Management Hub
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Manage teacher leave requests and approvals efficiently
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">All</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{stats.total}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Total Requests</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full animate-pulse">Wait</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.pending}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">✓</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stats.approved}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Approved</div>
          </CardContent>
        </Card>
        <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">✗</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{stats.rejected}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Rejected</div>
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
