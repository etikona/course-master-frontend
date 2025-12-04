import axiosInstance from "../utils/axios";

export const uploadsAPI = {
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post(
      "/uploads/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  uploadCourseThumbnail: async (file) => {
    const formData = new FormData();
    formData.append("thumbnail", file);

    const response = await axiosInstance.post(
      "/uploads/course-thumbnail",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  uploadAssignment: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await axiosInstance.post("/uploads/assignment", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  uploadLessonResources: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resources", file);
    });

    const response = await axiosInstance.post(
      "/uploads/lesson-resources",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  getFileUrl: (filename, folder = "") => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:5000";
    return `${baseUrl}/uploads/${folder}/${filename}`;
  },
};
