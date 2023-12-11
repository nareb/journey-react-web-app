import React from "react";
import { useSelector } from "react-redux";
import Account from "./users/account"; // Import the Account component

function Profile() {
  // Access the currentUser from the Redux store
  const { currentUser } = useSelector((state) => state.userReducer);

  return (
          <div className="card">
            <div className="card-header">
              <h4>Welcome, {currentUser.username}!</h4>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>Email:</h5>
                  <p>Email: {currentUser.email}</p>
                </div>

                <div className="col-md-6">
                  <h5>Account</h5>
                  <p>Username: {currentUser.username}</p>
                  {/* Add other account details here */}
                </div>
              </div>

              {/* Display JSON representation of currentUser */}
              <div className="mt-4">
                <h5>User Details</h5>
                <div classname = "row">
                  {Object.entries(currentUser).map(([key, value]) => (
                    <div key={key} className="card md-6">
                      
                        <div className="card-body">
                          <p>
                            <strong>{key}</strong>: {value}
                          </p>
                        </div>
                      
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Account />
      </div>
    </div>
  );
}

export default Profile;