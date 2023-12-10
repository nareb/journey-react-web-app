import { Link, useLocation } from "react-router-dom";
import { setCurrentUser } from "./users/userReducer";

import {
  FaHome,
  FaSearch,
  FaInfoCircle,
  FaSignInAlt,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import UserList from "./users/list";

function Nav() {
  const { pathname } = useLocation();
  const links = [
    { to: "/journey/home", icon: "home", label: "Home" },
    { to: "/journey/profile", icon: "profile", label: "Profile" },
    { to: "/journey/details", icon: "details", label: "Details" },
    { to: "/journey/login", icon: "login", label: "Login" },
    // { to: "/journey/search", icon: "search", label: "Search" },
    { to: "/journey/moviesearch", icon: "search", label: "Search" },
    { to: "/journey/users", icon: "users", label: "Users" },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const { currentUser } = useSelector((state) => state.userReducer);
  const someLinks = !currentUser
    ? links.filter((link) => link.label !== "Users")
    : links.filter((link) => link.label !== "Login");

  return (
    <div className="list-group">
      {someLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`list-group-item ${active(link.to)}`}
        >
          {link.icon === "home" ? (
            <FaHome />
          ) : link.icon === "profile" ? (
            <FaUserCircle />
          ) : link.icon === "details" ? (
            <FaInfoCircle />
          ) : link.icon === "login" ? (
            <FaSignInAlt />
          ) : link.icon === "users" ? (
            <FaUsers />
          ) : (
            <FaSearch />
          )}
          &nbsp;&nbsp;
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default Nav;
