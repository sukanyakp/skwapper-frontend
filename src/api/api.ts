import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/user',
  withCredentials: true
});

export const signup  = async(email : string , password : string)=>{
  try {
    const res = await api.post('/signup', { email, password });
    console.log('signup successful', res.data); 
} catch (error) {
    console.error(error); 
}

}

export default api;
