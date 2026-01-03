"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  FileText,
  Award,
  Download,
  Share2,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Video,
  FileQuestion,
} from "lucide-react";
import { useAuth } from "@/hooks/useRedux";
import { useStudentsAPI, useQuizzesAPI } from "@/hooks/useAPI";
import { toast } from "react-toastify";

const StudentCoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const courseId = params.id;

  const { loading, error, data, getCourseDetails, submitAssignment } =
    useStudentsAPI();
  const { getQuiz, submitQuiz } = useQuizzesAPI();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState("");
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchCourseData();
  }, [courseId, isAuthenticated, router]);

  const fetchCourseData = async () => {
    try {
      const response = await getCourseDetails(courseId);
      if (response?.data) {
        setCourse(response.data.course);
        setProgress(response.data.enrollment);

        // Set initial module and lesson
        const firstModule = response.data.course?.modules?.[0];
        if (firstModule) {
          setSelectedModule(firstModule);
          const firstLesson = firstModule.lessons?.[0];
          if (firstLesson) {
            setSelectedLesson(firstLesson);
          }
        }
      }
    } catch (error) {
      toast.error("Failed to load course data");
    }
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("content");
    setShowQuiz(false);
    setShowAssignment(false);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    if (module.lessons?.[0]) {
      setSelectedLesson(module.lessons[0]);
    }
    setActiveTab("content");
    setShowQuiz(false);
    setShowAssignment(false);
  };

  const handleQuizSelect = async (module) => {
    if (module.quiz) {
      try {
        const response = await getQuiz(module.quiz);
        if (response?.data) {
          setCurrentQuiz(response.data);
          setShowQuiz(true);
          setShowAssignment(false);
          setActiveTab("quiz");
        }
      } catch (error) {
        toast.error("Failed to load quiz");
      }
    }
  };

  const handleAssignmentSelect = (module) => {
    setShowAssignment(true);
    setShowQuiz(false);
    setSelectedModule(module);
    setActiveTab("assignment");
  };

  const handleMarkComplete = async () => {
    if (!selectedLesson) return;

    try {
      // Here you would call the markLessonComplete API
      toast.success("Lesson marked as complete!");
      fetchCourseData(); // Refresh progress
    } catch (error) {
      toast.error("Failed to mark lesson as complete");
    }
  };

  const handleSubmitAssignment = async () => {
    if (!assignmentSubmission.trim()) {
      toast.error("Please enter your assignment submission");
      return;
    }

    try {
      await submitAssignment({
        courseId,
        moduleId: selectedModule._id,
        submission: assignmentSubmission,
        submissionType: "text",
      });
      setAssignmentSubmission("");
      setShowAssignment(false);
      toast.success("Assignment submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit assignment");
    }
  };

  const handleSubmitQuiz = async (answers) => {
    try {
      await submitQuiz(currentQuiz._id, { answers });
      setShowQuiz(false);
      toast.success("Quiz submitted successfully!");
      fetchCourseData(); // Refresh progress
    } catch (error) {
      toast.error("Failed to submit quiz");
    }
  };

  if (loading && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading course...</p>
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
              You don't have access to this course or it doesn't exist.
            </p>
            <Button onClick={() => router.push("/student/my-courses")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedLessons = progress?.completedLessons || [];
  const totalLessons =
    course.modules?.reduce(
      (acc, module) => acc + (module.lessons?.length || 0),
      0
    ) || 0;
  const progressPercentage =
    totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/student/my-courses")}
                className="hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                My Courses
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-semibold line-clamp-1">{course.title}</h1>
                <p className="text-xs text-muted-foreground">
                  Progress: {progressPercentage}%
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              sidebarOpen ? "lg:pr-80" : ""
            }`}
          >
            {/* Progress Bar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Your Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedLessons.length} of {totalLessons} lessons
                      completed
                    </p>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    {progressPercentage}%
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>

            {/* Content Area */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="content" className="gap-2">
                  <Play className="w-4 h-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="discussion" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                {/* Video Player */}
                {selectedLesson && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{selectedLesson.title}</CardTitle>
                        <Badge variant="outline" className="gap-2">
                          <Clock className="w-3 h-3" />
                          {selectedLesson.duration || 10} min
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-black rounded-lg mb-6 overflow-hidden">
                        {selectedLesson.videoUrl ? (
                          <iframe
                            src={selectedLesson.videoUrl}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Lesson Description</h3>
                        <p className="text-muted-foreground">
                          {selectedLesson.description ||
                            "No description available."}
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t">
                          <Button
                            className="gap-2"
                            onClick={handleMarkComplete}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark as Complete
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download Resources
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Lesson Description */}
                {selectedLesson && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Lesson Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>
                          This lesson covers the fundamentals of the topic. Make
                          sure to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Take notes as you watch the video</li>
                          <li>Complete the practice exercises</li>
                          <li>Review the supplementary materials</li>
                          <li>Ask questions in the discussion forum</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!selectedLesson && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Play className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Welcome to the Course!
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Select a lesson from the sidebar to start learning. Each
                        lesson includes video content, exercises, and
                        supplementary materials.
                      </p>
                      <Button onClick={() => setSidebarOpen(true)}>
                        Browse Lessons
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedModule?.resources?.length > 0 ? (
                        selectedModule.resources.map((resource, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-primary mr-3" />
                              <div>
                                <h4 className="font-medium">
                                  {resource.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  PDF Document • {resource.size || "N/A"}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          No resources available for this lesson
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Forum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-3">Ask a Question</h3>
                        <textarea
                          className="w-full min-h-[100px] p-3 border rounded-lg"
                          placeholder="Type your question here..."
                        />
                        <div className="flex justify-end mt-4">
                          <Button>Post Question</Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Recent Discussions</h3>
                        <div className="border rounded-lg p-4">
                          <p className="font-medium mb-2">
                            How do I solve exercise 3.2?
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Posted by John Doe • 2 hours ago
                          </p>
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Course Navigation */}
          {sidebarOpen && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <Card className="sticky top-24 border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Course Modules */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-lg mb-4">Course Content</h3>

                    {course.modules?.map((module, moduleIndex) => (
                      <div key={module._id} className="space-y-2">
                        <div
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedModule?._id === module._id
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleModuleSelect(module)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                selectedModule?._id === module._id
                                  ? "bg-primary text-white"
                                  : "bg-muted"
                              }`}
                            >
                              {moduleIndex + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{module.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {module.lessons?.length || 0} lessons
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              selectedModule?._id === module._id
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </div>

                        {/* Module Lessons */}
                        {selectedModule?._id === module._id && (
                          <div className="ml-11 space-y-2">
                            {module.lessons?.map((lesson, lessonIndex) => {
                              const isCompleted = completedLessons.includes(
                                lesson._id
                              );
                              return (
                                <div
                                  key={lesson._id}
                                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedLesson?._id === lesson._id
                                      ? "bg-primary/5"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => handleLessonSelect(lesson)}
                                >
                                  <div className="flex items-center flex-1">
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border border-muted-foreground mr-3" />
                                    )}
                                    <span
                                      className={`${
                                        isCompleted
                                          ? "line-through text-muted-foreground"
                                          : ""
                                      }`}
                                    >
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {lesson.duration || 10}m
                                  </span>
                                </div>
                              );
                            })}

                            {/* Module Actions */}
                            <div className="pt-4 border-t space-y-2">
                              {module.quiz && (
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                  onClick={() => handleQuizSelect(module)}
                                >
                                  <FileQuestion className="w-4 h-4" />
                                  Take Quiz
                                </Button>
                              )}
                              {module.assignment && (
                                <Button
                                  variant="outline"
                                  className="w-full justify-start gap-2"
                                  onClick={() => handleAssignmentSelect(module)}
                                >
                                  <FileText className="w-4 h-4" />
                                  Submit Assignment
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Course Completion */}
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Completion</h4>
                      <Badge>{progressPercentage}%</Badge>
                    </div>
                    <Progress value={progressPercentage} />

                    {progressPercentage === 100 && (
                      <Button className="w-full gap-2">
                        <Award className="w-4 h-4" />
                        Get Certificate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCoursePage;
