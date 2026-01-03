"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { X, CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const EnrollmentModal = ({ course, isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Success

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    try {
      // Payment simulation
      const paymentSuccess = await simulatePayment();

      if (paymentSuccess) {
        // Actual enrollment API call
        const response = await fetch(`/api/courses/${course._id}/enroll`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setStep(3);
          toast.success("Successfully enrolled in the course!");

          // Update user's enrolled courses in Redux
          dispatch({ type: "auth/updateEnrolledCourses", payload: course._id });
        } else {
          throw new Error("Enrollment failed");
        }
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const simulatePayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000); // Simulate 2-second payment
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Enroll in Course</h2>
            <p className="text-sm text-gray-400">Complete your enrollment</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Course Summary */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                      <div className="text-2xl">🎓</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{course.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {course.instructor?.name || "Expert Instructor"}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="text-2xl font-bold text-white">
                          ${course.price || "49.99"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Student</span>
                  <span className="font-medium text-white">{user?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Email</span>
                  <span className="font-medium text-white">{user?.email}</span>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold"
                onClick={() => setStep(2)}
              >
                Proceed to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Payment Simulation
                </h3>
                <p className="text-sm text-gray-400">
                  This is a demo payment. No real charges will be made.
                </p>
              </div>

              {/* Mock Payment Form */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Card Number
                    </label>
                    <div className="px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 text-white">
                      4242 4242 4242 4242
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Expiry
                      </label>
                      <div className="px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 text-white">
                        12/28
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        CVC
                      </label>
                      <div className="px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 text-white">
                        123
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center text-sm text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                Secure payment simulation
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  onClick={handleEnroll}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay & Enroll"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enrollment Successful! 🎉
                </h3>
                <p className="text-gray-400">
                  You now have access to "{course.title}"
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Course</span>
                  <span className="font-medium text-white">{course.title}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Enrollment ID</span>
                  <span className="font-medium text-white">
                    {Date.now().toString(36)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Access</span>
                  <span className="font-medium text-green-500">Immediate</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:text-white"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  onClick={() => {
                    router.push(`/student/courses/${course._id}`);
                    onClose();
                  }}
                >
                  Go to Course
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
