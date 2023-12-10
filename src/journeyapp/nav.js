import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaInfoCircle,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";

function Nav() {
  const { pathname } = useLocation();
  const links = [
    { to: "/journey/home", icon: "home", label: "Home" },
    { to: "/journey/profile", icon: "profile", label: "Profile" },
    { to: "/journey/details", icon: "details", label: "Details" },
    { to: "/journey/login", icon: "login", label: "Login" },
    { to: "/journey/search", icon: "search", label: "Search" },
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
          {link.icon == "home" ? (
            <FaHome />
          ) : link.icon == "profile" ? (
            <FaUserCircle />
          ) : link.icon == "details" ? (
            <FaInfoCircle />
          ) : link.icon == "login" ? (
            <FaSignInAlt />
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
