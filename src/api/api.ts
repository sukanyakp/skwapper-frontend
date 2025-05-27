import axios from 'axios';
import { data } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000/user',
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
    console.log(res);
    return ({status : res.status , data : res.data})
  } catch (error) {
    console.log(error);
  }
}


export const login = async(formData : object) =>{
  try {

    const res = await api.post(`/login`,{formData})
    console.log(res);
    return ({status : res.status, data : res.data})
    
  } catch (error) {
    console.log(error);
    
  }
}

export default api;
