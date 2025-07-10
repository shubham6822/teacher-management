"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Teacher } from "@/types/teacher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  DollarSign,
  Building,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";

interface TeacherDetailViewProps {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

export function TeacherDetailView({
  teacher,
  onEdit,
  onDelete,
}: TeacherDetailViewProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEdit = () => {
    onEdit(teacher);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(teacher.id);
    router.push("/teachers");
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Teacher Details
              </h1>
              <p className="text-gray-600 mt-1">
                View and manage teacher information
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="transition-all duration-200 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md bg-transparent"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={handleDeleteClick}
              className="transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-md bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 ring-4 ring-primary/10 transition-all duration-300 hover:ring-primary/20">
                  <AvatarImage
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-3xl">
                    {getInitials(teacher.firstName, teacher.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {teacher.firstName} {teacher.lastName}
                  </h2>
                  <p className="text-primary font-medium text-lg">
                    {teacher.subject}
                  </p>
                  <p className="text-gray-500">
                    {teacher.department} Department
                  </p>
                  <Badge
                    variant={
                      teacher.status === "active" ? "default" : "secondary"
                    }
                    className={`mt-2 transition-all duration-200 ${
                      teacher.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : ""
                    }`}
                  >
                    {teacher.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{teacher.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{teacher.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {teacher.address.street}
                      <br />
                      {teacher.address.city}, {teacher.address.state}{" "}
                      {teacher.address.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <Building className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{teacher.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium">{teacher.qualification}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{teacher.experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="font-medium">
                        {formatDate(teacher.joinDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">
                        {formatSalary(teacher.salary)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-blue-50 transition-all duration-200 hover:bg-blue-100">
                    <div className="text-2xl font-bold text-blue-600">4.8</div>
                    <div className="text-sm text-blue-600">Rating</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 transition-all duration-200 hover:bg-green-100">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-green-600">Attendance</div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 transition-all duration-200 hover:bg-purple-100">
                    <div className="text-2xl font-bold text-purple-600">28</div>
                    <div className="text-sm text-purple-600">Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete Teacher"
        description="Are you sure you want to delete"
        itemName={`${teacher.firstName} ${teacher.lastName}`}
      />
    </>
  );
}
