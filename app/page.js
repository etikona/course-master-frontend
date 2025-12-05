"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Award,
  Clock,
  PlayCircle,
  ChevronRight,
  Sparkles,
  BookOpen,
  Star,
} from "lucide-react";
import CourseCard from "@/app/components/courses/CourseCard";
import CourseFilters from "@/app/components/courses/CourseFilters";
import { useCourses, useCourseActions } from "@/app/hooks/useRedux";

// Featured categories
const categories = [
  { name: "Web Development", icon: "💻", count: 45 },
  { name: "Data Science", icon: "📊", count: 32 },
  { name: "Mobile Development", icon: "📱", count: 28 },
  { name: "Cybersecurity", icon: "🔒", count: 19 },
  { name: "UI/UX Design", icon: "🎨", count: 26 },
  { name: "Business", icon: "💼", count: 38 },
];

// Stats data
const stats = [
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Expert Instructors", value: "200+", icon: Award },
  { label: "Courses Available", value: "500+", icon: BookOpen },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
];

export default function HomePage() {
  const { courses, loading } = useCourses();
  const { fetchCourses } = useCourseActions();
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    fetchCourses({ limit: 6, sortBy: "rating", sortOrder: "desc" });
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setFeaturedCourses(courses.slice(0, 6));
    }
  }, [courses]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/5"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ Students Worldwide
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Master <span className="gradient-text">In-Demand Skills</span>
              <br />
              for the Digital Age
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Learn from industry experts with hands-on projects, personalized
              feedback, and career support. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 py-6 text-base">
                <PlayCircle className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Categories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover courses in your area of interest
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:border-primary/50 transition-all duration-300 border-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} courses
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">
                Featured
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                Most Popular <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked by our experts for maximum learning impact
              </p>
            </div>
            <Button variant="outline" className="mt-4 lg:mt-0 rounded-full">
              View All Courses
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {loading ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted" />
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded mb-4" />
                      <div className="h-6 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 overflow-hidden">
            <CardContent className="p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/5"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Limited Time Offer
                </Badge>

                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Start Learning Today
                  <span className="block gradient-text">
                    Transform Your Career
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join thousands of successful graduates. 30-day money-back
                  guarantee.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-6 text-base"
                  >
                    Get Started Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-10 py-6 text-base"
                  >
                    Schedule a Demo
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-10 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Average time to complete: 3 months at 10 hrs/week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
