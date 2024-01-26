import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ViewProject,
  NewProject,
  ProjectPage,
  Start,
  Login,
  Createuser,
  ViewUser,
  CreateCompany,
  NewCompanyProject,
  CompanyProjectPage,
  SellItems,
  Dashboard,
  Inventory,
  Purchases,
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
        <Route path="/create-user" element={<Createuser />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/create_company" element={<CreateCompany />} />
        <Route path="/new_company_project" element={<NewCompanyProject />} />
        <Route
          path="/company_project_page/:id"
          element={<CompanyProjectPage />}
        />
        <Route path="/sales" element={<SellItems />} />
        <Route path="/purchases" element={<Purchases />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory/:id" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
