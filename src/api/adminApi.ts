import axiosInstance from "./axios-instance";

export const fetchTutors = async (page: number = 1, limit: number = 5 ,search ='') => {
  try {
    const res = await axiosInstance.get(`/admin/tutor-applications?page=${page}&limit=${limit}&search=${search}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }
};

export const toggleTutorBlockStatus = async (userId: string, shouldBlock: boolean) => {  // why we need extra api for this ? 
  try {
    return await axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
      block: shouldBlock,
    });
  } catch (error) {
    console.error("Failed to toggle block status:", error);
    throw error;
  }
};



export const fetchTutorApplicationById = async (id: string) => {
  const res = await axiosInstance.get(`/admin/tutor-applications/${id}`);
  return res.data;
};

export const approveTutorApplication = async (id: string) => {
  return axiosInstance.patch(`/admin/tutor-applications/${id}/review`, {
    action: "approved",
  });
};


export const fetchAllStudents = async (page: number, limit: number,search : string) => {
  const res = await axiosInstance.get(`/admin/users?page=${page}&limit=${limit}&search=${search}`);
  return res.data;
};

export const toggleUserBlockStatus = async (userId: string, shouldBlock: boolean) => {
  return axiosInstance.patch(`/admin/users/${userId}/block-toggle`, {
    block: shouldBlock,
  });
};


export const fetchAllCourses = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/courses?page=${page}&limit=${limit}`);
  return res.data;
};

export const createCourse = async (data: { category: string; description: string }) => {
  return await axiosInstance.post("/courses", data);
};