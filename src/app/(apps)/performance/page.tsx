"use client";

import { useState } from "react";
import type { Performance } from "@/types/common";
import { mockPerformance } from "@/lib/mock-data-extended";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";

export default function PerformancePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [performance, setPerformance] =
    useState<Performance[]>(mockPerformance);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Performance Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor and analyze teacher performance metrics
        </p>
      </div>

      {/* Performance Dashboard */}
      <PerformanceDashboard performance={performance} />
    </div>
  );
}
