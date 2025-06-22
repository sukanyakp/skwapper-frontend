import axiosInstance from "./axios-instance";



//Request interceptor
// export const registerAdmin = async( name :string , email : string , password : string )=>{
//     try {

//         console.log('hello registerAdmin ');
        
//         const res = await axiosInstance.post('/auth/register' ,{name,email,password}) // admin : role
//         console.log('body ',res);

//         return ({status : res.status ,data : res.data})
        
        
//     } catch (error) {
//         console.log(error); 
//     }

// }

// export const loginAdmin = async(email : string , password : string)=>{
//     try {
//         const res = await axiosInstance.post('/auth/login',{email,password})
//         localStorage.setItem('acccessToken' ,res.data.token)
//         return({status : res.status , data : res.data})

//     } catch (error) {
//         console.log(error);  
//     }
// }


export const fetchTutors = ()=>{
    try {

        return axiosInstance.get('/admin/tutors')
        
    } catch (error) {
        console.log(error);
        
    }
}