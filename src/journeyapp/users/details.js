import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import * as lovesClient from "../loves/client";
import * as movieClient from "../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as followsClient from "../follows/client";
function UserDetails() {
  const [user, setUser] = useState(null);
  const [loves, setLoves] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  const fetchLoves = async () => {
    const loves = await lovesClient.findMoviesThatUserLoves(id);
    let rec = [];
    for (let i = 0; i < loves.length; i++) {
      let love = loves[i];
      let movie = await movieClient.findMovieById(love.movieId);
      love = { ...love, ...movie };
      rec = [...rec, love];
      //   console.log(love);
    }
    setLoves(rec);
  };

  const navigate = useNavigate();
  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
  };

  const updateUser = async () => {
    const status = await client.updateUser(id, user);
    //const status = await client.updateFirstName(id, user.firstName);
  };

  const deleteUser = async (id) => {
    const status = await client.deleteUserById(id);
    navigate("/journey/users");
  };

  const followUser = async () => {
    const status = await followsClient.userFollowsUser(id);
    fetchFollowers();
  };

  const unfollowUser = async () => {
    const status = await followsClient.userUnfollowsUser(id);
    fetchFollowers();
  };

  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };

  const fetchFollowing = async () => {
    const following = await followsClient.findFollowedUsersByUser(id);
    setFollowing(following);
  };
  // const fetchCurrentUser = async () => {
  //   const user = await client.account();
  //   setCurrentUser(user);
  // };
  const alreadyFollowing = () => {
    return followers.some((follows) => {
      return follows.follower._id === currentUser._id;
    });
  };

  const goToLogin = () => {
    navigate("/journey/login");
  };

  useEffect(() => {
    fetchUser();
    fetchLoves();
    fetchFollowers();
    fetchFollowing();
    // fetchCurrentUser();
  }, [id]);

  return (
    <div>
      {!currentUser ? (
        goToLogin()
      ) : (
        <>
          {currentUser._id !== id && (
            <>
              {alreadyFollowing() ? (
                <button
                  onClick={unfollowUser}
                  className="btn btn-danger float-end"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={followUser}
                  className="btn btn-warning float-end"
                >
                  Follow
                </button>
              )}
            </>
          )}

          <h2>User Details</h2>
          {user && currentUser.role === "ADMIN" && (
            <div>
              <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={user.username}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">
                  First Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    value={user.firstName || ""}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">
                  Last Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    value={user.lastName || ""}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={user.email || ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="role" className="col-sm-2 col-form-label">
                  Role
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                  </select>
                </div>
              </div>
              <button
                onClick={updateUser}
                className="btn btn-primary px-5 mx-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="btn btn-danger px-5 mx-2"
              >
                Delete
              </button>
            </div>
          )}
          {user && currentUser.role !== "ADMIN" && (
            <>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              {id === currentUser._id && (
              <>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </>
              )}
            </>
          )}

          <h3>Loves</h3>
          <ul className="list-group">
            {loves.map((love, index) => (
              <li key={index} className="list-inline-item">
              <Link to={`/journey/movie/details/${love.movieId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${love.poster_path}`}
                  alt={love.title}
                  className="rounded mx-auto d-block"
                  title={love.title}
                  height="150px"
                />
                {/* <h5 className="text-center">{love.title}</h5> */}
              </Link>
            </li>
            ))}
          </ul>

          <h3>Followers</h3>
          <div className="list-group">
            {followers.map((follows, index) => (
              <Link
                key={index}
                className="list-group-item"
                to={`/journey/users/${follows.follower._id}`}
              >
                <span>
                  {follows.follower.firstName} {follows.follower.lastName} (@
                  {follows.follower.username})
                </span>
              </Link>
            ))}
          </div>
          
          <h3>Following</h3>
          <div className="list-group">
            {following.map((follows, index) => (
              <Link
                key={index}
                className="list-group-item"
                to={`/journey/users/${follows.followed._id}`}
              >
                <span>
                  {follows.followed.firstName} {follows.followed.lastName} (@
                  {follows.followed.username})
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
