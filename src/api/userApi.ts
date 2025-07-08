import axiosInstance from "./axios-instance";

export const getUserProfile = () => {
  return axiosInstance.get("/user/profile");
};