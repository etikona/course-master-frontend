import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { coursesAPI } from "@/lib/api/courses";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.getAllCourses(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch courses"
      );
    }
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.getCourse(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch course"
      );
    }
  }
);

export const enrollCourse = createAsyncThunk(
  "courses/enrollCourse",
  async ({ courseId, batch }, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.enrollCourse(courseId, batch);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to enroll in course"
      );
    }
  }
);

const initialState = {
  courses: [],
  currentCourse: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },
  loading: false,
  error: null,
  filters: {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    sortOrder: "asc",
  },
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload.data;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  clearCurrentCourse,
  setCourses,
  setPagination,
} = courseSlice.actions;
export default courseSlice.reducer;
