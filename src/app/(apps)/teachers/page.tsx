"use client";

import { useState, useMemo } from "react";
import type { Teacher, TeacherFormData, FilterOptions } from "@/types/teacher";
import { mockTeachers } from "@/lib/mock-data";
import { TeacherCard } from "@/components/TeacherCard";
import { TeacherForm } from "@/components/TeacherForm";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Plus, Users, Sparkles, Grid3X3, List } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Teachers
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {teachers.length} Active
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Manage your school&apos;s teaching staff and their profiles
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-white shadow-sm" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-white shadow-sm" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>
          </div>
        </div>
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
        {filteredTeachers.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No teachers found
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {searchQuery ||
              Object.values(filters).some((f) => f !== "All" && f !== "all")
                ? "Try adjusting your search or filters to find teachers."
                : "Get started by adding your first teacher to the system."}
            </p>
            {!searchQuery &&
              !Object.values(filters).some(
                (f) => f !== "All" && f !== "all"
              ) && (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Teacher
                </Button>
              )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-in slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TeacherCard
                  teacher={teacher}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTeacher}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-in slide-in-from-left-5 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TeacherCard
                  teacher={teacher}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTeacher}
                />
              </div>
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
