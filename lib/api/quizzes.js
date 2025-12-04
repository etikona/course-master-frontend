import axiosInstance from "../utils/axios";

export const quizzesAPI = {
  getQuiz: async (quizId) => {
    const response = await axiosInstance.get(`/quizzes/${quizId}`);
    return response.data;
  },

  submitQuiz: async (quizId, data) => {
    const response = await axiosInstance.post(
      `/quizzes/${quizId}/submit`,
      data
    );
    return response.data;
  },

  getQuizResults: async (quizId) => {
    const response = await axiosInstance.get(`/quizzes/${quizId}/results`);
    return response.data;
  },

  getStudentQuizAttempts: async (courseId) => {
    const response = await axiosInstance.get(
      `/quizzes/course/${courseId}/attempts`
    );
    return response.data;
  },

  createQuiz: async (data) => {
    const response = await axiosInstance.post("/quizzes", data);
    return response.data;
  },

  updateQuiz: async (quizId, data) => {
    const response = await axiosInstance.put(`/quizzes/${quizId}`, data);
    return response.data;
  },

  deleteQuiz: async (quizId) => {
    const response = await axiosInstance.delete(`/quizzes/${quizId}`);
    return response.data;
  },

  getCourseQuizAttempts: async (courseId, params = {}) => {
    const response = await axiosInstance.get(
      `/quizzes/admin/course/${courseId}/attempts`,
      { params }
    );
    return response.data;
  },
};
