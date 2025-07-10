"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Teacher, TeacherFormData } from "@/types/teacher";
import { mockTeachers } from "@/lib/mock-data";
import { TeacherDetailView } from "@/components/TeacherDetailPage";
import { TeacherForm } from "@/components/TeacherForm";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherId = params.id as string;
    const foundTeacher = mockTeachers.find((t) => t.id === teacherId);

    if (foundTeacher) {
      setTeacher(foundTeacher);
    } else {
      router.push("/teachers");
    }
    setLoading(false);
  }, [params.id, router]);

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleEditSubmit = (data: TeacherFormData) => {
    if (!teacher) return;

    // In a real app, this would update the database
    const updatedTeacher: Teacher = {
      ...teacher,
      ...data,
    };
    setTeacher(updatedTeacher);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    // In a real app, this would delete from database
    router.push("/teachers");
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Teacher not found</h2>
        <p className="text-gray-600 mt-2">
          The teacher you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <TeacherDetailView
        teacher={teacher}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showEditForm && (
        <TeacherForm
          teacher={teacher}
          onSubmit={handleEditSubmit}
          onCancel={closeEditForm}
        />
      )}
    </>
  );
}
