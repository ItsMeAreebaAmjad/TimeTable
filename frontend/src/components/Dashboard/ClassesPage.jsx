import React, { useState } from 'react';

const ClassesPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science'); 

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const classes = [
    { room: 'G-5', type: 'Computer Lab-I', capacity: 50 },
    { room: 'G-6', type: 'Computer Lab-II', capacity: 50 },
    { room: 'G-18', type: 'Computer Lab-III', capacity: 50 },
    { room: 'G-19', type: 'Computer Lab-IV', capacity: 50 },
    { room: 'G-20', type: 'Computer Lab-V', capacity: 50 },
    { room: 'G-7', type: 'FYP-Lab', capacity: 50 },
    { room: 'F-17', type: 'Lecture Hall', capacity: 50 },
    { room: 'G-10', type: 'Classroom', capacity: 50 },
    { room: 'G-16', type: 'Classroom', capacity: 50 },
    { room: 'G-11', type: 'Classroom', capacity: 50 },
    { room: 'F-04', type: 'Classroom', capacity: 50 },
    { room: 'F-05', type: 'Classroom', capacity: 50 },
    { room: 'F-08', type: 'Classroom', capacity: 50 },
    { room: 'F-09', type: 'Classroom', capacity: 50 },
    { room: 'F-13', type: 'Classroom', capacity: 50 },
    { room: 'F-14', type: 'Classroom', capacity: 50 },
    { room: 'F-15', type: 'Classroom', capacity: 50 },
    { room: 'F-16', type: 'Classroom', capacity: 50 },
  ];
  const departmentClasses = {
    'Computer Science': classes,
    'Electrical Engineering': [],
    'Mechanical Engineering': [], 
    'Civil Engineering': [], 
    'Chemical Engineering': [], 
    'Software Engineering': classes, 
    'Business Administration': [], 
    'Mathematics': [],
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Total Classes of Campus</h1>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-700">Select Department</h2>

        {/* Department Dropdown */}
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="w-64 p-3 pr-8 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-150"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
        {selectedDepartment === 'Computer Science' || selectedDepartment === 'Software Engineering' ? (
          classes.length === 0 ? (
            <p className="text-gray-600 text-center">No classes available.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-4 text-left text-sm font-semibold">Room Number</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Room Type</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.room} className="hover:bg-blue-50">
                    <td className="py-3 px-4 border-b border-gray-200">{cls.room}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{cls.type}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{cls.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p className="text-gray-600 text-center">Classes data will be entered here.</p>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
