import axiosInstance from "../utils/axios";

export const studentsAPI = {
  getDashboard: async () => {
    const response = await axiosInstance.get("/students/dashboard");
    return response.data;
  },

  getEnrolledCourses: async (params = {}) => {
    const response = await axiosInstance.get("/students/courses", { params });
    return response.data;
  },

  getCourseDetails: async (courseId) => {
    const response = await axiosInstance.get(`/students/courses/${courseId}`);
    return response.data;
  },

  getLesson: async (courseId, lessonId) => {
    const response = await axiosInstance.get(
      `/students/courses/${courseId}/lessons/${lessonId}`
    );
    return response.data;
  },

  submitAssignment: async (assignmentData) => {
    const response = await axiosInstance.post(
      "/students/assignments",
      assignmentData
    );
    return response.data;
  },

  getQuizResults: async (quizId) => {
    const response = await axiosInstance.get(
      `/students/quizzes/${quizId}/results`
    );
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await axiosInstance.put("/students/profile", profileData);
    return response.data;
  },

  getProgress: async (courseId) => {
    const response = await axiosInstance.get(
      `/students/courses/${courseId}/progress`
    );
    return response.data;
  },
};
