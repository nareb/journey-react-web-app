import { Link } from "react-router-dom";
import db from "../Database";

function Dashboard() {
  const courses = db.courses;

  return (
    <div>
      <h1>Welcome Home</h1>
      <hr />
      <h3>Evergreen Top {courses.length}</h3>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {courses.map((course, index) => (
          <div className="col" key={course._id}>
          <div className="card h-100">
            <img src="music.png" className="card-img-top" alt="..." />
            <div className="card-body">


          <Link key={course._id} to={`/Project/Courses/${course._id}`} className="list-group-item">
            {course.name}
          </Link>
          <p className="card-text">
                <h6 className="card-title">{course.number}</h6>
                  December 2023
                </p>
                </div>
            </div>
          </div>


))} </div>
</div>
); }
export default Dashboard;