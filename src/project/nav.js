import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function Nav() {
  const { pathname } = useLocation();
  const links = [
    { to: "/project/home", label: "Home" },
    { to: "/project/search", label: "Search" },
    { to: "/project/details", label: "Details" },
    //{ to: "/project/dashboard", label: "Dashboard" },

    {to: "/project/courses", label: "Courses"},
    { to: "/project/profile", label: "Profile" },
    { to: "/project/signin", label: "Signin" },
    { to: "/project/account", label: "Account" },
    { to: "/project/signup", label: "Signup" },
    
    
    //{ to: "/project/admin", label: "Admin" },
    //{ to: "/project/courses", label: "Courses" },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  return (
    <div className="list-group">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`list-group-item ${active(link.to)}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default Nav;

/*
function Navigation() {
  const { currentUser } = useSelector((state) => state.userReducer);
  //const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="list-group">
        <Link to="/project/" className="list-group-item">
          Home
        </Link>
        {!currentUser && (
          <>
            <Link to="/project/signin" className="list-group-item">
              Signin
            </Link>
            <Link to="/project/signup" className="list-group-item">
              Signup
            </Link>
          </>
        )}
        {currentUser && (
          <Link to="/project/account" className="list-group-item">
            Account
          </Link>
        )}
        <Link to="/project/search" className="list-group-item">
          Search
        </Link>
        <Link to="/project/users" className="list-group-item">
          Users
        </Link>
        {/* <Link to="/project/details" className="list-group-item">
        Details
        </Link> }
      </div>
    </>
  );
}

export default Navigation;
*/


