import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useCallback } from "react";

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = useCallback (async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
      navigate("/project/signin");
    }
  }, [navigate]);

  const updateUser = async () => {
    //const status = await client.updateUser(user._id, user);
    await client.updateUser(user._id, user);
  };
  const signout = async () => {
    //const status = await client.signout();
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/project/signin");
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return (
    <div>
      <h1>Account</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <button onClick={updateUser} className="btn btn-primary">
            Update
          </button>

          <button onClick={signout} className="btn btn-danger">
            Sign Out
          </button>
          {user.role === "ADMIN" && (

            <Link to="/project/admin/users" className="btn btn-warning">
            Users
            </Link>

          )}
        </div>
      )}
    </div>
  );
}

export default Account;