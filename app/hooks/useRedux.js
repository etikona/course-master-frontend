"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import {
  fetchCourses,
  fetchCourse,
  enrollCourse,
} from "@/app/store/slices/courseSlice";

import { login, register, logout, getMe } from "@/app/store/slices/authSlice";

// Generic hooks
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

// ---------------- AUTH HOOK ----------------
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

// ---------------- COURSES HOOK ----------------
export const useCourses = () => {
  const dispatch = useAppDispatch();
  const courseState = useAppSelector((state) => state.courses);

  const setFilters = useCallback(
    (filters) => {
      dispatch({ type: "courses/setFilters", payload: filters });
    },
    [dispatch]
  );

  const clearFilters = useCallback(
    () => dispatch({ type: "courses/clearFilters" }),
    [dispatch]
  );

  const clearCurrentCourse = useCallback(
    () => dispatch({ type: "courses/clearCurrentCourse" }),
    [dispatch]
  );

  return {
    ...courseState,
    setFilters,
    clearFilters,
    clearCurrentCourse,
  };
};

// ---------------- UI HOOK ----------------
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

  const hideNotification = useCallback(
    () => dispatch({ type: "ui/hideNotification" }),
    [dispatch]
  );

  return {
    ...uiState,
    setLoading,
    setError,
    showNotification,
    hideNotification,
  };
};

// ---------------- AUTH ACTIONS (THUNKS) ----------------
export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  return {
    register: (data) => dispatch(register(data)),
    login: (data) => dispatch(login(data)),
    logout: () => dispatch(logout()),
    getMe: () => dispatch(getMe()),
  };
};

// ---------------- COURSE ACTIONS (THUNKS) ----------------
export const useCourseActions = () => {
  const dispatch = useAppDispatch();

  return {
    fetchCourses: (params) => dispatch(fetchCourses(params)),
    fetchCourse: (id) => dispatch(fetchCourse(id)),
    enrollCourse: (data) => dispatch(enrollCourse(data)),
  };
};
