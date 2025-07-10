import { DashboardStats } from "@/components/DashboardStats";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { Plus, Users, Calendar, FileText, TrendingUp } from "lucide-react";
import React from "react";

export default function page() {
  const recentActivities = [
    {
      id: 1,
      type: "leave_request",
      message: "Sarah Johnson submitted a sick leave request",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "attendance",
      message: "Michael Chen marked late arrival",
      time: "3 hours ago",
      icon: Users,
    },
    {
      id: 3,
      type: "performance",
      message: "Monthly performance reports generated",
      time: "1 day ago",
      icon: TrendingUp,
    },
    {
      id: 4,
      type: "schedule",
      message: "Timetable updated for Grade 10A",
      time: "2 days ago",
      icon: Calendar,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Staff Meeting",
      date: "Today, 3:00 PM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "Tomorrow, 9:00 AM",
      type: "conference",
    },
    {
      id: 3,
      title: "Monthly Performance Review",
      date: "Jan 15, 2024",
      type: "review",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&apos;s what&apos;s happening at your school.
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0">
                        <activity.icon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            event.type === "meeting"
                              ? "bg-blue-100 text-blue-800"
                              : event.type === "conference"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <Users className="h-6 w-6 mb-2" />
                Add Teacher
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Class
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <FileText className="h-6 w-6 mb-2" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
