import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./userReducer";
import { useDispatch } from "react-redux";

function Register() {
  const [myuser, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = async () => {
    try {
      //setError("");
      setIsSubmitting(true);
      await client.signup(myuser);
      //console.log(loggedInUser);
      // Fetch myuser information after signing up
      const loggeduser = await client.signin({
        username: myuser.username,
        password: myuser.password,
      });
      dispatch(setCurrentUser(loggeduser));
      navigate("/journey/home");
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      //if (err.response && err.response.data) {
      if (err.code === 11000) {
        setError(
          err.response.data.message ||
            "Username is already taken. Please choose a different one."
        );
      } else {
        setError("An error occurred during signup.");
      }
    }
  };
  return (
    <div className="card">
      <h4 className="card-header">Sign Up</h4>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            type="text"
            value={myuser.firstName}
            onChange={(e) => {
              setUser({
                ...myuser,
                firstName: e.target.value,
              });
            }}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={myuser.lastName}
            onChange={(e) => {
              setUser({
                ...myuser,
                lastName: e.target.value,
              });
            }}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            type="text"
            value={myuser.username}
            onChange={(e) => {
              setUser({
                ...myuser,
                username: e.target.value,
              });
            }}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={myuser.password}
            onChange={(e) => {
              setUser({
                ...myuser,
                password: e.target.value,
              });
            }}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <button
          disabled={isSubmitting}
          onClick={register}
          className="btn btn-primary"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Register
        </button>
        <Link to="/journey/login" className="btn btn-link">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Register;
