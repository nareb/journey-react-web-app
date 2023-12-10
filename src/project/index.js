import Home from "./home";
//import Login from "./login";
//import Profile from "./profile";
import Dashboard from "./Dashboard";
import Page1 from "./Page1";
import Courses from "./Courses";
import Search from "./search";
import Details from "./details";
import Profile from "./profile";
import { Routes, Route} from "react-router-dom";
//import { Routes, Route, Link } from "react-router-dom";
//import { useState } from "react";
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
                <Route path="/home" element={<Dashboard/>} />
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