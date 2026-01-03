"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
  Eye,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Award,
} from "lucide-react";
import { useAdminAPI } from "@/hooks/useAPI";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { loading, error, data, getDashboardStats } = useAdminAPI();
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    fetchDashboardStats();
  }, [timeRange]);

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      if (response?.data) {
        setStats(response.data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  const mainStats = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      change: "+5%",
      trend: "up",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Enrollments",
      value: stats?.totalEnrollments || 0,
      change: "+18%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      change: "+22%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "enrolled in",
      course: "Web Development Bootcamp",
      time: "2 min ago",
    },
    {
      user: "Sarah Smith",
      action: "completed",
      course: "Data Science Fundamentals",
      time: "15 min ago",
    },
    {
      user: "Mike Johnson",
      action: "submitted assignment for",
      course: "React Masterclass",
      time: "1 hour ago",
    },
    {
      user: "Emma Wilson",
      action: "purchased",
      course: "Full Stack Development",
      time: "2 hours ago",
    },
    {
      user: "Alex Chen",
      action: "completed quiz for",
      course: "Python Programming",
      time: "3 hours ago",
    },
  ];

  const topCourses = [
    {
      title: "Web Development Bootcamp",
      students: 1542,
      revenue: "$46,260",
      rating: 4.9,
    },
    {
      title: "Data Science Masterclass",
      students: 1245,
      revenue: "$37,350",
      rating: 4.8,
    },
    {
      title: "Mobile App Development",
      students: 987,
      revenue: "$29,610",
      rating: 4.7,
    },
    {
      title: "UI/UX Design Fundamentals",
      students: 876,
      revenue: "$26,280",
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome back! Here is what is happening with your platform
                today.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <select
                className="bg-background border rounded-lg px-3 py-2 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 90 days</option>
                <option value="year">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <Badge
                      variant={stat.trend === "up" ? "default" : "destructive"}
                      className="gap-1"
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>

                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Total revenue over time</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">
                      Revenue Chart
                    </h4>
                    <p className="text-muted-foreground">
                      Chart visualization would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Latest platform activities
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Clock className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          <span className="font-bold">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="text-primary font-semibold">
                            {activity.course}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Top Courses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Courses</CardTitle>
                    <CardDescription>By enrollment & revenue</CardDescription>
                  </div>
                  <Badge variant="outline">
                    <Award className="w-3 h-3 mr-1" />
                    Top 4
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold line-clamp-1">
                          {course.title}
                        </h4>
                        <div className="flex items-center">
                          {/* <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" /> */}
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-3 h-3 mr-1" />
                          {course.students.toLocaleString()} students
                        </div>
                        <span className="font-bold text-primary">
                          {course.revenue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Completion Rate</p>
                        <p className="text-sm text-muted-foreground">
                          Course completion
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      78%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Active Students</p>
                        <p className="text-sm text-muted-foreground">
                          Last 30 days
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      2,458
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                        <Eye className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Engagement</p>
                        <p className="text-sm text-muted-foreground">
                          Avg. time spent
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      4.2h
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-3">
                    <div className="text-center">
                      <Users className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-xs">Manage Users</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-3">
                    <div className="text-center">
                      <BookOpen className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-xs">Add Course</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-3">
                    <div className="text-center">
                      <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-xs">Analytics</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-3">
                    <div className="text-center">
                      <DollarSign className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-xs">Revenue</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
