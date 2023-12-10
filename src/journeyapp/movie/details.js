import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "../client";
import * as userClient from "../users/client";
//import * as likesClient from "./likes/client";
import { useCallback } from "react";

function MovieDetails() {
  const [currentUser, setCurrentUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  const fetchMovie = useCallback(async () => {
    const movie = await client.findMovieById(movieId);
    setMovie(movie);
  }, [movieId]);
  const fetchReviews = useCallback(async () => {
    const reviews = await client.findReviewsById(movieId);
    setReviews(reviews);
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [fetchMovie, fetchReviews]);

  return (
    <div className="card">
      <h4 className="card-header">{movie ? movie.title : "Movie Details"}</h4>
      <div className="card-body">
        <div>
          {movie && (
            <div>
              <div>
                {currentUser && (
                  <button
                    //onClick={currenUserLikesAlbum}
                    className="btn btn-warning float-end"
                  >
                    Like
                  </button>
                )}
                <h1>{movie.name}</h1>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mx-auto d-block"
                  //height="50px"
                />
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
