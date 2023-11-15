import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ViewProject,
  NewProject,
  ProjectPage,
} from "./Container/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewProject />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
