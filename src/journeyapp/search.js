import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "beatles");
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchAlbums = async (search) => {
    const results = await client.findAlbums(search);
    setResults(results);
    setSearchTerm(search);
    setIsSearching(false);
  };

  const viewdetails = (id) => {
    navigate("/journey/details/${id}");
  };
  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  useEffect(() => {
    if (search) {
      setResults(null);
      setIsSearching(true);
      fetchAlbums(search);
    }
  }, [search]);

  return (
    <div className="card">
      <h4 className="card-header">Search</h4>
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
              onClick={() => navigate(`/journey/search/${searchTerm}`)}
            >
              Search
            </button>
          </div>
        </div>
        {isSearching && (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {results && (
          <div className="row">
            <div className="table-responsive">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col">Album</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Album Cover</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((album, index) => (
                    <tr>
                      <td>{album.name}</td>
                      <td>{album.artistName}</td>
                      <td>{formatDate(album.released)}</td>
                      <td>
                        <img
                          src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/50x50.jpg`}
                          alt={album.name}
                          //height="50px"
                        />
                      </td>
                      <td>
                        <button
                          onClick={viewdetails}
                          className="btn btn-primary"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button>
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

export default Search;
