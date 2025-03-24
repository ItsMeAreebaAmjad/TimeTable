import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenerateTable = () => {
  const [session, setSession] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({ session: '', department: '', semester: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSessionChange = (e) => {
    setSession(e.target.value);
    if (step === 1) setErrors((prev) => ({ ...prev, session: '' }));
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    if (step === 2) setErrors((prev) => ({ ...prev, department: '' }));
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    if (step === 3) setErrors((prev) => ({ ...prev, semester: '' }));
  };

  const handleNext = () => {
    let hasError = false;
    if (step === 1 && !session) {
      setErrors((prev) => ({ ...prev, session: 'Enter Session' }));
      hasError = true;
    }
    if (step === 2 && !department) {
      setErrors((prev) => ({ ...prev, department: 'Enter Department' }));
      hasError = true;
    }
    if (step === 3 && !semester) {
      setErrors((prev) => ({ ...prev, semester: 'Enter Semester' }));
      hasError = true;
    }
    if (hasError) return;

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSave = async () => {
    try {
      // First check if the entry already exists
      const checkResponse = await axios.get('http://localhost:5000/api/timetable/check', {
        params: { session, department, semester },
      });
  
      if (checkResponse.data.exists) {
        setPopupMessage('Info already saved');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/timetablepage');
        }, 3000); 
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/timetable/add', {
        session,
        department,
        semester,
        coursename: null, 
        professorName: null,
        classroom: null,
        duration: null,
      });
  
      if (response.status === 200) {
        setPopupMessage('Your information has been saved');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/timetablepage'); 
        }, 3000); 
      }
    } catch (error) {
      console.error('Failed to save timetable entry:', error);
      alert('Failed to save timetable entry. Please try again.');
    }
  };
  
  return (
    <div className="p-6 relative">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Generate Time Table of Your Choice</h1>
      
      {step === 1 && (
        <div className="mb-6">
          <label htmlFor="session" className="block text-xl font-medium text-gray-700 mb-2">
            Enter Session
          </label>
          <input
            type="text"
            id="session"
            value={session}
            onChange={handleSessionChange}
            placeholder="e.g., Fall 2021, Spring 2022"
            className={`w-full p-3 border rounded ${errors.session ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.session && <p className="text-red-500 text-sm mt-2">{errors.session}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="mb-6">
          <label htmlFor="department" className="block text-xl font-medium text-gray-700 mb-2">
            Enter Department
          </label>
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            className={`w-full p-3 border rounded ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="" disabled>Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            {/* <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Business Administration">Business Administration</option> */}
            {/* Add more departments as needed */}
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-2">{errors.department}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="mb-6">
          <label htmlFor="semester" className="block text-xl font-medium text-gray-700 mb-2">
            Enter Semester
          </label>
          <select
            id="semester"
            value={semester}
            onChange={handleSemesterChange}
            className={`w-full p-3 border rounded ${errors.semester ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="" disabled>Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
          </select>
          {errors.semester && <p className="text-red-500 text-sm mt-2">{errors.semester}</p>}
        </div>
      )}

      {step === 4 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Your Information</h2>
          <div className="bg-white p-6 border border-gray-300 rounded">
            <p className="mb-2"><strong>Session:</strong> {session}</p>
            <p className="mb-2"><strong>Department:</strong> {department}</p>
            <p className="mb-2"><strong>Semester:</strong> {semester}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4 transform transition-transform duration-300 scale-90">
            <p className="text-lg font-medium text-gray-800">{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateTable;
