import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./users/userReducer";
import { current } from "@reduxjs/toolkit";
import * as userClient from "./users/client";
import * as client from "./client";
import * as lovesClient from "./loves/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Home() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [trending, setTrending] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedMovieDetails, setLikedMovieDetails] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTrendingMovies = async () => {
    const trending = await client.findTrendingMovies();
    setTrending(trending);
  };

  const fetchRecentUsers = async () => {
    const allUsers = await userClient.findAllUsers();
    const users = allUsers.slice(-5).reverse();
    console.log("recent users: " + JSON.stringify(users));
    setRecentUsers(users);
  };

  const fetchMoviesUserLoves = async () => {
    const loves = await lovesClient.findMoviesThatUserLoves(currentUser._id);
    let recentLoves = loves.slice(-3).reverse();
    
    let rec =[];
    for (let i = 0; i < recentLoves.length; i++) {
      let love = recentLoves[i];
      let movie = await client.findMovieById(love.movieId);
      love = { ...love, ...movie };
      rec = [...rec, love];
    }

    // console.log("user loves: " + JSON.stringify(recentLoves));
    /*
    var movies = [];
    recentLoves.forEach(async (love) => {
      const movie = await client.findMovieById(love.movieId);
      love = { ...love, title: movie.title };
      movies = [...movies, movie];
      // movies = [...movies, movie];
      // setLikedMovieDetails(movies);
    });*/

    setLikedMovies(rec);
    //console.log("liked movies details:", JSON.stringify(movies));
  };
  /*
  const getMoviePoster = (movieId) => {
    const mov = likedMovieDetails.find((movie) => movie.movieId === movieId);
    return mov.poster_path;
    // const movie = await client.findMovieById(movieId);
    // return movie.poster_path;
  };
  */

  const signout = async () => {
    await userClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/journey/login");
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchRecentUsers();
    if (currentUser) {
      fetchMoviesUserLoves();
    }
  }, []);

  return (
    <div className="card">
      <h4 className="card-header">
        <div className="d-flex justify-content-between">
          <span>Home</span>
          {currentUser && (
            <button onClick={signout} className="btn btn-danger btn-sm">
              Sign out
            </button>
          )}
        </div>
      </h4>
      <div className="card-body">
        <div>
          <h1>
            Welcome{" "}
            {currentUser ? (
              <span>
                {currentUser.firstName} {currentUser.lastName}
              </span>
            ) : (
              "New user"
            )}
          </h1>
          {!currentUser && (
            <p>
              What is fascinating about movies is we can live the whole journey of someone else's life in 
              a few hours of time via movies. To help you narrow down your decision whose life you want to 
              live next few hours, the Search Tab in this page will facilitate you to search movies, browse
              its details, read others reviews on what they think and make your own choice to select whose journey 
              of life you want to travel without having to reborn.
              And if you like to connect with the like-minded people in this webapp,
              please <Link to={`/journey/login`}> login </Link> to like movies
              or follow other users who have similar interests in movies.
            </p>
          )}
          <h3>Recently joined users</h3>
          <ul className="list-group">
            {recentUsers.map((user, index) => (
              <li key={index} className="list-group-item">
                {currentUser ? (
                  <Link to={`/journey/users/${user._id}`}>
                    <span>
                      {user.firstName} {user.lastName} (@{user.username})
                    </span>
                  </Link>
                ) : (
                  <span>
                    {user.firstName} {user.lastName} (@{user.username})
                  </span>
                )}
              </li>
            ))}
          </ul>
          {currentUser && (
            <>
              <h3>Recently Liked Movies</h3>
              <ul className="list-group list-group-horizontal-md">
                {likedMovies && likedMovies.length > 0 ? (
                  likedMovies.map((movie, index) => (
                    <li key={index} className="list-group-item">
                      <Link to={`/journey/movie/details/${movie.movieId}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          //src={`https://image.tmdb.org/t/p/${movie.poster_path}`}
                          alt={movie.title}
                          className="rounded mx-auto d-block"
                          title={movie.title}
                          //height="250px"
                        />
                        <h5 className="text-center">{movie.title}</h5>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div>None</div>
                )}
              </ul>
            </>
          )}
          <h3>Top 3 Trending Movies</h3>
          <ul className="list-group list-group-horizontal-md">
            {trending &&
              trending.slice(0, 3).map((movie, index) => (
                <li key={index} className="list-group-item">
                  <Link to={`/journey/movie/details/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded mx-auto d-block"
                      title={movie.title}
                      //height="250px"
                    />
                    <h5 className="text-center">{movie.title}</h5>
                  </Link>
                </li>
              ))}
          </ul>
          <pre>{JSON.stringify(currentUser)}</pre>
        </div>
      </div>
    </div>
  );
}

export default Home;
