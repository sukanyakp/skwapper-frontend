import axiosInstance from "./axios-instance";


export const signup  = async(formData : Object)=>{
  try {
    const res = await axiosInstance.post('/auth/signup',  formData );
    console.log('signup successful', res.data); 
    return ({status : res.status , data : res.data})
} catch (error) {
    console.error(error); 
}
}


export const verifyOtp = async (email:string ,otp:string) =>{
  try {
    const res = await axiosInstance.post(`/auth/verify-otp`,{ email , otp })
    console.log(res.status , res.data ,'verifying otp in the backend');
    return ({status : res.status , data : res.data})
  } catch (error) {
    console.log(error);
  }
}





export const login = async(formData : object) =>{
  try {

   const res = await axiosInstance.post(`/auth/login`,formData) 
    return ({status : res.status, data : res.data})
    
  } catch (error) {
    console.log(error);
  }
}

export const adminLogin = async(formData : object) =>{
  try {

   const res = await axiosInstance.post(`/auth/login`,formData)
    return ({status : res.status, data : res.data})
    
  } catch (error) {
    console.log(error);
  }
}


export const sendResetRequest  = async (email : string) =>{
  try {

    const res = await axiosInstance.post('/auth/forgot-password' ,{email})
    console.log(res , 'last of forgot password');
       return { status: res.status, data: res.data };
    
  } catch (error) {
    console.log(error);
    
  }
}


export const resetPassword = async (token: string | undefined, password: string) => {
  try {
    const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
      password,
    });
    return res;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const resendOtp = async (email : string)=>{
  try {

    console.log('intialising resendOtp');
    
    const res = await axiosInstance.post(`/auth/resend-otp`,{email})
    console.log('got the message from resendOtp');
    
    return res
    
  } catch (error) {
    console.log(error);
    
  }
}



export const getAllCourseCategories = async (): Promise<string[]> => {
  const res = await axiosInstance.get("/courses");
  const courses = res.data.courses as { category: string }[];
  const courseCategory = courses.map((course) => course.category);
  return [...new Set(courseCategory)];
};

export const getUserProfile = async () => {
  return await axiosInstance.get("/user/profile");
};

export const fetchAllCourses = async () => {
  return await axiosInstance.get("/courses");
}

export const getTutorProfile = () => {
  return axiosInstance.get("/tutor/profile");
};