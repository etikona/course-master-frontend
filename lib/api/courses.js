import axiosInstance from "../utils/axios";

export const coursesAPI = {
  // Public endpoints
  getAllCourses: async (params = {}) => {
    const response = await axiosInstance.get("/courses", { params });
    return response.data;
  },

  getCourse: async (id) => {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  },

  // Protected endpoints
  enrollCourse: async (courseId, batch = "Default Batch") => {
    const response = await axiosInstance.post(`/courses/${courseId}/enroll`, {
      batch,
    });
    return response.data;
  },

  getCourseProgress: async (courseId) => {
    const response = await axiosInstance.get(`/courses/${courseId}/progress`);
    return response.data;
  },

  markLessonComplete: async (courseId, lessonId) => {
    const response = await axiosInstance.post(
      `/courses/${courseId}/lessons/${lessonId}/complete`
    );
    return response.data;
  },

  // Admin endpoints
  createCourse: async (courseData) => {
    const response = await axiosInstance.post("/courses", courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await axiosInstance.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await axiosInstance.delete(`/courses/${id}`);
    return response.data;
  },
};
