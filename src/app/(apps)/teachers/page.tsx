"use client";

import { useState, useMemo } from "react";
import type { Teacher, TeacherFormData, FilterOptions } from "@/types/teacher";
import { mockTeachers } from "@/lib/mock-data";
import { TeacherCard } from "@/components/TeacherCard";
import { TeacherForm } from "@/components/TeacherForm";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    department: "All",
    subject: "All",
    status: "all",
    experience: "All",
  });

  // Filter and search logic
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        filters.department === "All" ||
        teacher.department === filters.department;
      const matchesSubject =
        filters.subject === "All" || teacher.subject === filters.subject;
      const matchesStatus =
        filters.status === "all" || teacher.status === filters.status;

      const matchesExperience = (() => {
        if (filters.experience === "All") return true;
        if (filters.experience === "0-2") return teacher.experience <= 2;
        if (filters.experience === "3-5")
          return teacher.experience >= 3 && teacher.experience <= 5;
        if (filters.experience === "6-10")
          return teacher.experience >= 6 && teacher.experience <= 10;
        if (filters.experience === "10+") return teacher.experience > 10;
        return true;
      })();

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSubject &&
        matchesStatus &&
        matchesExperience
      );
    });
  }, [teachers, searchQuery, filters]);

  const handleAddTeacher = (data: TeacherFormData) => {
    const newTeacher: Teacher = {
      ...data,
      id: Date.now().toString(),
    };
    setTeachers((prev) => [...prev, newTeacher]);
    setShowForm(false);
  };

  const handleEditTeacher = (data: TeacherFormData) => {
    if (!editingTeacher) return;

    const updatedTeacher: Teacher = {
      ...editingTeacher,
      ...data,
    };

    setTeachers((prev) =>
      prev.map((t) => (t.id === editingTeacher.id ? updatedTeacher : t))
    );
    setEditingTeacher(undefined);
    setShowForm(false);
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const openEditForm = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTeacher(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">
            Manage your school&apos;s teaching staff
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        onSearch={setSearchQuery}
        onFilter={setFilters}
        searchQuery={searchQuery}
        filters={filters}
      />

      {/* Teachers Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Teachers ({filteredTeachers.length})
          </h2>
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No teachers found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ||
              Object.values(filters).some((f) => f !== "All" && f !== "all")
                ? "Try adjusting your search or filters."
                : "Get started by adding a new teacher."}
            </p>
            {!searchQuery &&
              !Object.values(filters).some(
                (f) => f !== "All" && f !== "all"
              ) && (
                <div className="mt-6">
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </div>
              )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onEdit={openEditForm}
                onDelete={handleDeleteTeacher}
              />
            ))}
          </div>
        )}
      </div>

      {/* Teacher Form Modal */}
      {showForm && (
        <TeacherForm
          teacher={editingTeacher}
          onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
