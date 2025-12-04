import axiosInstance from "../utils/axios";

export const adminAPI = {
  getDashboardStats: async () => {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data;
  },

  getAllCourses: async (params = {}) => {
    const response = await axiosInstance.get("/admin/courses", { params });
    return response.data;
  },

  getAllStudents: async (params = {}) => {
    const response = await axiosInstance.get("/admin/students", { params });
    return response.data;
  },

  getCourseEnrollments: async (courseId, params = {}) => {
    const response = await axiosInstance.get(
      `/admin/courses/${courseId}/enrollments`,
      { params }
    );
    return response.data;
  },

  getStudentEnrollments: async (studentId) => {
    const response = await axiosInstance.get(
      `/admin/students/${studentId}/enrollments`
    );
    return response.data;
  },

  updateStudent: async (studentId, data) => {
    const response = await axiosInstance.put(
      `/admin/students/${studentId}`,
      data
    );
    return response.data;
  },

  deleteStudent: async (studentId) => {
    const response = await axiosInstance.delete(`/admin/students/${studentId}`);
    return response.data;
  },

  getAssignments: async (params = {}) => {
    const response = await axiosInstance.get("/admin/assignments", { params });
    return response.data;
  },

  reviewAssignment: async (assignmentId, data) => {
    const response = await axiosInstance.put(
      `/admin/assignments/${assignmentId}/review`,
      data
    );
    return response.data;
  },

  createBatch: async (courseId, data) => {
    const response = await axiosInstance.post(
      `/admin/courses/${courseId}/batches`,
      data
    );
    return response.data;
  },

  updateBatch: async (batchId, data) => {
    const response = await axiosInstance.put(`/admin/batches/${batchId}`, data);
    return response.data;
  },

  deleteBatch: async (batchId) => {
    const response = await axiosInstance.delete(`/admin/batches/${batchId}`);
    return response.data;
  },

  getAnalytics: async (params = {}) => {
    const response = await axiosInstance.get("/admin/analytics", { params });
    return response.data;
  },
};
