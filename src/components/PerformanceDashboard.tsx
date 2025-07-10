"use client";

import type { Performance } from "@/types/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Star, BookOpen, Calendar } from "lucide-react";

interface PerformanceDashboardProps {
  performance: Performance[];
}

export function PerformanceDashboard({
  performance,
}: PerformanceDashboardProps) {
  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <div className="text-sm text-gray-600">Avg Performance</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {(
                performance.reduce((sum, p) => sum + p.feedbackScore, 0) /
                performance.length
              ).toFixed(1)}
              /5
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {performance.reduce((sum, p) => sum + p.studentsCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div className="text-sm text-gray-600">Avg Grade</div>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {(
                performance.reduce((sum, p) => sum + p.averageGrade, 0) /
                performance.length
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {(
                performance.reduce(
                  (sum, p) => sum + (p.completedLessons / p.totalLessons) * 100,
                  0
                ) / performance.length
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Teacher Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performance.map((perf) => (
              <div key={perf.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={perf.teacherName}
                      />
                      <AvatarFallback>
                        {perf.teacherName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {perf.teacherName}
                      </h3>
                      <p className="text-sm text-gray-600">{perf.subject}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {perf.month} {perf.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${getPerformanceColor(
                        perf.feedbackScore
                      )}`}
                    >
                      {perf.feedbackScore}/5
                    </div>
                    <div className="text-sm text-gray-500">Overall Rating</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{perf.studentsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Grade</span>
                      <span
                        className={`font-medium ${getGradeColor(
                          perf.averageGrade
                        )}`}
                      >
                        {perf.averageGrade}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attendance</span>
                      <span className="font-medium">
                        {perf.attendanceRate}%
                      </span>
                    </div>
                    <Progress value={perf.attendanceRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lessons</span>
                      <span className="font-medium">
                        {perf.completedLessons}/{perf.totalLessons}
                      </span>
                    </div>
                    <Progress
                      value={(perf.completedLessons / perf.totalLessons) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Feedback</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {perf.feedbackScore}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={(perf.feedbackScore / 5) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
