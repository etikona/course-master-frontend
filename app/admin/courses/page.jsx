"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  BookOpen,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { useAdminAPI } from "@/hooks/useAPI";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminCoursesPage = () => {
  const { loading, error, data, getAllCourses } = useAdminAPI();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses({});
      if (response?.data) {
        setCourses(response.data);
      }
    } catch (error) {
      toast.error("Failed to load courses");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && course.isPublished) ||
      (statusFilter === "draft" && !course.isPublished);
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCourse = async (courseId) => {
    if (
      !confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Here you would call deleteCourse API
      toast.success("Course deleted successfully");
      fetchCourses(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const toggleSelectCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedCourses.length === 0) {
      toast.error("Please select courses first");
      return;
    }

    switch (action) {
      case "publish":
        toast.success(`Published ${selectedCourses.length} courses`);
        break;
      case "delete":
        if (confirm(`Delete ${selectedCourses.length} selected courses?`)) {
          toast.success(`Deleted ${selectedCourses.length} courses`);
          setSelectedCourses([]);
        }
        break;
      case "export":
        toast.success(`Exported ${selectedCourses.length} courses`);
        break;
    }
  };

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Published",
      value: courses.filter((c) => c.isPublished).length,
      icon: Eye,
      color: "text-green-500",
    },
    {
      label: "Total Students",
      value: courses.reduce((acc, c) => acc + (c.totalStudents || 0), 0),
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Total Revenue",
      value: `$${courses
        .reduce((acc, c) => acc + (c.totalStudents || 0) * (c.price || 0), 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Course Management</h1>
              <p className="text-muted-foreground">
                Manage and organize all courses on the platform
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Link href="/admin/courses/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search courses by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-[400px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-4 py-2 ${
                      statusFilter === "all"
                        ? "bg-primary text-white"
                        : "bg-background"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter("published")}
                    className={`px-4 py-2 ${
                      statusFilter === "published"
                        ? "bg-primary text-white"
                        : "bg-background"
                    }`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => setStatusFilter("draft")}
                    className={`px-4 py-2 ${
                      statusFilter === "draft"
                        ? "bg-primary text-white"
                        : "bg-background"
                    }`}
                  >
                    Draft
                  </button>
                </div>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedCourses.length > 0 && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {selectedCourses.length} selected
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {selectedCourses.length} courses selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("publish")}
                  >
                    Publish Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("export")}
                  >
                    Export Selected
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? "Try a different search term"
                    : "Get started by creating your first course"}
                </p>
                <Link href="/admin/courses/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          checked={
                            selectedCourses.length === filteredCourses.length
                          }
                          onChange={() => {
                            if (
                              selectedCourses.length === filteredCourses.length
                            ) {
                              setSelectedCourses([]);
                            } else {
                              setSelectedCourses(
                                filteredCourses.map((c) => c._id)
                              );
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Students
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(course._id)}
                            onChange={() => toggleSelectCourse(course._id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 shrink-0">
                              <Image
                                src={
                                  course.thumbnail || "/course-placeholder.jpg"
                                }
                                alt={course.title}
                                className="w-full h-full object-cover"
                                width={50}
                                height={20}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold line-clamp-1">
                                {course.title}
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{course.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="font-semibold">
                              {course.totalStudents || 0}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="font-semibold">
                              $
                              {(course.totalStudents || 0) *
                                (course.price || 0)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {course.isPublished ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Published
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-amber-600 border-amber-200"
                            >
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/courses/${course._id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/courses/edit/${course._id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCourse(course._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
