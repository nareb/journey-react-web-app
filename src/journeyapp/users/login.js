import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

function Login() {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateCredentials = (username, password) => {
    if (!username || !password) throw error({ response: { data: "username" } });
  };
  const login = async () => {
    try {
      setIsSubmitting(true);
      validateCredentials(username, password);
      const credentials = { username: username, password: password };
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/journey/home");
      setIsSubmitting(false);
    } catch (err) {
      if (err.response && err.response.data) {
        // if (err.code === 11000) {
        setError(err.response.data);
        //setError(err.response.data.message || "Login error");
      } else {
        setError("An error occurred during login.");
      }
      setIsSubmitting(false);
    }
  };
  return (
    <div className="card">
      <h4 className="card-header">Login</h4>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        </div>
        <button
          disabled={isSubmitting}
          onClick={login}
          className="btn btn-primary"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Login
        </button>
        <Link to="/journey/register" className="btn btn-link">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
