"use client";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// Generic hook for useSelector
export const useAppSelector = useSelector;

// Generic hook for useDispatch
export const useAppDispatch = () => useDispatch();

// Auth hooks
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const clearError = useCallback(() => {
    dispatch({ type: "auth/clearError" });
  }, [dispatch]);

  const setUser = useCallback(
    (user) => {
      dispatch({ type: "auth/setUser", payload: user });
    },
    [dispatch]
  );

  return {
    ...authState,
    clearError,
    setUser,
  };
};

// Course hooks
export const useCourses = () => {
  const dispatch = useAppDispatch();
  const courseState = useAppSelector((state) => state.courses);

  const setFilters = useCallback(
    (filters) => {
      dispatch({ type: "courses/setFilters", payload: filters });
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: "courses/clearFilters" });
  }, [dispatch]);

  const clearCurrentCourse = useCallback(() => {
    dispatch({ type: "courses/clearCurrentCourse" });
  }, [dispatch]);

  return {
    ...courseState,
    setFilters,
    clearFilters,
    clearCurrentCourse,
  };
};

// UI hooks
export const useUI = () => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.ui);

  const setLoading = useCallback(
    (loading) => {
      dispatch({ type: "ui/setLoading", payload: loading });
    },
    [dispatch]
  );

  const setError = useCallback(
    (error) => {
      dispatch({ type: "ui/setError", payload: error });
    },
    [dispatch]
  );

  const showNotification = useCallback(
    (notification) => {
      dispatch({ type: "ui/showNotification", payload: notification });
    },
    [dispatch]
  );

  const hideNotification = useCallback(() => {
    dispatch({ type: "ui/hideNotification" });
  }, [dispatch]);

  return {
    ...uiState,
    setLoading,
    setError,
    showNotification,
    hideNotification,
  };
};

// Thunk action hooks
export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  const register = useCallback(
    (userData) =>
      dispatch({ type: "auth/register/pending", payload: userData }),
    [dispatch]
  );

  const login = useCallback(
    (credentials) =>
      dispatch({ type: "auth/login/pending", payload: credentials }),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch({ type: "auth/logout/pending" }),
    [dispatch]
  );

  const getMe = useCallback(
    () => dispatch({ type: "auth/getMe/pending" }),
    [dispatch]
  );

  return {
    register,
    login,
    logout,
    getMe,
  };
};

export const useCourseActions = () => {
  const dispatch = useAppDispatch();

  const fetchCourses = useCallback(
    (params) =>
      dispatch({ type: "courses/fetchCourses/pending", payload: params }),
    [dispatch]
  );

  const fetchCourse = useCallback(
    (id) => dispatch({ type: "courses/fetchCourse/pending", payload: id }),
    [dispatch]
  );

  const enrollCourse = useCallback(
    (data) => dispatch({ type: "courses/enrollCourse/pending", payload: data }),
    [dispatch]
  );

  return {
    fetchCourses,
    fetchCourse,
    enrollCourse,
  };
};
