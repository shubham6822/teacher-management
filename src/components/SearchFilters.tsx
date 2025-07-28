"use client";

import { useState } from "react";
import type { FilterOptions } from "@/types/teacher";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { departments, subjects } from "@/lib/mock-data";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  searchQuery: string;
  filters: FilterOptions;
}

export function SearchFilters({
  onSearch,
  onFilter,
  searchQuery,
  filters,
}: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      department: "All",
      subject: "All",
      status: "all",
      experience: "All",
    };
    onFilter(clearedFilters);
    onSearch("");
  };

  const hasActiveFilters =
    filters.department !== "All" ||
    filters.subject !== "All" ||
    filters.status !== "all" ||
    filters.experience !== "All" ||
    searchQuery.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-all duration-300 group-focus-within:text-purple-600" />
            <Input
              placeholder="Search teachers by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 h-11 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 ${
                showFilters ? "bg-purple-50 border-purple-300 text-purple-700" : ""
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                  {[filters.department !== "All", filters.subject !== "All", filters.status !== "all", filters.experience !== "All", searchQuery.length > 0].filter(Boolean).length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div className="animate-in slide-in-from-top-2 duration-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Department
            </label>
            <Select
              value={filters.department}
              onValueChange={(value) => handleFilterChange("department", value)}
            >
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="hover:bg-purple-50">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Subject
            </label>
            <Select
              value={filters.subject}
              onValueChange={(value) => handleFilterChange("subject", value)}
            >
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject} className="hover:bg-blue-50">
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Status
            </label>
            <Select
              value={filters.status}
              onValueChange={(value: "all" | "active" | "inactive") =>
                handleFilterChange("status", value)
              }
            >
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="hover:bg-green-50">All</SelectItem>
                <SelectItem value="active" className="hover:bg-green-50">Active</SelectItem>
                <SelectItem value="inactive" className="hover:bg-green-50">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              Experience
            </label>
            <Select
              value={filters.experience}
              onValueChange={(value) => handleFilterChange("experience", value)}
            >
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="hover:bg-orange-50">All</SelectItem>
                <SelectItem value="0-2" className="hover:bg-orange-50">0-2 years</SelectItem>
                <SelectItem value="3-5" className="hover:bg-orange-50">3-5 years</SelectItem>
                <SelectItem value="6-10" className="hover:bg-orange-50">6-10 years</SelectItem>
                <SelectItem value="10+" className="hover:bg-orange-50">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
