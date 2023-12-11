import Home from "./home";
//import Login from "./login";
//import Profile from "./profile";
import Dashboard from "./Dashboard";
import Page1 from "./Page1";
import Courses from "./Courses";
import Search from "./search";
import Details from "./details";
import Profile from "./profile";
import db from "./Database";
//import { Routes, Route} from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import UserList from "./users/list";
import UserTable from "./users/table";
import UserDetails from "./users/details";
import SignIn from "./users/signin";
import Signup from "./users/signup";
import Account from "./users/account";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./nav";
import CurrentUser from "./users/currentUser";

function Project() {
  //const [key, setKey] = useState("home");
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
            return c;
        }
      })
    );
  };

  return (
    //<Provider store={store}>
      //<CurrentUser>
        <div className="container-fluid">
          <h1>Project</h1>
          <div className="row">
            <div className="col-2">
              <Navigation />
            </div>

            <div className="col-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                } />
                <Route path="/home" element={<Home/>} />
                
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:search" element={<Search />} />
                <Route path="/details/:albumId" element={<Details />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/admin/users" element={<UserTable />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="Courses/:courseId/*" element={<Courses />} />
                <Route path="/details" element={<Dashboard/>}/>
                
          />
              </Routes>
            </div>
            
          </div>
        </div>
      //</CurrentUser>
    //</Provider>
  );
}

export default Project;