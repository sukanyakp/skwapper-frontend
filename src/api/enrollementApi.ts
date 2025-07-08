import axiosInstance from "./axios-instance";


export const createEnrollment = (course: any) => {
  return axiosInstance.post("/enroll", { course });
};