import axios from "axios";
export const NAPSTER_API = "https://api.napster.com/v2.2";
export const API_KEY = process.env.REACT_APP_NAPSTER_API_KEY;
export const TMDB_API = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const findMovies = async (searchTerm) => {
  const response = await axios.get(
    `${TMDB_API}/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};
//https://api.themoviedb.org/3/movie/52248?language=en-US&api_key=9edd42fcd0998c23c6fd5504e79db8f6
export const findMovieById = async (movieId) => {
  const response = await axios.get(
    `${TMDB_API}/movie/${movieId}?language=en-US&api_key=${TMDB_API_KEY}`
  );
  return response.data;
};
//https://api.themoviedb.org/3/movie/414906/reviews?language=en-US&api_key=9edd42fcd0998c23c6fd5504e79db8f6
export const findReviewsById = async (movieId) => {
  const response = await axios.get(
    `${TMDB_API}/movie/${movieId}/reviews?language=en-US&api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const findAlbums = async (searchTerm) => {
  const response = await axios.get(
    `${NAPSTER_API}/search?query=${searchTerm}&type=albums&apikey=${API_KEY}`
  );
  return response.data.search.data.albums;
};

export const findAlbumById = async (albumId) => {
  const response = await axios.get(
    `${NAPSTER_API}/albums/${albumId}?apikey=${API_KEY}`
  );
  return response.data.albums[0];
};

export const findTracksByAlbumId = async (albumId) => {
  const response = await axios.get(
    `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${API_KEY}`
  );
  return response.data.tracks;
};
