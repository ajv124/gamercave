import axiosService from "../api/axiosService";

export const saveUserAPI = async (userDetails)=>{
    return await axiosService("POST","/users",userDetails)
}

export const getUserAPI = async (username)=>{
    return await axiosService("GET",`/users?username=${username}`,{})
}

export const deleteUserAPI = async(id)=>{
    return await axiosService("DELETE",`/users/${id}`,{})
}

export const deleteUserGamesAPI = async(id)=>{
    return await axiosService("DELETE",`/games?userId=${id}`,{})
}

export const deleteUserMemoriesAPI = async(id)=>{
    return await axiosService("DELETE",`/memories?userId=${id}`,{})
}

export const getAllGamesAPI = async()=>{
    return await axiosService("GET",`/games`,{})
}
export const getAllMemoriesAPI = async()=>{
    return await axiosService("GET",`/memories`,{})
}