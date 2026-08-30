import axiosService from "../api/axiosService";

// User APIs
export const saveUserAPI = async (userDetails) => {
  return await axiosService("POST", "/users", userDetails);
};

export const getUserAPI = async (username) => {
  return await axiosService("GET", `/users?username=${encodeURIComponent(username)}`);
};

export const deleteUserAPI = async (id) => {
  return await axiosService("DELETE", `/users/${id}`);
};

// Game APIs
export const getUserGamesAPI = async (userId) => {
  return await axiosService("GET", `/games?userId=${userId}`);
};

export const getGameAPI = async (id) => {
  return await axiosService("GET", `/games/${id}`);
};

export const getAllGamesAPI = async () => {
  return await axiosService("GET", "/games");
};

export const saveGameAPI = async (gameDetails) => {
  return await axiosService("POST", "/games", gameDetails);
};

export const changeStatusAPI = async (id, gameDetails) => {
  return await axiosService("PUT", `/games/${id}`, gameDetails);
};

export const deleteGameAPI = async (id) => {
  return await axiosService("DELETE", `/games/${id}`);
};

// Memory APIs
export const getUserMemoriesAPI = async (userId) => {
  return await axiosService("GET", `/memories?userId=${userId}`);
};

export const getGameMemoriesAPI = async (gameId) => {
  return await axiosService("GET", `/memories?gameId=${gameId}`);
};

export const getAllMemoriesAPI = async () => {
  return await axiosService("GET", "/memories");
};

export const saveMemoryAPI = async (memoryDetails) => {
  return await axiosService("POST", "/memories", memoryDetails);
};

export const deleteMemoryAPI = async (id) => {
  return await axiosService("DELETE", `/memories/${id}`);
};