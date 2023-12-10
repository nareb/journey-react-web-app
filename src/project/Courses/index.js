import db from "../Database";
import { useLocation, Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";

function Courses() {
  const { courseId } = useParams();
  const {pathname} = useLocation();
  const [, , , , screen] = pathname.split("/");
  const course = db.courses.find((course) => course._id === courseId);
  return (
    <div>
      <h1>{course.name} / {screen}</h1>
      <CourseNavigation />
      <div>
          <div
            className="overflow-y-scroll position-fixed bottom-0 end-0"
            style={{
              left: "320px",
            top: "50px",
            }}
          >
            <Routes>
                <Route path="Modules" element={<h1>Modules</h1>} />
            </Routes>
          </div>
      </div>

    </div>
  ); 
}
export default Courses;