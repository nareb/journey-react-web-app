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

  // Retrieve statusList from local storage on component mount
  useEffect(() => {
    const storedStatusList = JSON.parse(localStorage.getItem("statusList")) || [];
    storedStatusList.forEach((status) => {
      dispatch(addStatus(status));
    });
  }, [dispatch]);


  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const postStatus = () => {
    // Update Redux store with the new status
    dispatch(addStatus({ user: currentUser, status }));

    // Save the updated statusList to local storage
    const updatedStatusList = [...statusList, { user: currentUser, status }];
    localStorage.setItem("statusList", JSON.stringify(updatedStatusList));

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
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
            <h4>Home</h4>
            {currentUser && (
              <button onClick={signout} className="btn btn-danger btn-sm">
                Sign out
              </button>
            )}
          </div>
        
        <div className="card-body">
            <h1 className="mb-4">Welcome {currentUser ? currentUser.username : "New user"}</h1>

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
