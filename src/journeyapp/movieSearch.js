import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

function MovieSearch() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "batman");
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  //   const fetchAlbums = async (search) => {
  //     const results = await client.findAlbums(search);
  //     setResults(results);
  //     setSearchTerm(search);
  //     setIsSearching(false);
  //   };
  const fetchMovies = async (search) => {
    const results = await client.findMovies(search);
    setResults(results);
    setSearchTerm(search);
    setIsSearching(false);
  };

  const viewdetails = (id) => {
    navigate(`/journey/movie/details/${id}`);
  };
  const formatDate = (string) => {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  useEffect(() => {
    if (search) {
      setResults(null);
      setIsSearching(true);
      //fetchAlbums(search);
      fetchMovies(search);
    }
  }, [search]);

  return (
    <div className="card">
      <h4 className="card-header">Movie Search</h4>
      <div className="card-body">
        <div className="row">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon"
              onClick={() => navigate(`/journey/moviesearch/${searchTerm}`)}
            >
              Search
            </button>
          </div>
        </div>
        {isSearching && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {results && (
          <div className="row">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Poster</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((movie, index) => (
                    <tr>
                      <td>{movie.title}</td>
                      <td>{movie.release_date}</td>
                      <td>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}
                          height="50px"
                        />
                      </td>
                      <td>
                        <button
                          title="View Details"
                          onClick={() => viewdetails(movie.id)}
                          className="btn btn-outline-primary"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          title="Like"
                        >
                          <FaThumbsUp />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
