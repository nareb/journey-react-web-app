import { Link } from "react-router-dom";
import db from "../Database";
function Page1() {
  const courses = db.courses;
  return (
    <div>
      <h1>Welcome Home</h1>
      <div className="list-group">
        {courses.map((course) => (
          <Link key={course._id} to={`/Project/Details/${course._id}`} className="list-group-item">
            {course.name}
          </Link>
))} </div>
</div>
); }
export default Page1;