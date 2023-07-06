import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginAdmin from "./Component/View/Login/Login";
import Dashboard from "./Component/View/Dashboard/Dashboard";
import BlogPage from "./Component/View/Blog/Blog";
import DetailPage from "./Component/View/Blog/Detail";
import ArsipPage from "./Component/View/Dashboard/Arsip";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login-admin" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<BlogPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/arsip" element={<ArsipPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
