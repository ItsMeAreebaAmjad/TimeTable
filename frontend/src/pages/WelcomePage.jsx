import React from 'react';
import { Link } from 'react-router-dom';
import './css/WelcomePage.css'; 

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-blue-900">
      {/* Bubble Animation Container */}
      <div className="bubble-container">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-4 text-white bg-transparent w-full z-10">
        <div className="flex items-center">
          <img src="/images/Logo.png" alt="Logo" className="h-10 w-10 mr-2 sm:h-12 sm:w-12 md:h-14 md:w-14" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-semibold">UET NEW CAMPUS</span>
            <span className="text-xs sm:text-sm md:text-base">Time Table Generator</span>
          </div>
        </div>
        <Link to="/login">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded text-sm sm:text-base md:text-lg">
            Get Started
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Welcome to UET New Campus<br />
          <span className="typing-effect">Time Table Generator</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-8 mx-auto max-w-md sm:max-w-lg lg:max-w-screen-lg">
          Automate your scheduling with the UET New Campus Time Table Generator. Our intuitive tool simplifies the process of creating and managing schedules, ensuring efficient use of resources and seamless organization of academic activities.
        </p>
        <Link to="/dashboard">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded text-sm sm:text-base md:text-lg">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
};

export default WelcomePage;