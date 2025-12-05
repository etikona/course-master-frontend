import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callAPI = useCallback(async (apiFunction, params, successMessage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction(params);
      setData(response.data);

      if (successMessage) {
        toast.success(successMessage);
      }

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    callAPI,
    reset,
    setLoading,
    setError,
    setData,
  };
};

// Specific API hooks
export const useAuthAPI = () => {
  const api = useAPI();

  const register = useCallback(
    async (userData) => {
      const response = await api.callAPI(
        async () => {
          // Import dynamically to avoid circular dependencies
          const { authAPI } = await import("@/lib/api/auth");
          return authAPI.register(userData);
        },
        userData,
        "Registration successful!"
      );

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    },
    [api.callAPI]
  );

  const login = useCallback(
    async (credentials) => {
      const response = await api.callAPI(
        async () => {
          const { authAPI } = await import("@/lib/api/auth");
          return authAPI.login(credentials);
        },
        credentials,
        "Login successful!"
      );

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    },
    [api.callAPI]
  );

  const logout = useCallback(async () => {
    await api.callAPI(
      async () => {
        const { authAPI } = await import("@/lib/api/auth");
        return authAPI.logout();
      },
      null,
      "Logged out successfully"
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, [api.callAPI]);

  const getMe = useCallback(async () => {
    return await api.callAPI(async () => {
      const { authAPI } = await import("@/lib/api/auth");
      return authAPI.getMe();
    });
  }, [api.callAPI]);

  return {
    ...api,
    register,
    login,
    logout,
    getMe,
  };
};

export const useCoursesAPI = () => {
  const api = useAPI();

  const getAllCourses = useCallback(
    async (params) => {
      return await api.callAPI(async () => {
        const { coursesAPI } = await import("@/lib/api/courses");
        return coursesAPI.getAllCourses(params);
      }, params);
    },
    [api.callAPI]
  );

  const getCourse = useCallback(
    async (id) => {
      return await api.callAPI(async () => {
        const { coursesAPI } = await import("@/lib/api/courses");
        return coursesAPI.getCourse(id);
      }, id);
    },
    [api.callAPI]
  );

  const enrollCourse = useCallback(
    async (courseId, batch) => {
      return await api.callAPI(
        async () => {
          const { coursesAPI } = await import("@/lib/api/courses");
          return coursesAPI.enrollCourse(courseId, batch);
        },
        { courseId, batch },
        "Successfully enrolled in course!"
      );
    },
    [api.callAPI]
  );

  const createCourse = useCallback(
    async (courseData) => {
      return await api.callAPI(
        async () => {
          const { coursesAPI } = await import("@/lib/api/courses");
          return coursesAPI.createCourse(courseData);
        },
        courseData,
        "Course created successfully!"
      );
    },
    [api.callAPI]
  );

  const updateCourse = useCallback(
    async (id, courseData) => {
      return await api.callAPI(
        async () => {
          const { coursesAPI } = await import("@/lib/api/courses");
          return coursesAPI.updateCourse(id, courseData);
        },
        { id, ...courseData },
        "Course updated successfully!"
      );
    },
    [api.callAPI]
  );

  const deleteCourse = useCallback(
    async (id) => {
      return await api.callAPI(
        async () => {
          const { coursesAPI } = await import("@/lib/api/courses");
          return coursesAPI.deleteCourse(id);
        },
        id,
        "Course deleted successfully!"
      );
    },
    [api.callAPI]
  );

  return {
    ...api,
    getAllCourses,
    getCourse,
    enrollCourse,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

export const useStudentsAPI = () => {
  const api = useAPI();

  const getDashboard = useCallback(async () => {
    return await api.callAPI(async () => {
      const { studentsAPI } = await import("@/lib/api/students");
      return studentsAPI.getDashboard();
    });
  }, [api.callAPI]);

  const getEnrolledCourses = useCallback(
    async (params) => {
      return await api.callAPI(async () => {
        const { studentsAPI } = await import("@/lib/api/students");
        return studentsAPI.getEnrolledCourses(params);
      }, params);
    },
    [api.callAPI]
  );

  const getCourseDetails = useCallback(
    async (courseId) => {
      return await api.callAPI(async () => {
        const { studentsAPI } = await import("@/lib/api/students");
        return studentsAPI.getCourseDetails(courseId);
      }, courseId);
    },
    [api.callAPI]
  );

  const submitAssignment = useCallback(
    async (assignmentData) => {
      return await api.callAPI(
        async () => {
          const { studentsAPI } = await import("@/lib/api/students");
          return studentsAPI.submitAssignment(assignmentData);
        },
        assignmentData,
        "Assignment submitted successfully!"
      );
    },
    [api.callAPI]
  );

  const updateProfile = useCallback(
    async (profileData) => {
      return await api.callAPI(
        async () => {
          const { studentsAPI } = await import("@/lib/api/students");
          return studentsAPI.updateProfile(profileData);
        },
        profileData,
        "Profile updated successfully!"
      );
    },
    [api.callAPI]
  );

  return {
    ...api,
    getDashboard,
    getEnrolledCourses,
    getCourseDetails,
    submitAssignment,
    updateProfile,
  };
};

export const useAdminAPI = () => {
  const api = useAPI();

  const getDashboardStats = useCallback(async () => {
    return await api.callAPI(async () => {
      const { adminAPI } = await import("@/lib/api/admin");
      return adminAPI.getDashboardStats();
    });
  }, [api.callAPI]);

  const getAllStudents = useCallback(
    async (params) => {
      return await api.callAPI(async () => {
        const { adminAPI } = await import("@/lib/api/admin");
        return adminAPI.getAllStudents(params);
      }, params);
    },
    [api.callAPI]
  );

  const getAssignments = useCallback(
    async (params) => {
      return await api.callAPI(async () => {
        const { adminAPI } = await import("@/lib/api/admin");
        return adminAPI.getAssignments(params);
      }, params);
    },
    [api.callAPI]
  );

  const reviewAssignment = useCallback(
    async (assignmentId, data) => {
      return await api.callAPI(
        async () => {
          const { adminAPI } = await import("@/lib/api/admin");
          return adminAPI.reviewAssignment(assignmentId, data);
        },
        { assignmentId, ...data },
        "Assignment reviewed successfully!"
      );
    },
    [api.callAPI]
  );

  const getAnalytics = useCallback(
    async (params) => {
      return await api.callAPI(async () => {
        const { adminAPI } = await import("@/lib/api/admin");
        return adminAPI.getAnalytics(params);
      }, params);
    },
    [api.callAPI]
  );

  return {
    ...api,
    getDashboardStats,
    getAllStudents,
    getAssignments,
    reviewAssignment,
    getAnalytics,
  };
};

export const useQuizzesAPI = () => {
  const api = useAPI();

  const getQuiz = useCallback(
    async (quizId) => {
      return await api.callAPI(async () => {
        const { quizzesAPI } = await import("@/lib/api/quizzes");
        return quizzesAPI.getQuiz(quizId);
      }, quizId);
    },
    [api.callAPI]
  );

  const submitQuiz = useCallback(
    async (quizId, data) => {
      return await api.callAPI(
        async () => {
          const { quizzesAPI } = await import("@/lib/api/quizzes");
          return quizzesAPI.submitQuiz(quizId, data);
        },
        { quizId, ...data },
        "Quiz submitted successfully!"
      );
    },
    [api.callAPI]
  );

  const getQuizResults = useCallback(
    async (quizId) => {
      return await api.callAPI(async () => {
        const { quizzesAPI } = await import("@/lib/api/quizzes");
        return quizzesAPI.getQuizResults(quizId);
      }, quizId);
    },
    [api.callAPI]
  );

  const createQuiz = useCallback(
    async (data) => {
      return await api.callAPI(
        async () => {
          const { quizzesAPI } = await import("@/lib/api/quizzes");
          return quizzesAPI.createQuiz(data);
        },
        data,
        "Quiz created successfully!"
      );
    },
    [api.callAPI]
  );

  return {
    ...api,
    getQuiz,
    submitQuiz,
    getQuizResults,
    createQuiz,
  };
};
