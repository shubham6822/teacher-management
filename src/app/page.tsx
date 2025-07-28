import { DashboardStats } from "@/components/DashboardStats";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { Plus, Users, Calendar, FileText, TrendingUp, ArrowRight, Bell, Search, Sparkles } from "lucide-react";
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
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Live
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  Welcome back! Here&apos;s what&apos;s happening at your school today.
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="outline" className="group hover:border-gray-300">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button size="lg" variant="outline" className="group hover:border-gray-300">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Recent Activities
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group ${
                        index === 0 ? "bg-blue-50/50 border border-blue-100" : ""
                      }`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                        activity.type === "leave_request"
                          ? "bg-orange-100 text-orange-600"
                          : activity.type === "attendance"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "performance"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        <activity.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-purple-100">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="group relative overflow-hidden p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 transition-all duration-300 cursor-pointer hover:shadow-lg"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-purple-400 rounded-full" />
                          {event.date}
                        </p>
                        <div className="mt-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all group-hover:scale-105 ${
                              event.type === "meeting"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : event.type === "conference"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-purple-100 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-indigo-100">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-24 flex-col gap-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 transition-all duration-300 group"
              >
                <Users className="h-7 w-7 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Add Teacher</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col gap-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-green-300 hover:bg-green-50 hover:scale-105 transition-all duration-300 group"
              >
                <Calendar className="h-7 w-7 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Schedule Class</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col gap-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:scale-105 transition-all duration-300 group"
              >
                <FileText className="h-7 w-7 text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Generate Report</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col gap-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:scale-105 transition-all duration-300 group"
              >
                <TrendingUp className="h-7 w-7 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
