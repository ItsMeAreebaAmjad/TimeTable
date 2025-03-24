import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineLogout, AiOutlineSchedule } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { MdClass } from "react-icons/md";
import DashboardPage from "../components/Dashboard/DashboardPage";
import CoursePage from "../components/Dashboard/CoursePage";
import ClassesPage from "../components/Dashboard/ClassesPage";
import GenerateTable from "../components/Dashboard/GenerateTable";
import ProfessorsPage from "../components/Dashboard/ProfessorsPage";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <DashboardPage />;
      case "Courses":
        return <CoursePage />;
      case "Classes":
        return <ClassesPage />;
      case "Professors":
        return <ProfessorsPage />;
      case "GenerateTimetable":
        return <GenerateTable />;
      case "MyAccount":
        return (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">My Account</h1>
            <p className="mt-4 text-gray-600">Manage your account here.</p>
          </div>
        );
      case "ExitSystem":
        navigate("/");
        break;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-blue-800 text-white flex flex-col h-full overflow-y-auto z-50 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <BsFillCalendarFill className="mr-2" size={20} />
          {isSidebarOpen && <span className="font-bold text-md">Timetable Generator</span>}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { label: "Dashboard", icon: <AiOutlineDashboard size={20} /> },
            { label: "Courses", icon: <IoMdSchool size={20} /> },
            { label: "Classes", icon: <MdClass size={20} /> },
            { label: "Professors", icon: <FaChalkboardTeacher size={20} /> },
            { label: "GenerateTimetable", icon: <AiOutlineSchedule size={20} /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={`flex items-center w-full p-3 rounded-md transition ${
                activeSection === label ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              {icon}
              {isSidebarOpen && <span className="ml-3">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Exit Button */}
        <div className="mt-auto p-4">
          <button
            onClick={() => setActiveSection("ExitSystem")}
            className="flex items-center p-3 rounded-md hover:bg-blue-700 w-full"
          >
            <AiOutlineLogout size={20} />
            {isSidebarOpen && <span className="ml-3">Exit System</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 bg-blue-800 text-white p-2 rounded-full shadow-lg z-50"
        >
          ☰
        </button>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
