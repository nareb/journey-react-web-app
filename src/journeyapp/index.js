import { Routes, Route } from "react-router-dom";
import Nav from "./nav";
import Home from "./home";
import Profile from "./profile";
import Details from "./album/details";
import Login from "./users/login";
import Register from "./users/register";
import Search from "./search";
import { Provider } from "react-redux";
import store from "./store";

function Journey() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <h1>Journey</h1>
        <div className="row">
          <div className="col-2">
            <Nav />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/details" element={<Details />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:search" element={<Search />} />
              <Route path="/album/details/:albumId" element={<Details />} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default Journey;
