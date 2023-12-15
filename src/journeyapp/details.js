import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import * as userClient from "./users/client";
import * as lovesClient from "./loves/client";
import { useCallback } from "react";
import MediaIcons from "./mediaicons";

function MovieDetails() {
  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser } = useSelector((state) => state.userReducer);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loves, setLoves] = useState([]);

  const fetchMovie = async () => {
    const movie = await client.findMovieById(movieId);
    setMovie(movie);
  };
  const fetchReviews = async () => {
    const reviews = await client.findReviewsById(movieId);
    setReviews(reviews);
  };

  const fetchLoves = async () => {
    const loves = await lovesClient.findUsersThatLoveMovie(movieId);
    setLoves(loves);
  };
  const currentUserLovesMovie = async () => {
    const _loves = await lovesClient.createUserLovesMovie(
      currentUser._id,
      movieId
    );
    setLoves([_loves, ...loves]);
    fetchLoves();
  };
  const currentUserAlreadyLovesThisMovie = () => {
    return loves.some((movie) => {
      return movie.movieId === movieId && movie.user._id === currentUser._id;
    });
  };

  useEffect(() => {
    fetchMovie();
    fetchReviews();
    fetchLoves();
  }, []);

  return (
    <div className="card">
      <h4 className="card-header">{movie ? movie.title : "Movie Details"}</h4>
      <div className="card-body">
        <div>
          {movie && (
            <div>
              <div>
                {/* {currentUser && <MediaIcons />} */}
                {currentUser && !currentUserAlreadyLovesThisMovie() && (
                  <button
                    onClick={currentUserLovesMovie}
                    className="btn btn-warning float-end"
                  >
                    Love
                  </button>
                )}
                {/* {currentUser && (
                  <button
                    // onClick={}
                    className="btn btn-primary float-end"
                  >
                    Add to Watchlist
                  </button>
                )} */}
                <h1>{movie.name}</h1>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mx-auto d-block"
                  //height="50px"
                />

                <h2>Loves</h2>
                <ul className="list-group">
                  {loves.map((love, index) => (
                    <li key={index} className="list-group-item">
                      {currentUser ? (
                        <Link to={`/journey/users/${love.user._id}`}>
                          <span>
                            {love.user.firstName} {love.user.lastName} (@
                            {love.user.username})
                          </span>
                        </Link>
                      ) : (
                        <span>
                          {love.user.firstName} {love.user.lastName} (@
                          {love.user.username})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {/* <h2>Users WatchList</h2> */}
              </div>
              <h3>Overview</h3>
              {movie.overview}
              <h3>Languages</h3>
              {movie.spoken_languages
                .map((lang) => lang.english_name)
                .toString()}
              <h3>Reviews</h3>
              <ul className="list-group">
                {reviews && reviews.length > 0
                  ? reviews.map((review, index) => (
                      <li key={index} className="list-group-item">
                        <span>{review.content}</span>
                      </li>
                    ))
                  : "No Reviews"}
              </ul>
              <pre>{JSON.stringify(movie)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
