import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./users/client";
import { setCurrentUser } from "./users/userReducer";
import Account from "./users/account"; // Import the Account component

function Profile() {
  // Access the currentUser from the Redux store
  const { currentUser } = useSelector((state) => state.userReducer);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const updateUser = async () => {
    const status = await client.updateUser(currentUser._id, user);
    dispatch(setCurrentUser(user));
  };
  const saveInitialUser = () => {
    setUser(currentUser);
  };

  useEffect(() => {
    saveInitialUser();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h4>Profile</h4>
          {/* <span>{currentUser.firstName}</span> */}
        </div>
      </div>

      <div className="card-body">
        {/* Display JSON representation of currentUser */}
        {user && (
          <div>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <label className="col-sm-10 col-form-label">
                {user.username}
              </label>
            </div>
            <div className="mb-3 row">
              <label htmlFor="role" className="col-sm-2 col-form-label">
                Role
              </label>
              <label className="col-sm-10 col-form-label">{user.role}</label>
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
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <button onClick={updateUser} className="btn btn-primary px-5 mx-2">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
