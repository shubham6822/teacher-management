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
        className="group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] border-0 shadow-md hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20">
                  <AvatarImage
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-lg transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20">
                    {getInitials(teacher.firstName, teacher.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white transition-all duration-300 ${
                    teacher.status === "active" ? "bg-green-500" : "bg-gray-400"
                  } ${isHovered ? "scale-110" : ""}`}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-primary font-medium transition-all duration-200 group-hover:text-primary/80">
                  {teacher.subject}
                </p>
                <p className="text-sm text-gray-500">
                  {teacher.department} Department
                </p>
              </div>
            </div>
            <Badge
              variant={teacher.status === "active" ? "default" : "secondary"}
              className={`transition-all duration-200 ${
                teacher.status === "active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : ""
              } ${isHovered ? "scale-105" : ""}`}
            >
              {teacher.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <Phone className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <GraduationCap className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{teacher.qualification}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <Calendar className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{teacher.experience} years exp.</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <MapPin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="truncate">
                {teacher.address.city}, {teacher.address.state}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
              <DollarSign className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">
                {formatSalary(teacher.salary)}
              </span>
            </div>
          </div>

          <div className="flex space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex-1 transition-all duration-200 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md bg-transparent"
            >
              <Edit className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteClick}
              className="flex-1 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-md bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
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
