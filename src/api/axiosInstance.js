import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"https://gamercave-server.onrender.com",
    timeout:10000
})

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("API Response received!!!")
        return response
    },
    (error)=>{
        console.log(error);
        
        if(error.response){
            console.log(error.response);
            
            const status = error.response.status
            if(status==401){
                console.log("Unauthorised Access - Redirect to Login page")
            }else if(status==404){
                console.log("API Not Found")
            }else if(status==500){
                console.log("Server Error")
            }else if(error.request){
                console.log("No response from Server")
            }else{
                console.log("Error "+ error.message)
            }
            return Promise.reject(error)
        }
    }
)

export default axiosInstance