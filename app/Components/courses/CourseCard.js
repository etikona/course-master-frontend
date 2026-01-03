"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Star,
  Users,
  Clock,
  BookOpen,
  Eye,
  Heart,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

const CourseCard = (course, variant) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  if (variant === "compact") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm hover:shadow-primary/10">
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={course.thumbnail || "/course-placeholder.jpg"}
              alt={course.title}
              width={30}
              height={20}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {course.isPublished === false && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">
                  Draft
                </Badge>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                  <Link
                    href={`/courses/${course._id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {course.title}
                  </Link>
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="shrink-0 ml-2"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "fill-primary text-primary" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{course.duration || "N/A"}h</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{course.totalStudents || 0}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">
                  {formatPrice(course.price)}
                </span>
                {course.progress !== undefined && (
                  <Progress value={course.progress} className="w-20 h-1.5" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "dashboard") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm hover:shadow-primary/10">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video overflow-hidden">
              <Image
                src={course.thumbnail || "/course-placeholder.jpg"}
                width={30}
                height={20}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="absolute top-3 right-3">
              <Badge className="bg-primary hover:bg-primary/90">
                {formatPrice(course.price)}
              </Badge>
            </div>

            {course.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="mt-2 h-1.5" />
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                {course.category}
              </Badge>
              {course.rating && (
                <div className="flex items-center text-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
              <Link
                href={`/student/my-courses/${course._id}`}
                className="hover:text-primary transition-colors"
              >
                {course.title}
              </Link>
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {course.instructor?.avatar ? (
                  <Image
                    src={course.instructor?.avatar}
                    alt={course.instructor?.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
                <span className="text-sm font-medium">
                  {course.instructor.name}
                </span>
              </div>

              <Button size="sm" variant="outline" className="rounded-full">
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg hover:shadow-primary/20 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Course Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={course.thumbnail || "/course-placeholder.jpg"}
            alt={course.title}
            width={30}
            height={20}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <span className="font-bold text-primary flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1" />
                {formatPrice(course.price)}
              </span>
            </div>
          </div>

          {/* Status badge */}
          {course.isPublished === false && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-white/95 backdrop-blur-sm"
              >
                Draft
              </Badge>
            </div>
          )}

          {/* Quick actions on hover */}
          <div
            className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="sm"
              className="flex-1 bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isLiked ? "fill-white" : ""}`}
              />
              {isLiked ? "Liked" : "Like"}
            </Button>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs font-medium">
              {course.category}
            </Badge>
            {course.rating && (
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-muted-foreground ml-1">
                  ({course.totalStudents || 0})
                </span>
              </div>
            )}
          </div>

          {/* Course Title */}
          <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight">
            <Link
              href={`/courses/${course._id}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {course.title}
            </Link>
          </h3>

          {/* Course Description */}
          <p className="text-muted-foreground mb-5 line-clamp-2">
            {course.description}
          </p>

          {/* Instructor Info */}
          <div className="flex items-center mb-6">
            {course.instructor?.avatar ? (
              <Image
                src={course.instructor?.avatar}
                alt={course.instructor?.name}
                className="w-10 h-10 rounded-full mr-3 ring-2 ring-primary/20"
              />
            ) : (
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <p className="font-medium text-sm">Instructor</p>
              <p className="text-foreground font-semibold">
                {course.instructor?.name}
              </p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{course.duration || "Flexible"} hours</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>{course.totalStudents || 0} students</span>
            </div>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-primary/5 text-primary rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                  +{course.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/* Card Footer with Enroll Button */}
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full rounded-lg py-6 text-base font-semibold"
          size="lg"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
