import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export const signup  = async(formData : Object)=>{
  try {
    const res = await api.post('/signup',  formData );
    console.log('signup successful', res.data); 
    return ({status : res.status , data : res.data})
} catch (error) {
    console.error(error); 
}
}


export const verifyOtp = async (email:string ,otp:string) =>{
  try {
    const res = await api.post(`/verify-otp`,{ email , otp })
    console.log(res.status , res.data ,'verifying otp in the backend');
    return ({status : res.status , data : res.data})
  } catch (error) {
    console.log(error);
  }
}


export const login = async(formData : object) =>{
  try {

   const res = await api.post(`/login`,formData)
   console.log(' heere we are in api login ');
   const  { token }  = res.data
   console.log(token , 'accessToken');
   
   localStorage.setItem(token,'accessToken')
   
    return ({status : res.status, data : res.data})
    
  } catch (error) {
    console.log(error);
  }
}


export const sendResetRequest  = async (email : string) =>{
  try {

    const res = await api.post('/forgot-password' ,{email})
    console.log(res , 'last of forgot password');
       return { status: res.status, data: res.data };
    
  } catch (error) {
    console.log(error);
    
  }
}


export const resetPassword = async (token: string | undefined, password: string) => {
  try {
    const res = await api.post(`/reset-password/${token}`, {
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

    const res = await api.post(`/resend-otp`,{email})
    console.log('got the message from resendOtp');
    
    return res
    
  } catch (error) {
    console.log(error);
    
  }
}


export default api;
