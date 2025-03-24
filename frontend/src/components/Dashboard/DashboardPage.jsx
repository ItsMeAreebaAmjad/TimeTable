import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChalkboardTeacher, FaBook, FaUserGraduate, FaDoorOpen } from 'react-icons/fa';
import CountUp from 'react-countup';


const timeSlots = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
];

const TimetableContainer = styled.div`
  margin-top: 20px;
  background-color: #f7f9fc; /* Light grayish-blue for a professional look */
  border-radius: 8px;
  overflow: hidden; /* Prevents overflow of border-radius */
  width: 100%; /* Set width to 100% */
  height: auto; /* Auto height to accommodate content */
  margin-left: auto; /* Center the container */
  margin-right: auto; /* Center the container */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const TimetableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 5 days + time column */
  background-color: #e0f7fa; /* Light Cyan for headers */
  font-weight: bold;
`;

const TimetableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 1px solid #ddd;
`;

const TimeCell = styled.div`
  padding: 15px;
  text-align: center;
  border-right: 1px solid #ddd;
  background-color: #fff;
  position: relative; /* Position relative for absolute children */
  
  &:last-child {
    border-right: none; /* Remove the last right border */
  }

  /* Change background color to dark blue if active */
  &.active {
    background-color: #1e3a8a; /* Dark Blue (blue-900) */
    color: white; /* Change text color for contrast */
  }
`;

const DashboardPage = () => {
  const [counterKey, setCounterKey] = useState(0);
  const [activeCellIndex, setActiveCellIndex] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const boxInterval = setInterval(() => {
      setActiveCellIndex((prevIndex) => (prevIndex + 1) % (timeSlots.length * 5)); 
    }, 2000); 

    return () => clearInterval(boxInterval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-blue-900">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        The Auto Time Table Generator is an advanced scheduling tool designed to
        optimize the allocation of classes, rooms, and professors within the
        university. This system aims to streamline the process of timetable
        creation by automatically generating efficient and conflict-free
        schedules. By leveraging sophisticated algorithms, the generator takes
        into account various constraints and preferences, ensuring that the
        timetables are practical and meet the needs of both students and faculty
        members.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-200 p-6 rounded shadow-lg flex items-center justify-between h-40 cursor-pointer">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Lecture Rooms</h2>
            <p className="text-2xl font-bold text-gray-800">
              <CountUp key={counterKey} end={100} duration={2.5} />
            </p>
          </div>
          <FaDoorOpen className="text-blue-500" size={40} />
        </div>
        <div className="bg-green-200 p-6 rounded shadow-lg flex items-center justify-between h-40 cursor-pointer">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
            <p className="text-2xl font-bold text-gray-800">
              <CountUp key={counterKey + 1} end={120} duration={2.5} />
            </p>
          </div>
          <FaBook className="text-green-500" size={40} />
        </div>
        <div className="bg-red-200 p-6 rounded shadow-lg flex items-center justify-between h-40 cursor-pointer">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Professors</h2>
            <p className="text-2xl font-bold text-gray-800">
              <CountUp key={counterKey + 2} end={50} duration={2.5} />
            </p>
          </div>
          <FaChalkboardTeacher className="text-red-500" size={40} />
        </div>
        <div className="bg-purple-200 p-6 rounded shadow-lg flex items-center justify-between h-40 cursor-pointer">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Classes</h2>
            <p className="text-2xl font-bold text-gray-800">
              <CountUp key={counterKey + 3} end={200} duration={2.5} />
            </p>
          </div>
          <FaUserGraduate className="text-purple-500" size={40} />
        </div>
      </div>

      <TimetableContainer>
        <TimetableHeader>
          <TimeCell>Time</TimeCell>
          <TimeCell>Monday</TimeCell>
          <TimeCell>Tuesday</TimeCell>
          <TimeCell>Wednesday</TimeCell>
          <TimeCell>Thursday</TimeCell>
          <TimeCell>Friday</TimeCell>
        </TimetableHeader>
        
        {timeSlots.map((time, rowIndex) => (
          <TimetableRow key={rowIndex}>
            <TimeCell>{time}</TimeCell>
            <TimeCell className={activeCellIndex === rowIndex * 5 ? 'active' : ''}>
              {activeCellIndex === rowIndex * 5 && " "}
            </TimeCell>
            <TimeCell className={activeCellIndex === rowIndex * 5 + 1 ? 'active' : ''}>
              {activeCellIndex === rowIndex * 5 + 1 && " "}
            </TimeCell>
            <TimeCell className={activeCellIndex === rowIndex * 5 + 2 ? 'active' : ''}>
              {activeCellIndex === rowIndex * 5 + 2 && " "}
            </TimeCell>
            <TimeCell className={activeCellIndex === rowIndex * 5 + 3 ? 'active' : ''}>
              {activeCellIndex === rowIndex * 5 + 3 && " "}
            </TimeCell>
            <TimeCell className={activeCellIndex === rowIndex * 5 + 4 ? 'active' : ''}>
              {activeCellIndex === rowIndex * 5 + 4 && " "}
            </TimeCell>
          </TimetableRow>
        ))}
      </TimetableContainer>
    </div>
  );
};

export default DashboardPage;
