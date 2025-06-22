import axiosInstance from "./axios-instance";


export const registerTutor = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post("/tutor/apply", formData);
    return res; // return full axios response (with .status)
  } catch (error: any) {
    throw error; // throw so error handling works in the calling function
  }
};




export const checkApplicationStatus = async ()=>{
  try {

    const res = await axiosInstance.get("/tutor/apply-status")
    console.log(res.data.status, 'res.data.status at api');
    
    return res
    
  } catch (error) {
    console.log(error);
    
  }
}

export const checkTutorStatus = async() => {
  const res =  await axiosInstance.get("/tutor/status");
  console.log(res.data.status,'ressss');
  
  return ({status : res.status , data : res.data})
};