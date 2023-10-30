import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, ViewProject, NewProject, AddItem, Homepage } from "./Container/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/newproject" element={<NewProject />} />



      </Routes>

      </BrowserRouter>
  )
}

export default App;
