"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Teacher } from "@/types/teacher";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
} from "lucide-react";

interface TeacherCardProps {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

export function TeacherCard({ teacher, onEdit, onDelete }: TeacherCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/teachers/${teacher.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(teacher);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(teacher.id);
  };

  return (
    <>
      <Card
        className="group cursor-pointer bg-white/80 backdrop-blur-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
        <CardHeader className="pb-4 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500" />
                <Avatar className="h-16 w-16 ring-2 ring-purple-100 transition-all duration-500 group-hover:ring-purple-300 group-hover:scale-110">
                  <AvatarImage
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-semibold text-lg">
                    {getInitials(teacher.firstName, teacher.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                    teacher.status === "active" 
                      ? "bg-gradient-to-r from-green-400 to-green-500 animate-pulse" 
                      : "bg-gray-400"
                  } ${isHovered ? "scale-125" : ""}`}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-600">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-purple-600 font-medium transition-all duration-300 group-hover:text-purple-700">
                  {teacher.subject}
                </p>
                <p className="text-sm text-gray-500 transition-all duration-300 group-hover:text-gray-600">
                  {teacher.department} Department
                </p>
              </div>
            </div>
            <Badge
              variant={teacher.status === "active" ? "default" : "secondary"}
              className={`transition-all duration-300 border-0 shadow-sm ${
                teacher.status === "active"
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600"
                  : "bg-gray-100 text-gray-600"
              } ${isHovered ? "scale-110 shadow-lg" : ""}`}
            >
              {teacher.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-purple-100 rounded-lg transition-all duration-300 group-hover:bg-purple-200 group-hover:scale-110">
                <Mail className="h-4 w-4 text-purple-600" />
              </div>
              <span className="truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-blue-100 rounded-lg transition-all duration-300 group-hover:bg-blue-200 group-hover:scale-110">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-orange-100 rounded-lg transition-all duration-300 group-hover:bg-orange-200 group-hover:scale-110">
                <GraduationCap className="h-4 w-4 text-orange-600" />
              </div>
              <span>{teacher.qualification}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-green-100 rounded-lg transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <span>{teacher.experience} years exp.</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-pink-100 rounded-lg transition-all duration-300 group-hover:bg-pink-200 group-hover:scale-110">
                <MapPin className="h-4 w-4 text-pink-600" />
              </div>
              <span className="truncate">
                {teacher.address.city}, {teacher.address.state}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 group-hover:text-gray-800">
              <div className="p-1.5 bg-indigo-100 rounded-lg transition-all duration-300 group-hover:bg-indigo-200 group-hover:scale-110">
                <DollarSign className="h-4 w-4 text-indigo-600" />
              </div>
              <span className="font-semibold text-gray-900">
                {formatSalary(teacher.salary)}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex-1 border-purple-200 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteClick}
              className="flex-1 border-red-200 text-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

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
