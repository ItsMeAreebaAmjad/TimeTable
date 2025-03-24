import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './index.css'; 
import TimeTablePage from './components/Dashboard/TimeTablePage';
import PreviewTimetable from './components/Dashboard/PreviewTimetable';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timetablepage" element={<TimeTablePage />} />
        <Route path="/preview-timetable" element={<PreviewTimetable />} />

       
      </Routes>
    </Router>
  );
}

export default App;
