// components/quiz/QuizContainer.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Clock,
  CheckCircle,
  XCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const QuizContainer = ({ quizId, moduleId }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/modules/${moduleId}/quiz/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        toast.error("Failed to load quiz");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, moduleId]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (isSubmitted) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    // Calculate score
    let correct = 0;
    quiz.questions.forEach((q, qIndex) => {
      if (selectedAnswers[qIndex] === q.correctAnswer) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Submit to API
    try {
      await fetch(`/api/students/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: selectedAnswers,
          score: calculatedScore,
          timeSpent: 600 - timeLeft,
        }),
      });

      toast.success("Quiz submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit quiz");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Quiz Not Found</h3>
        <p className="text-gray-400 mb-6">
          The requested quiz is not available.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{quiz.title}</h1>
            <p className="text-gray-400">{quiz.description}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg border border-gray-700">
              <Clock className="w-5 h-5 text-rose-400" />
              <span
                className={`font-mono font-bold ${
                  timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-white"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Progress */}
            <div className="hidden md:block">
              <div className="text-sm text-gray-400 mb-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
              <Progress
                value={((currentQuestion + 1) / quiz.questions.length) * 100}
                className="w-32 h-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-rose-500/10 text-rose-400 text-sm rounded-full border border-rose-500/20 mb-3">
                  Question {currentQuestion + 1}
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {currentQ.question}
                </h2>
              </div>
              <div className="text-sm text-gray-400">
                {currentQ.points} points
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-rose-500 bg-rose-500/10"
                        : "border-gray-700 hover:border-rose-500/50 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : "bg-gray-900 text-gray-400"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white"
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {currentQuestion < quiz.questions.length - 1 ? (
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>

          {/* Question Progress Dots */}
          <div className="flex flex-wrap gap-2 justify-center">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuestion
                    ? "bg-rose-500"
                    : selectedAnswers[index] !== undefined
                    ? "bg-emerald-500"
                    : "bg-gray-700"
                } ${index !== currentQuestion ? "hover:scale-125" : ""}`}
                title={`Question ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-8">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
              <Award className="w-16 h-16 text-rose-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-900">
              {score}%
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            {score >= 70 ? "Congratulations! 🎉" : "Good Try! 💪"}
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {score >= 70
              ? "You passed the quiz! Keep up the great work."
              : "Review the material and try again. You've got this!"}
          </p>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
            <div className="bg-gray-800/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {Object.keys(selectedAnswers).length}
              </div>
              <div className="text-sm text-gray-400">Questions Attempted</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {Math.round(
                  (Object.values(selectedAnswers).filter(
                    (ans, idx) => ans === quiz.questions[idx]?.correctAnswer
                  ).length /
                    quiz.questions.length) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {formatTime(600 - timeLeft)}
              </div>
              <div className="text-sm text-gray-400">Time Taken</div>
            </div>
          </div>

          {/* Review Answers Button */}
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:text-white mr-3"
            onClick={() => setIsSubmitted(false)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Review Answers
          </Button>

          <Button
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
            onClick={() => router.push(`/student/courses/${quiz.courseId}`)}
          >
            Continue Learning
          </Button>
        </div>
      )}
    </div>
  );
};
