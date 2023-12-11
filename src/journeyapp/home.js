import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./users/userReducer";
import { current } from "@reduxjs/toolkit";
import * as client from "./users/client";
import { useNavigate } from "react-router";

function Home() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(""); // New state for user status

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const postStatus = () => {
    // Implement the logic to post the status
    console.log("Posted status:", status);

    // Clear the status input field after posting
    setStatus("");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/journey/login");
  };

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
          <h1>Welcome {currentUser ? currentUser.username : "New user"}</h1>

            {/* User status input */}
            {currentUser && (
              <>
                <textarea
                  value={status}
                  onChange={handleStatusChange}
                  placeholder="What's on your mind?"
                />
                <button onClick={postStatus}>Post Status</button>
              </>
            )}


          
        </div>
      </div>
    </div>
  );
}

export default Home;
