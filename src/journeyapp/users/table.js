import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  BsFillCheckCircleFill,
  BsPencil,
  BsTrash3Fill,
  BsPlusCircleFill,
  BsArrowRight,
} from "react-icons/bs";
import * as client from "./client";
import { FaArrowAltCircleRight } from "react-icons/fa";

function UserTable() {
  //const [role, setRole] = useState("USER");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
    firstName: "",
    lastName: "",
  });

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);

      // Reset the user state after successful creation
      setUser({
        username: "",
        password: "",
        role: "USER",
        firstName: "",
        lastName: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      //const status = await client.updateUser(user);
      await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h4>User List</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                {/* <th>Password</th> */}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td className="text-nowrap">
                    <Link
                      key={user._id}
                      to={`/journey/users/${user._id}`}
                      className="list-group-item"
                    >
                      <FaArrowAltCircleRight className="text-success fs-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
