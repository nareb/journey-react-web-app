import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const USERS_API = `${API_BASE}/users`;
const LOVES_API = `${API_BASE}/loves`;

export const findAllLoves = async () => {
  const response = await axios.get(LOVES_API);
  return response.data;
};

export const createUserLovesMovie = async (userId, movieId) => {
  const response = await axios.post(`${USERS_API}/${userId}/loves/${movieId}`);
  return response.data;
};

export const deleteUserLovesMovie = async (userId, movieId) => {
  const response = await axios.delete(
    `${USERS_API}/${userId}/loves/${movieId}`
  );
  return response.data;
};

export const findUsersThatLoveMovie = async (movieId) => {
  const response = await axios.get(`${LOVES_API}/${movieId}/users`);
  return response.data;
};

export const findMoviesThatUserLoves = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/loves`);
  return response.data;
};
