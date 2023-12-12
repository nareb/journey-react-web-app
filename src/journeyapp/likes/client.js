import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const USERS_API = `${API_BASE}/users`;
const LIKES_API = `${API_BASE}/likes`;

export const findAllLikes = async () => {
  const response = await axios.get(LIKES_API);
  return response.data;
};

export const createUserLikesMovie = async (userId, movieId) => {
  const response = await axios.post(`${USERS_API}/${userId}/likes/${movieId}`);
  return response.data;
};

export const deleteUserLikesMovie = async (userId, movieId) => {
  await axios.delete(`${USERS_API}/${userId}/likes/${movieId}`);
};

export const findUsersThatLikeMovie = async (movieId) => {
  const response = await axios.get(`${LIKES_API}/${movieId}/users`);
  return response.data;
};

export const findMoviesThatUserLikes = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};