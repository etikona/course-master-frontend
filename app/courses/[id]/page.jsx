"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  Check,
  FileText,
  Download,
  Share2,
  Heart,
  BookOpen,
  User,
  Calendar,
  Award,
  Globe,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { useAuth } from "@/app/hooks/useRedux";
import { useCoursesAPI } from "@/app/hooks/useApi";
import { toast } from "react-toastify";
import Image from "next/image";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { loading, error, data, getCourse, enrollCourse } = useCoursesAPI();

  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    const response = await getCourse(courseId);
    if (response?.data) {
      setCourse(response.data);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    try {
      setIsEnrolling(true);
      await enrollCourse(courseId, "Default Batch");
      toast.success("Successfully enrolled in course!");
      router.push(`/student/my-courses/${courseId}`);
    } catch (error) {
      toast.error("Failed to enroll in course");
    } finally {
      setIsEnrolling(false);
    }
  };

  const isEnrolled = user?.enrolledCourses?.some(
    (enrolled) => enrolled.course === courseId
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Course not found
            </h2>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/courses")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const curriculum = course.modules || [];
  const reviews = [
    {
      rating: 5,
      comment: "Excellent course with practical examples",
      author: "John D.",
      date: "2 weeks ago",
    },
    {
      rating: 4,
      comment: "Great content, but could use more exercises",
      author: "Sarah M.",
      date: "1 month ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/courses")}
              className="hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <Separator orientation="vertical" className="h-4 mx-3" />
            <span className="font-medium text-foreground">
              {course.category}
            </span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-4">
                {course.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                    <p className="font-semibold">{course.instructor?.name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
                  <span className="font-bold">{course.rating || "4.8"}</span>
                  <span className="text-muted-foreground ml-1">
                    ({course.totalStudents || 0}+ reviews)
                  </span>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 text-muted-foreground mr-2" />
                  <span>{course.totalStudents || 0} students</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration || "Self-paced"}
                </Badge>
                <Badge variant="secondary" className="gap-2">
                  <Award className="w-3.5 h-3.5" />
                  Certificate
                </Badge>
                <Badge variant="secondary" className="gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  English
                </Badge>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 border-2 shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">
                        ${course.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isLiked ? "fill-primary text-primary" : ""
                            }`}
                          />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        <span>Full lifetime access</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        <span>Access on mobile and desktop</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                  </div>

                  {isEnrolled ? (
                    <Button className="w-full py-6 text-base" size="lg">
                      <Play className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      className="w-full py-6 text-base"
                      size="lg"
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>Enroll Now</>
                      )}
                    </Button>
                  )}

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-4 lg:w-auto w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What You will Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.syllabus?.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">
                          Week {item.week}: {item.topic}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    <span>Basic computer knowledge</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    <span>Internet connection</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    <span>Dedication to learn</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Course Curriculum</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {curriculum.length} modules •{" "}
                      {curriculum.reduce(
                        (acc, mod) => acc + (mod.lessons?.length || 0),
                        0
                      )}{" "}
                      lessons
                    </span>
                    <Badge variant="outline">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {course.duration || "Self-paced"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {curriculum.map((module, index) => (
                    <div
                      key={module._id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-muted/50 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Module {index + 1}: {module.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.lessons?.length || 0} lessons •{" "}
                              {module.description}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {module.lessons?.length || 0} lessons
                          </Badge>
                        </div>
                      </div>
                      <div className="divide-y">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson._id}
                            className="p-6 flex items-center justify-between hover:bg-muted/50"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                <Play className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {lesson.duration || 10} min
                                </p>
                              </div>
                            </div>
                            {lesson.isPreview && (
                              <Badge
                                variant="outline"
                                className="border-primary/30 text-primary"
                              >
                                Preview
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="sticky top-6">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                        <Image
                          width={500}
                          height={200}
                          src={
                            course.instructor?.avatar ||
                            "/avatar-placeholder.png"
                          }
                          alt={course.instructor?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {course.instructor?.name}
                        </h3>
                        <p className="text-primary font-medium mb-4">
                          Senior Instructor
                        </p>
                        <div className="flex items-center justify-center gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">4.8</div>
                            <div className="text-sm text-muted-foreground">
                              Rating
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">15K</div>
                            <div className="text-sm text-muted-foreground">
                              Students
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">8</div>
                            <div className="text-sm text-muted-foreground">
                              Courses
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Bio</h4>
                      <p className="text-muted-foreground">
                        {course.instructor?.bio || "No bio available"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Experience</h4>
                      <p className="text-muted-foreground">
                        10+ years of experience in web development and teaching.
                        Former lead developer at TechCorp and currently running
                        a successful ed-tech platform helping thousands of
                        students worldwide.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Teaching Philosophy
                      </h4>
                      <p className="text-muted-foreground">
                        I believe in learning by doing. My courses are designed
                        with hands-on projects and real-world examples to ensure
                        you can immediately apply what you learn.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b pb-6 last:border-0"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{review.author}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold mb-2">4.8</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {course.totalStudents || 0} reviews
                      </p>
                    </div>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
