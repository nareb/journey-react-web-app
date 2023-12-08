import React, { useState, useEffect } from "react";
//import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", 
    password: "" });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUsernameAvailability = async (username) => {
    try {
      const isAvailable = await client.checkUsernameAvailability(username);
      setUsernameAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable(null);
    }
  };

  useEffect(() => {
    setUsernameAvailable(null);
  }, [credentials.username]);
  
  const signup = async () => {
    try {
      await client.signup(credentials);
      // Fetch user information after signing up
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/project/account");
    } catch (err) {
      //if (err.response && err.response.data) {
      if (err.code === 11000) {
        setError(err.response.data.message || "Username is already taken. Please choose a different one.");
      } else {
        setError("An error occurred during signup.");
      }
    }
};

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <div>{error}</div>}
      <input
        type="text"
        className={`form-control ${usernameAvailable === false ? "is-invalid" : ""}`}
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => {
          setCredentials({
          ...credentials,
          username: e.target.value 
        });
        checkUsernameAvailability(e.target.value);
        }
      } 
      />
      {usernameAvailable !== null && (
        <div className={`text-${usernameAvailable ? "success" : "danger"}`}>
          {usernameAvailable ? "Username is available" : "Username is already taken"}
        </div>
      )}

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} 
      />
      <button onClick={signup} className="btn btn-primary">
        Register
      </button>
    </div>
); }
export default Signup;