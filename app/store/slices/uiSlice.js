import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  notification: {
    show: false,
    message: "",
    type: "success", // 'success', 'error', 'warning', 'info'
  },
  sidebarOpen: false,
  modal: {
    show: false,
    type: "",
    data: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    showNotification: (state, action) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || "success",
      };
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modal = {
        show: true,
        type: action.payload.type,
        data: action.payload.data,
      };
    },
    closeModal: (state) => {
      state.modal = {
        show: false,
        type: "",
        data: null,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  showNotification,
  hideNotification,
  toggleSidebar,
  openModal,
  closeModal,
} = uiSlice.actions;
export default uiSlice.reducer;
