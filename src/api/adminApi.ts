import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3000/admin',
    withCredentials : true
})


export const registerAdmin = async( name :string , email : string , password : string )=>{
    try {

        console.log('hello registerAdmin ');
        
        const res = await api.post('/register' ,{name,email,password}) // admin : role
        console.log('body ',res);

        return ({status : res.status ,data : res.data})
        
        
    } catch (error) {
        console.log(error); 
    }

}

export const loginAdmin = async(email : string , password : string)=>{
    try {
        return api.post('/login',{email,password})

    } catch (error) {
        console.log(error);  
    }
}