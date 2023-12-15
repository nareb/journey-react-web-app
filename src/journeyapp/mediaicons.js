import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as lovesClient from "./loves/client";

function MediaIcons() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [loves, setLoves] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();

  // const fetchUsersWhoLoveThisMovie = async () => {
  //   const loves = await lovesClient.findUsersThatLoveMovie(movieId);
  //   setLoves(loves);
  // };
  const fetchLoves = async () => {
    const loves = await lovesClient.findMoviesThatUserLoves(currentUser._id);
    setLoves(loves);
    console.log("user liked movies: " + JSON.stringify(loves));
  };
  const checkUserLovesThisMovie = () => {
    return loves.some((movie) => {
      return movie.movieId === movieId;
    });
  };
  const userLovesMovie = async () => {
    const _loves = await lovesClient.createUserLovesMovie(
      currentUser._id,
      movieId
    );
    setLoves([_loves, ...loves]);
  };
  const userDontLoveMovie = async () => {
    const status = await lovesClient.deleteUserLovesMovie(
      currentUser._id,
      movieId
    );
    if (status.acknowledged) {
      fetchLoves();
    }
  };

  const currentUserLovesMovie = async () => {
    if (!currentUser) {
      navigate("/journey/login");
      return;
    }
    const alreadyLoves = checkUserLovesThisMovie();
    if (!alreadyLoves) {
      userLovesMovie();
    } else {
      userDontLoveMovie();
    }
  };
  useEffect(() => {
    fetchLoves();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-link float-end"
        title="Love"
        style={{ color: checkUserLovesThisMovie() ? "red" : "#A9A9A9" }}
        onClick={currentUserLovesMovie}
      >
        <FaHeart />
      </button>
      <button
        type="button"
        className="btn btn-link float-end"
        title="Watched"
        style={{ color: "#A9A9A9" }}
      >
        <FaEye />
      </button>
      <button
        type="button"
        className="btn btn-link float-end"
        title="A₫d to watch list"
        style={{ color: "#A9A9A9" }}
        // onMouseOver={(e) => {
        //   e.target.style.color = "blue";
        // }}
        // onMouseOut={(e) => {
        //   e.target.style.color = "#A9A9A9";
        // }}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default MediaIcons;
