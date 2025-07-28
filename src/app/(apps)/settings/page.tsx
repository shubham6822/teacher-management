"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Database, Mail, Settings2, Sparkles, Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      leaveRequests: true,
      attendance: true,
      performance: false,
    },
    profile: {
      name: "Admin User",
      email: "admin@school.edu",
      phone: "+1 (555) 123-4567",
      role: "Administrator",
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
    },
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  };

  const handleSystemChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 via-slate-600/10 to-stone-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Settings
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-gray-500 to-slate-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Settings2 className="h-3 w-3" />
                  Control Panel
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Manage your account settings and system preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                  <User className="h-5 w-5" />
                </div>
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <Avatar className="relative h-24 w-24 border-4 border-gray-100 group-hover:border-purple-200 transition-all duration-300">
                    <AvatarImage src="/placeholder.svg" alt="Admin" />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">AD</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, GIF or PNG. Maximum 1MB file size.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={settings.profile.role}
                    disabled
                    className="bg-gray-50/80 backdrop-blur-sm border-gray-200 text-gray-600"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white">
                  <Bell className="h-5 w-5" />
                </div>
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("email", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("push", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="leave-notifications">
                      Leave Request Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified about new leave requests
                    </p>
                  </div>
                  <Switch
                    id="leave-notifications"
                    checked={settings.notifications.leaveRequests}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("leaveRequests", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attendance-notifications">
                      Attendance Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified about attendance issues
                    </p>
                  </div>
                  <Switch
                    id="attendance-notifications"
                    checked={settings.notifications.attendance}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("attendance", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="performance-notifications">
                      Performance Reports
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified about performance updates
                    </p>
                  </div>
                  <Switch
                    id="performance-notifications"
                    checked={settings.notifications.performance}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("performance", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Settings */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                  <Shield className="h-5 w-5" />
                </div>
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                Change Password
              </Button>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                Login History
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100/50">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                  <Database className="h-5 w-5" />
                </div>
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <p className="text-sm text-gray-500">
                    Automatically backup data daily
                  </p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={settings.system.autoBackup}
                  onCheckedChange={(checked) =>
                    handleSystemChange("autoBackup", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">
                    Enable system maintenance mode
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={settings.system.maintenanceMode}
                  onCheckedChange={(checked) =>
                    handleSystemChange("maintenanceMode", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-gray-500">Enable debug logging</p>
                </div>
                <Switch
                  id="debug-mode"
                  checked={settings.system.debugMode}
                  onCheckedChange={(checked) =>
                    handleSystemChange("debugMode", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-purple-100">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                  <Mail className="h-5 w-5" />
                </div>
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                Documentation
              </Button>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                Report Bug
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
