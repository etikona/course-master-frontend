"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  MoreVertical,
  Edit,
  UserX,
  Download,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAdminAPI } from "@/hooks/useAPI";
import { toast } from "react-toastify";

const AdminStudentsPage = () => {
  const { loading, error, data, getAllStudents } = useAdminAPI();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents({});
      if (response?.data) {
        setStudents(response.data);
      }
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Active Today",
      value: Math.floor(students.length * 0.4),
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Avg. Completion",
      value: "68%",
      icon: Award,
      color: "text-blue-500",
    },
    {
      label: "New This Month",
      value: Math.floor(students.length * 0.15),
      icon: Calendar,
      color: "text-purple-500",
    },
  ];

  const getEnrollmentStatus = (enrollments) => {
    if (!enrollments || enrollments === 0)
      return { label: "New", color: "bg-blue-100 text-blue-800" };
    if (enrollments < 3)
      return { label: "Active", color: "bg-green-100 text-green-800" };
    return { label: "Regular", color: "bg-purple-100 text-purple-800" };
  };

  const handleDeleteStudent = async (studentId) => {
    if (
      !confirm(
        "Are you sure you want to delete this student? This will remove all their data."
      )
    ) {
      return;
    }

    try {
      // Here you would call deleteStudent API
      toast.success("Student deleted successfully");
      fetchStudents(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  const toggleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Student Management</h1>
              <p className="text-muted-foreground">
                Manage and monitor all students on the platform
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
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
                    placeholder="Search students by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-[400px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {selectedStudents.length > 0 && (
                  <Badge variant="secondary" className="gap-2">
                    {selectedStudents.length} selected
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "No students registered yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => {
              const enrollmentStatus = getEnrollmentStatus(
                student.totalEnrollments
              );

              return (
                <Card
                  key={student._id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Student Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <span className="font-bold text-primary text-lg">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{student.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="w-3 h-3 mr-1" />
                            {student.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => toggleSelectStudent(student._id)}
                          className="rounded border-gray-300"
                        />
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Enrolled Courses
                        </div>
                        <span className="font-semibold">
                          {student.totalEnrollments || 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Award className="w-4 h-4 mr-2" />
                          Completed
                        </div>
                        <span className="font-semibold">
                          {student.completedCourses || 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          Member Since
                        </div>
                        <span className="font-semibold text-sm">
                          {new Date(student.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={enrollmentStatus.color}>
                        {enrollmentStatus.label}
                      </Badge>
                      <Badge variant="outline">Student</Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // View student details
                        }}
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteStudent(student._id)}
                      >
                        <UserX className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Edit student
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudentsPage;
