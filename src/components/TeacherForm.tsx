"use client";

import type React from "react";

import { useState } from "react";
import type { Teacher, TeacherFormData } from "@/types/teacher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface TeacherFormProps {
  teacher?: Teacher;
  onSubmit: (data: TeacherFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TeacherForm({
  teacher,
  onSubmit,
  onCancel,
  isLoading = false,
}: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherFormData>({
    firstName: teacher?.firstName || "",
    lastName: teacher?.lastName || "",
    email: teacher?.email || "",
    phone: teacher?.phone || "",
    subject: teacher?.subject || "",
    department: teacher?.department || "",
    experience: teacher?.experience || 0,
    qualification: teacher?.qualification || "",
    joinDate: teacher?.joinDate || "",
    status: teacher?.status || "active",
    salary: teacher?.salary || 0,
    address: {
      street: teacher?.address.street || "",
      city: teacher?.address.city || "",
      state: teacher?.address.state || "",
      zipCode: teacher?.address.zipCode || "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (formData.experience < 0)
      newErrors.experience = "Experience must be positive";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    if (formData.salary <= 0)
      newErrors.salary = "Salary must be greater than 0";
    if (!formData.address.street.trim())
      newErrors.street = "Street is required";
    if (!formData.address.city.trim()) newErrors.city = "City is required";
    if (!formData.address.state.trim()) newErrors.state = "State is required";
    if (!formData.address.zipCode.trim())
      newErrors.zipCode = "Zip code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">
            {teacher ? "Edit Teacher" : "Add New Teacher"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange("department", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.department ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Social Studies">
                        Social Studies
                      </SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="experience">Experience (years) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.experience ? "border-red-500" : ""}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification *</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) =>
                      handleInputChange("qualification", e.target.value)
                    }
                    className={errors.qualification ? "border-red-500" : ""}
                  />
                  {errors.qualification && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.qualification}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date *</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) =>
                      handleInputChange("joinDate", e.target.value)
                    }
                    className={errors.joinDate ? "border-red-500" : ""}
                  />
                  {errors.joinDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.joinDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary *</Label>
                  <Input
                    id="salary"
                    type="number"
                    min="0"
                    value={formData.salary}
                    onChange={(e) =>
                      handleInputChange(
                        "salary",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.salary ? "border-red-500" : ""}
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                    className={errors.street ? "border-red-500" : ""}
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    className={errors.zipCode ? "border-red-500" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : teacher
                  ? "Update Teacher"
                  : "Add Teacher"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
