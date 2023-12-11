import { React, useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";

function Dashboard() {
  //const courses = db.courses;
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
  
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });

  const addNewCourse = () => {
    setCourses([...courses,
    { ...course,
    _id: new Date().getTime() }]);
  };

  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  return (
    <div>
      <h1>Welcome Home</h1>
      <hr />
      <h3>Evergreen Top {courses.length}</h3>

      <h5>Course</h5>
      <input value={course.name} className="form-control" 
        onChange={(e) => setCourse({ ...course, name: e.target.value }) }
      />
      <input value={course.number} className="form-control" 
        onChange={(e) => setCourse({ ...course, name: e.target.value }) }
      />
      <input value={course.startDate} className="form-control" type="date" 
        onChange={(e) => setCourse({ ...course, name: e.target.value }) }
      />
      <input value={course.endDate} className="form-control" type="date" 
        onChange={(e) => setCourse({ ...course, name: e.target.value }) }
      />

      <button onClick={addNewCourse} >
        Add
      </button>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {courses.map((course, index) => (
          <div className="col" key={course._id}>
          <div className="card h-100">
            <img src="music.png" className="card-img-top" alt="..." />
            <div className="card-body">

          <Link key={course._id} to={`/Project/Courses/${course._id}`} className="list-group-item">
            <button
              onClick={(event) => {
              event.preventDefault();
              setCourse(course);
              }}>
              Edit
            </button>
          
          <button
            onClick={(event) => {
            
            event.preventDefault();
            deleteCourse(course._id);
          }}>
              Delete
          </button>
            
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