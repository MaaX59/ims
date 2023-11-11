import "./App.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ViewProject, NewProject, AddItem, Homepage, ProjectPage } from "./Container/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/viewproject" element={<ViewProject />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/test" element={<ProjectPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
