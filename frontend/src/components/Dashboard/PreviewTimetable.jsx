import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import universityLogo from "../../../public/images/Logo.png";
import html2pdf from "html2pdf.js";

const PreviewTimetable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { timeTable, department = "[Department Name]", session = "[Session]", semester = "[Semester]" } = state || {};
  const timetableRef = useRef();

  // Function to download the timetable as PDF
  const handleDownload = () => {
    const element = timetableRef.current;
    const opt = {
      margin: 0.5,
      filename: 'timetable.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Convert the timetable element to PDF and trigger download
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="relative p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/timetablepage')}
        className="absolute top-6 left-6 bg-gray-800 text-white py-2 px-4 rounded shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      >
        Back to Timetable
      </button>

    
      <button
        onClick={handleDownload}
        className="absolute top-6 right-6 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        Download
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Timetable Preview</h1>
      
      <div ref={timetableRef} className="flex">
        <div className="w-full border border-gray-300 rounded" style={{ minHeight: "80vh" }}>
          <div className="flex flex-col items-center p-4 border-b border-gray-300">
            <div className="flex items-center mb-2">
              <img src={universityLogo} alt="University Logo" className="w-28 h-auto mr-4" />
              <div>
                <h2 className="text-xl font-bold">University of Engineering and Technology New Campus</h2>
                <p className="text-lg ml-10">Department of {department} UET New Campus</p>
                <p className="text-md font-medium ml-[150px]">For Session: {session}</p>
                <p className="text-md font-medium ml-[180px]">Semester: {semester}</p>
              </div>
            </div>
            <hr className="border-gray-400 w-full mb-4" />
          </div>

          <div className="flex">
            <div className="w-1/6 bg-gray-200">
              <div className="font-semibold text-center p-3 border-b border-gray-300">Duration</div>
              {["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"].map((time, index) => (
                <div key={index} className={`border-b p-3 text-center ${time === "12:00 PM - 1:00 PM" ? "bg-gray-100" : "bg-gray-100"}`} style={{ height: "100px" }}>
                  {time}
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col">
              <div className="flex border-b border-gray-300 bg-gray-100">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                  <div key={day} className="w-1/5 border-r p-3 text-center font-semibold">{day}</div>
                ))}
              </div>
              {["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"].map((time, index) => (
                <div key={index} className={`flex border-b ${time === "12:00 PM - 1:00 PM" ? "bg-gray-300" : "bg-gray-100"}`}>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, dayIndex) => {
                    const cellKey = `${time}-${day}`;
                    const cellData = timeTable ? timeTable[cellKey] : {};
                    return (
                      <div
                        key={dayIndex}
                        className={`w-1/5 border-r p-3 text-center ${time === "12:00 PM - 1:00 PM" ? "bg-gray-300 text-black font-bold cursor-default" : "bg-gray-100"} word-wrap`}
                        style={{
                          height: "100px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          whiteSpace: "normal"
                        }}
                      >
                        {cellData ? (
                          <div style={{ fontSize: "10px", textAlign: "center" }}>
                            {cellData.course && <div><strong>Course:</strong> {cellData.course}</div>}
                            {cellData.professor && <div><strong>Professor:</strong> {cellData.professor}</div>}
                            {cellData.className && <div><strong>Class:</strong> {cellData.className}</div>}
                          </div>
                        ) : (
                          <div> </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTimetable;
