import axiosInstance from "./axios-instance";

export const getScheduledSessions = async () => {
  const response = await axiosInstance.get("/tutor/scheduled-sessions");
  return response.data.sessions;
};
