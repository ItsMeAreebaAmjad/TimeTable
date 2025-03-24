import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import universityLogo from "../../../public/images/Logo.png";
import ConflictModal from './ConflictModal';
import SuccessModal from './SuccessModal';

const TimeTablePage = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const closeModall = () => setIsModallOpen(false);

  const navigate = useNavigate();
  const [info, setInfo] = useState({
    session: "",
    department: "",
    semester: "",
  });
  const [times, setTimes] = useState([
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ]);
  const [professors, setProfessors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    professor: "",
    className: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [timeTable, setTimeTable] = useState({});

  const handlePreviewClick = () => {
    navigate("/preview-timetable", {
      state: {
        timeTable,
        department: info.department,
        session: info.session,
        semester: info.semester,
      },
    });
  };

  const handleValidateClick = () => {
    axios
      .post("http://localhost:5000/api/timetable/save-timetable", {
        department: info.department,
        session: info.session,
        semester: info.semester,
        timetable: timeTable,
      })
      .then((response) => {
        const message = response.data.message;
        if (message === "No clashes found. Timetable already saved!") {
          alert(message); // Display "No clashes found"
        } else {
          setSuccessMessage("Timetable saved successfully!");
          setIsSuccessModalOpen(true);  // Open success modal
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const { message, conflicts: conflictData } = error.response.data;
          setConflicts(conflictData);
          setIsModalOpen(true);
        } else {
          console.error("Error saving timetable:", error);
          alert("Failed to save timetable.");
        }
      });
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setConflicts([]); 
  }; 

  useEffect(() => {
    // Fetch initial data
    axios
      .get("http://localhost:5000/api/timetable/latest")
      .then((response) => {
        setInfo({
          session: response.data.session,
          department: response.data.department,
          semester: response.data.semester,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:5000/api/timetable/professors")
      .then((response) => {
        setProfessors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professors:", error);
      });

    axios
      .get("http://localhost:5000/api/timetable/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    axios
      .get("http://localhost:5000/api/timetable/courses-for-last-semester")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    // Load timetable data from local storage
    const savedTimeTable = JSON.parse(localStorage.getItem("timeTable")) || {};
    setTimeTable(savedTimeTable);
  }, []);

  const handleCellClick = (time, day) => {
    if (time !== "12:00 PM - 1:00 PM") {
      setFormData({ ...formData, time, day });
      setShowForm(true);
      setFormErrors({});
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSave = (e) => {
    e.preventDefault();
  
    if (formData.isFree) {
      // If marked as free, remove data for the cell
      const updatedTimeTable = { ...timeTable };
      delete updatedTimeTable[`${formData.time}-${formData.day}`]; // Remove the data for the cell
  
      setTimeTable(updatedTimeTable);
  
      // Save the updated timetable to local storage
      localStorage.setItem("timeTable", JSON.stringify(updatedTimeTable));
  
      handleCloseForm();
      return; 
    }
  
    // Validate the form fields
    const errors = {};
    if (!formData.course) {
      errors.course = "Course name is mandatory";
    }
    if (!formData.professor) {
      errors.professor = "Professor name is mandatory";
    }
    if (!formData.className) {
      errors.className = "Class is mandatory";
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    // Update timetable with provided data
    const newTimeTable = {
      ...timeTable,
      [`${formData.time}-${formData.day}`]: {
        course: formData.course,
        professor: formData.professor,
        className: formData.className,
      },
    };
  
    setTimeTable(newTimeTable);
  
    // Save the updated timetable to local storage
    localStorage.setItem("timeTable", JSON.stringify(newTimeTable));
  
    handleCloseForm();
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate Time Table
      </h1>

      <div className="flex">
        <div
          className="w-full border border-gray-300 rounded"
          style={{ minHeight: "80vh" }}
        >
          <div className="flex flex-col items-center p-4 border-b border-gray-300">
            <div className="flex items-center mb-2">
              <img
                src={universityLogo}
                alt="University Logo"
                className="w-28 h-auto mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">
                  University of Engineering and Technology New Campus
                </h2>
                <p className="text-lg ml-10">
                  Department of {info.department} UET New Campus
                </p>
                <p className="text-md font-medium ml-[150px]">
                  For Session: {info.session}
                </p>
                <p className="text-md font-medium ml-[180px]">
                  Semester: {info.semester}
                </p>
              </div>
            </div>
            <hr className="border-gray-400 w-full mb-4" />
          </div>
          <div className="flex">
            <div className="w-1/6 bg-gray-200">
              <div className="font-semibold text-center p-3 border-b border-gray-300">
                Duration
              </div>{" "}
              {times.map((time, index) => (
                <div
                  key={index}
                  className={`border-b p-3 text-center ${
                    time === "12:00 PM - 1:00 PM"
                      ? "bg-gray-100"
                      : "bg-gray-100"
                  }`}
                  style={{ height: "80px" }}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Time Table */}
            <div className="w-full flex flex-col">
              <div className="flex border-b border-gray-300 bg-gray-100">
                <div className="w-1/5 border-r p-3 text-center font-semibold">
                  Monday
                </div>{" "}
                <div className="w-1/5 border-r p-3 text-center font-semibold">
                  Tuesday
                </div>{" "}
                <div className="w-1/5 border-r p-3 text-center font-semibold">
                  Wednesday
                </div>{" "}
                <div className="w-1/5 border-r p-3 text-center font-semibold">
                  Thursday
                </div>{" "}
                <div className="w-1/5 p-3 text-center font-semibold">
                  Friday
                </div>{" "}
              </div>
              {times.map((time, index) => (
                <div
                  key={index}
                  className={`flex border-b ${
                    time === "12:00 PM - 1:00 PM"
                      ? "bg-gray-300"
                      : "bg-gray-100"
                  }`}
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-1/5 border-r p-3 text-center cursor-pointer ${
                          time === "12:00 PM - 1:00 PM"
                            ? "bg-gray-300 text-black font-bold cursor-default"
                            : "bg-gray-100"
                        }`}
                        onClick={() => handleCellClick(time, day)}
                        style={{
                          height: "80px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {time === "12:00 PM - 1:00 PM" ? (
                          "BREAK"
                        ) : timeTable[`${time}-${day}`] ? (
                          <div style={{ fontSize: "12px" }}>
                            <div>
                              <strong>Course:</strong>{" "}
                              {timeTable[`${time}-${day}`].course}
                            </div>
                            <div>
                              <strong>Professor:</strong>{" "}
                              {timeTable[`${time}-${day}`].professor}
                            </div>
                            <div>
                              <strong>Class:</strong>{" "}
                              {timeTable[`${time}-${day}`].className}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Form */}
{showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-xl font-bold mb-4">Add Course Details</h2>
      <form onSubmit={handleFormSave}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) =>
                setFormData({ ...formData, isFree: e.target.checked })
              }
              className="mr-2"
            />
            Mark as Free (No Lecture)
          </label>
          {formData.isFree && (
            <p className="text-green-500 italic text-sm mt-1">
              This cell will be marked as free.
            </p>
          )}
        </div>

        {!formData.isFree && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Course</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Select a course</option>
                {courses.length === 0 ? (
                  <option value="">No courses available</option>
                ) : (
                  courses.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))
                )}
              </select>
              {formErrors.course && (
                <p className="text-red-500 italic text-sm mt-1">
                  * {formErrors.course}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Professor</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.professor}
                onChange={(e) =>
                  setFormData({ ...formData, professor: e.target.value })
                }
              >
                <option value="">Select a professor</option>
                {professors.length === 0 ? (
                  <option value="">No professors available</option>
                ) : (
                  professors.map((professor) => (
                    <option key={professor.id} value={professor.name}>
                      {professor.name}
                    </option>
                  ))
                )}
              </select>
              {formErrors.professor && (
                <p className="text-red-500 italic text-sm mt-1">
                  * {formErrors.professor}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Class</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.className}
                onChange={(e) =>
                  setFormData({ ...formData, className: e.target.value })
                }
              >
                <option value="">Select a class</option>
                {classes.length === 0 ? (
                  <option value="">No classes available</option>
                ) : (
                  classes.map((cls, index) => (
                    <option key={index} value={cls.class_number}>
                      {cls.class_number} ({cls.class_type})
                    </option>
                  ))
                )}
              </select>
              {formErrors.className && (
                <p className="text-red-500 italic text-sm mt-1">
                  * {formErrors.className}
                </p>
              )}
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCloseForm}
            className="bg-gray-300 text-white p-2 rounded mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      <div className="flex justify-center mt-6">
        <button
          onClick={handleValidateClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Click here to Validate
        </button>
        <ConflictModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        conflicts={conflicts}
      />
      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        message={successMessage}
      />
        <button
          onClick={handlePreviewClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Click here to Preview
        </button>
      </div>
    </div>
  );
};

export default TimeTablePage;
