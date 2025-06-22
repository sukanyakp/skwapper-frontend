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
   console.log(' heere we are in api login ');
   const  { token }  = res.data
   console.log(token , 'accessToken');
   
   localStorage.setItem('accessToken',token)
   
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



