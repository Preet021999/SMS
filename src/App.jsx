import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
// import Employeemaster from "./components/Menu/Employeemaster.jsx";
import AttendanceManagement from "./components/AttendanceManagement.jsx";
import StudentManagement from "./components/StudentManagement.jsx";
import ResultGeneration from "./components/ResultGeneration.jsx";
import CircularManagement from "./components/CircularManagement.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* All other routes are children of Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-management" element={<StudentManagement/>} />
          <Route path="/attendance-management" element={<AttendanceManagement />} />
          <Route path="/result-generation" element={<ResultGeneration/>}/>
          <Route path="/circular-management" element={<CircularManagement/>} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};
export default App;