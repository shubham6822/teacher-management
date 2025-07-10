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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`text-xs mt-1 ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last month
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
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Classes Today",
      value: 32,
      description: "Scheduled classes",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Pending Leaves",
      value: 5,
      description: "Awaiting approval",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      trend: { value: -12, isPositive: false },
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "This month",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Avg Performance",
      value: "4.6/5",
      description: "Teacher ratings",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Late Arrivals",
      value: 8,
      description: "This week",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      trend: { value: -15, isPositive: true },
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
