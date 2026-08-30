import axiosService from "../api/axiosService";

export const saveUserAPI = async (userDetails) => {
  return await axiosService("POST", "/users", userDetails);
};

export const getUserAPI = async (username) => {
  return await axiosService("GET", `/users?username=${username}`, {});
};

export const deleteUserAPI = async (id) => {
  return await axiosService("DELETE", `/users/${id}`, {});
};

export const getUserGamesAPI = async (userId) => {
  return await axiosService("GET", `/games?userId=${userId}`, {});
};

export const deleteGameAPI = async (id) => {
  return await axiosService("DELETE", `/games/${id}`, {});
};

export const getGameAPI = async (id) => {
  return await axiosService("GET", `/games/${id}`);
};

export const getAllGamesAPI = async () => {
  return await axiosService("GET", `/games`, {});
};

export const saveGameAPI = async (gameDetails) => {
  return await axiosService("POST", "/games", gameDetails);
};

export const changeStatusAPI = async (id, gameDetails) => {
  return await axiosService("PUT", `/games/${id}`, gameDetails);
};

export const getUserMemoriesAPI = async (userId) => {
  return await axiosService("GET", `/memories?userId=${userId}`, {});
};

export const deleteMemoryAPI = async (id) => {
  return await axiosService("DELETE", `/memories/${id}`, {});
};

export const getAllMemoriesAPI = async () => {
  return await axiosService("GET", `/memories`, {});
};

