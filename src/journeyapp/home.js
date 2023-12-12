import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, addStatus } from "./users/userReducer";
import { current } from "@reduxjs/toolkit";
import * as client from "./users/client";
import { useNavigate } from "react-router";

function Home() {
  const { currentUser, statusList } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(""); // New state for user status
  //const [newStatus, setNewStatus] = useState(null); // New state for individual status

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const postStatus = async () => {
    try {
      // Call backend API to post the status
      const response = await fetch(`/api/users/${currentUser._id}/post-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to post status");
      }

      // Update Redux store with the new status
      const updatedStatus = await response.json();


      dispatch(addStatus(updatedStatus));

      // Clear the status input field after posting
      setStatus("");
    } catch (error) {
      console.error("Error posting status:", error);
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/journey/login");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
            <h4>Welcome Home {currentUser ? currentUser.firstName : "New user"}!</h4>
            {currentUser && (
              <button onClick={signout} className="btn btn-danger btn-sm">
                Sign out
              </button>
            )}
          </div>
        
        <div className="card-body">
            

              {/* User status input */}
              {currentUser && (
                <div className="mb-4">
                  <textarea
                    value={status}
                    onChange={handleStatusChange}
                    className="form-control"
                    placeholder="What's on your mind?"
                    rows="3"
                  />

                  <button onClick={postStatus} className="btn btn-primary mt-2">
                    Post Status
                  </button>
                </div>
              )}

              {/* Display user statuses */}
              {statusList.slice().reverse().map((userStatus, index) => (
                <div key={index} className="mt-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>{userStatus?.user?.username}:</strong> 
                      </h5>
                      <p className="card-text">{userStatus?.status}</p>
                    </div>
                  </div>
                </div>
              ))}          
        </div>
      </div>
    </div>
  );
}

export default Home;
