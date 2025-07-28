"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 group cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend && (
          <div className="flex items-center gap-2 mt-3">
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                trend.isPositive 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}
            >
              <svg
                className={`w-3 h-3 ${
                  trend.isPositive ? "rotate-0" : "rotate-180"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Teachers",
      value: 24,
      description: "Active teaching staff",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Classes Today",
      value: 32,
      description: "Scheduled classes",
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Pending Leaves",
      value: 5,
      description: "Awaiting approval",
      icon: <FileText className="h-5 w-5 text-orange-600" />,
      trend: { value: 12, isPositive: false },
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "This month",
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Avg Performance",
      value: "4.6/5",
      description: "Teacher ratings",
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Late Arrivals",
      value: 8,
      description: "This week",
      icon: <Clock className="h-5 w-5 text-red-600" />,
      trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
