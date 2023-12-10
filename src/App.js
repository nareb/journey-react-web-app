//import logo from './logo.svg';
import "./App.css";
import { HashRouter } from "react-router-dom";
//import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Project from "./project";
import Journey from "./journeyapp"

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="journey" />} />
          <Route path="/project/*" element={<Project />} />
          <Route path="/journey/*" element={<Journey />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
