import { Routes, Route } from "react-router-dom";
import Nav from "./nav";
import Home from "./home";
import Profile from "./profile";
//import Details from "./movie/details";
import Login from "./users/login";
import Register from "./users/register";
import Search from "./search";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import CurrentUser from "./users/currentUser";
import JDetails from "./details";
import UserTable from "./users/table";
import MovieSearch from "./movieSearch";
import MovieDetails from "./details";
import UserDetails from "./users/details";

function Journey() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <div className="container-fluid">
          <h1>Journey</h1>
          <div className="row">
            <div className="col-md-2 col-xs-12">
              <Nav />
            </div>
            <div className="col-md-10 col-xs-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:search" element={<Search />} />
                <Route path="/moviesearch" element={<MovieSearch />} />
                <Route path="/moviesearch/:search" element={<MovieSearch />} />
                <Route path="/users" element={<UserTable />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/movie/details/:movieId" element={<JDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Journey;
