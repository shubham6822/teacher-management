"use client";

import { useState } from "react";
import type { Performance } from "@/types/common";
import { mockPerformance } from "@/lib/mock-data-extended";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function PerformancePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [performance, setPerformance] =
    useState<Performance[]>(mockPerformance);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Performance Dashboard
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Analytics Hub
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Monitor and analyze teacher performance metrics and insights
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-lg border border-indigo-100">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Real-time Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Dashboard */}
      <PerformanceDashboard performance={performance} />
    </div>
  );
}
