import { Link, useLocation } from "react-router-dom";
function ProjectNavigation() {
  const links = ["Home", "Profile", "Search", "Details"];
  const { pathname } = useLocation();
  return (
    <div className="list-group" style={{ width: 150 }}>
      {links.map((link, index) => (
<Link
          key={index}
          to={`/Project/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}>
          {link}
</Link>
))} </div>
); }
export default ProjectNavigation;