// components/assignments/AssignmentSubmission.jsx
"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  Upload,
  Link as LinkIcon,
  FileText,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export const AssignmentSubmission = ({ assignment }) => {
  const { courseId, moduleId } = useParams();
  const fileInputRef = useRef(null);
  const [submission, setSubmission] = useState({
    text: "",
    file: null,
    link: "",
    type: "text", // 'text', 'file', or 'link'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("File size must be less than 10MB");
        return;
      }
      setSubmission({ ...submission, file, type: "file" });
    }
  };

  const handleSubmit = async () => {
    if (!submission.text && !submission.file && !submission.link) {
      toast.error("Please provide a submission");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("moduleId", moduleId);
      formData.append("assignmentId", assignment._id);
      formData.append("submissionType", submission.type);

      if (submission.type === "text") {
        formData.append("text", submission.text);
      } else if (submission.type === "file") {
        formData.append("file", submission.file);
      } else if (submission.type === "link") {
        formData.append("link", submission.link);
      }

      const response = await fetch("/api/students/assignments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const data = await response.json();
        setSubmittedData(data);
        toast.success("Assignment submitted successfully!");

        // Reset form
        setSubmission({ text: "", file: null, link: "", type: "text" });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Failed to submit assignment");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeFile = () => {
    setSubmission({ ...submission, file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Assignment Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {assignment.title}
            </h1>
            <p className="text-gray-400">{assignment.description}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 text-rose-400 text-sm rounded-full border border-rose-500/20">
            <Clock className="w-4 h-4" />
            <span>
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <FileText className="w-4 h-4 mr-2" />
            <span>{assignment.points} points</span>
          </div>
          <div className="flex items-center text-gray-400">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{assignment.requirements || "No specific requirements"}</span>
          </div>
        </div>
      </div>

      {/* Previous Submission */}
      {submittedData && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-white">Submitted Successfully</h3>
          </div>
          <p className="text-sm text-gray-400">
            Submitted on {new Date(submittedData.submittedAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Submission Type Selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {["text", "file", "link"].map((type) => (
          <button
            key={type}
            onClick={() => setSubmission({ ...submission, type })}
            className={`p-4 rounded-xl border transition-all ${
              submission.type === type
                ? "border-rose-500 bg-rose-500/10"
                : "border-gray-700 hover:border-rose-500/50"
            }`}
          >
            <div className="flex flex-col items-center">
              {type === "text" && <FileText className="w-6 h-6 mb-2" />}
              {type === "file" && <Upload className="w-6 h-6 mb-2" />}
              {type === "link" && <LinkIcon className="w-6 h-6 mb-2" />}
              <span className="font-medium text-white capitalize">{type}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Submission Form */}
      <div className="space-y-6">
        {submission.type === "text" && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Write your answer
            </label>
            <Textarea
              value={submission.text}
              onChange={(e) =>
                setSubmission({ ...submission, text: e.target.value })
              }
              placeholder="Type your assignment submission here..."
              className="min-h-[200px] bg-gray-900 border-gray-700 text-white resize-none"
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
              <span>Supports markdown formatting</span>
              <span>{submission.text.length}/5000 characters</span>
            </div>
          </div>
        )}

        {submission.type === "file" && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Upload file
            </label>
            {submission.file ? (
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-rose-400" />
                    <div>
                      <div className="font-medium text-white">
                        {submission.file.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {(submission.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-rose-500/50 hover:bg-gray-900/50 cursor-pointer transition-all"
              >
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <div className="text-white font-medium mb-2">
                  Click to upload file
                </div>
                <p className="text-sm text-gray-400">
                  PDF, DOC, ZIP up to 10MB
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.zip"
            />
          </div>
        )}

        {submission.type === "link" && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Submit link
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  value={submission.link}
                  onChange={(e) =>
                    setSubmission({ ...submission, link: e.target.value })
                  }
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
                />
              </div>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white"
                onClick={() => {
                  if (submission.link) {
                    window.open(submission.link, "_blank");
                  }
                }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Test Link
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Google Drive, GitHub, or any publicly accessible link
            </p>
          </div>
        )}

        {/* Upload Progress */}
        {isSubmitting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Uploading...</span>
              <span className="text-white font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:text-white"
            onClick={() => {
              setSubmission({ text: "", file: null, link: "", type: "text" });
              setSubmittedData(null);
            }}
            disabled={isSubmitting}
          >
            Clear
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (!submission.text && !submission.file && !submission.link)
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </div>
      </div>
    </div>
  );
};
