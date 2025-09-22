import axios from "axios";

const API_URl = "http://localhost:3001"
const axiosApi = axios.create({
    baseURL:API_URl
})

const user = JSON.parse(localStorage.getItem("user"));
axiosApi.defaults.headers.common['Authorization'] = user?.accessToken;

axiosApi.interceptors.response.use(
    (response)=> response,
    (error)=>{
        console.log("error",error)
        return Promise.reject(error)
    }
)

export async function apiGET(url,config={}){
    const user = JSON.parse(localStorage.getItem("user"))
    const accessToken = user?.accessToken;
    axiosApi.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`
    return await axiosApi
    .get(url,{...config})
    .then((response)=>response)
    .catch((error)=>error.response)
    
}

export async function apiPOST(url,config={}){
    const user = JSON.parse(localStorage.getItem("user"))
    const accessToken = user?.token;
    axiosApi.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`
    return await axiosApi
    .post(url,{...config})
    .then((response)=>response)
    .catch((error)=>error.response)
    
}

export async function apiPUT(url,config={}){
    const user = JSON.parse(localStorage.getItem("user"))
    const accessToken = user?.accessToken;
    axiosApi.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`
    return await axiosApi
    .put(url,{...config})
    .then((response)=>response)
    .catch((error)=>error.response)   
}

export async function apiDELETE(url,config={}){
    const user = JSON.parse(localStorage.getItem("user"))
    const accessToken =  user?.accessToken;
    axiosApi.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`
    return await axiosApi
    .delete(url,{...config})
    .then((response)=>response)
    .catch((error)=>error.response)
}