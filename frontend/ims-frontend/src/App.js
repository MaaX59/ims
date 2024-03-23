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
  Log,
  ManageIMS,
  SellSingleItem,
  ConnectCompany,
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
        <Route path="/connect_company" element={<ConnectCompany />} />
        <Route path="/new_company_project" element={<NewCompanyProject />} />
        <Route
          path="/company_project_page/:id"
          element={<CompanyProjectPage />}
        />
        <Route path="/sales" element={<SellItems />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/log" element={<Log />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory/:id" element={<Inventory />} />
        <Route path="/manage" element={<ManageIMS />} />
        <Route path="/sales/:id" element={<SellSingleItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
