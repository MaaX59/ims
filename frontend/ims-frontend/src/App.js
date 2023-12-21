import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ViewProject,
  NewProject,
  ProjectPage,
  Start,
  Login,
} from "./Container/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/viewproject" element={<ViewProject />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
