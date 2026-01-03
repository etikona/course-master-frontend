"use client";

import { useState, useEffect } from "react";
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
  ArrowRight,
  Zap,
  Target,
  Trophy,
} from "lucide-react";
import CourseCardDemo from "./Components/courses/CourseCard";
import CourseCard from "./Components/courses/CourseCard";

// Featured categories
const categories = [
  {
    name: "Web Development",
    icon: "💻",
    count: 45,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Data Science",
    icon: "📊",
    count: 32,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Mobile Dev",
    icon: "📱",
    count: 28,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Cybersecurity",
    icon: "🔒",
    count: 19,
    color: "from-red-500 to-rose-500",
  },
  {
    name: "UI/UX Design",
    icon: "🎨",
    count: 26,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Business",
    icon: "💼",
    count: 38,
    color: "from-indigo-500 to-violet-500",
  },
];

// Stats data
const stats = [
  {
    label: "Active Students",
    value: "10,000+",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Expert Instructors",
    value: "200+",
    icon: Award,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Courses Available",
    value: "500+",
    icon: BookOpen,
    color: "from-rose-500 to-pink-500",
  },
  {
    label: "Success Rate",
    value: "95%",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
];

// Mock courses
const mockCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2024",
    description:
      "Master modern web development from scratch with React, Node.js, and MongoDB",
    category: "Web Development",
    price: 49.99,
    rating: 4.8,
    students: "12.5K",
    lessons: 156,
  },
  {
    _id: "2",
    title: "Data Science & Machine Learning Masterclass",
    description:
      "Learn Python, data analysis, visualization, and machine learning algorithms",
    category: "Data Science",
    price: 59.99,
    rating: 4.9,
    students: "8.3K",
    lessons: 184,
  },
  {
    _id: "3",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications for iOS and Android",
    category: "Mobile Development",
    price: 44.99,
    rating: 4.7,
    students: "6.2K",
    lessons: 128,
  },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState(mockCourses);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-rose-500/30 rounded-full mb-8 shadow-lg shadow-rose-500/10">
              <Sparkles className="w-4 h-4 mr-2 text-rose-400" />
              <span className="text-sm font-medium text-gray-300">
                Trusted by 10,000+ Students Worldwide
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl text-gray-300 lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Master{" "}
              <span className="bg-linear-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
                In-Demand Skills
              </span>
              <br />
              for the Digital Age
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Learn from industry experts with hands-on projects, personalized
              feedback, and career support. Start your journey today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                <PlayCircle className="w-5 h-5 mr-2" />
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-gray-800 text-gray-300 font-semibold rounded-full border border-gray-700 hover:border-rose-500/50 hover:text-white transition-all duration-200">
                How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-rose-400" />
                <span>Award Winning Platform</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-rose-400" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-rose-400" />
                <span>Career Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-rose-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full mb-6">
              <span className="text-sm font-medium text-gray-400">
                Categories
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Explore by{" "}
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover courses in your area of interest
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-rose-500/50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.count} courses
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
            <div>
              <div className="inline-block px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full mb-6">
                <span className="text-sm font-medium text-gray-400">
                  Featured
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                Most Popular{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                  Courses
                </span>
              </h2>
              <p className="text-lg text-gray-400">
                Handpicked by our experts for maximum learning impact
              </p>
            </div>
            <button className="group mt-6 lg:mt-0 px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-full border border-gray-700 hover:border-rose-500/50 hover:text-white transition-all duration-200 flex items-center">
              View All Courses
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-800/30 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-700" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-4" />
                    <div className="h-6 bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
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
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-rose-500/20 rounded-3xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative p-12 lg:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center px-4 py-2 bg-rose-500/20 backdrop-blur-sm border border-rose-500/30 rounded-full mb-8">
                  <Star className="w-4 h-4 mr-2 text-rose-400 fill-rose-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Limited Time Offer
                  </span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  Start Learning Today
                  <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent mt-2">
                    Transform Your Career
                  </span>
                </h2>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                  Join thousands of successful graduates. 30-day money-back
                  guarantee.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <button className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-200 transform hover:scale-105">
                    Get Started Free
                  </button>
                  <button className="px-10 py-4 bg-gray-800 text-gray-300 font-semibold rounded-full border border-gray-700 hover:border-rose-500/50 hover:text-white transition-all duration-200">
                    Schedule a Demo
                  </button>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Average time to complete: 3 months at 10 hrs/week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
