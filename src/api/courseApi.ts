import type { Course } from "@/components/courses/CourseDetails";
import axiosInstance from "./axios-instance";


export const getAllCourses = () => {
  return axiosInstance.get("/courses");
};

export const getRecommendedCourses = (category: string)=> {
  return axiosInstance.get("/user/recommended-courses", {
    params: { category },
  });
};


export const getCourseById = (id: string): Promise<Course | null> => {
  return axiosInstance.get(`/courses/${id}`);
};

export const createCourse = (data: any) => {
  return axiosInstance.post("/courses", data);
};
