import React, { useState } from 'react';
import noProfileImage from '../../../public/images/no-profile.jpg';

const ProfessorsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science");

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const computerScienceProfessors = [
    { name: 'Prof.Dr.Hafiz Muhammad Shahzad Asif', title: 'Chairman', email: 'shehzad@uet.edu.pk' },
    { name: 'Dr.Umar Qasim', title: 'Associate Professor', email: 'umar.qasim@uet.edu.pk' },
    { name: 'Dr.Farah Adeeba', title: 'Assistant Professor', email: 'farah.adeeba@uet.edu.pk' },
    { name: 'Dr.Irfan Yousaf', title: 'Assistant Professor', email: 'irfan.yousuf@uet.edu.pk' },
    { name: 'Dr.Qurat-ul-Ain', title: 'Assistant Professor', email: 'ainie.akram@uet.edu.pk' },
    { name: 'Ms.Alina Munir', title: 'Lecturer', email: 'alina.munir@uet.edu.pk' },
    { name: 'Hafiz Muhammad Danish', title: 'Lecturer', email: 'danish@uet.edu.pk' },
    { name: 'Mr.Nadeem Iqbal', title: 'Lecturer', email: 'niqbal@uet.edu.pk' },
    { name: 'Mr.Aizaz Akmal', title: 'Lecturer', email: 'aizaz.akmal@uet.edu.pk' },
    { name: 'Ms.Anam Iftikhar', title: 'Lecturer', email: 'anamiftikhar@uet.edu.pk' },
    { name: 'Ms.Darakhshan Bokhat', title: 'Lecturer', email: 'drakhshan@uet.edu.pk' },
    { name: 'Mr.Zeeshan Ramzan', title: 'Lecturer', email: 'zramzan@uet.edu.pk' },
    { name: 'Ms.Namra Sheikh', title: 'Lecturer', email: 'namra.sheikh@uet.edu.pk' },
    { name: 'Mr.Usman Ghani', title: 'Lecturer', email: 'u.ghani@uet.edu.pk' },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Professors List</h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="p-3 border border-gray-300 rounded-md shadow-sm w-full text-gray-700 focus:outline-none focus:border-blue-500 max-w-screen-lg"
        >
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Biomedical Engineering">Biomedical Engineering</option>
          <option value="Management Sciences">Management Sciences</option>
          <option value="Basic Sciences">Basic Sciences</option>
        </select>
      </div>

      {selectedDepartment === "Computer Science" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {computerScienceProfessors.map((professor, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              {/* Profile image */}
              <img
                src={noProfileImage}
                alt="No profile"
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />

              {/* Professor Details */}
              <h2 className="text-xl font-semibold text-blue-900 text-center">{professor.name}</h2>
              <p className="text-gray-600 text-sm text-center">{professor.title}</p>
              <p className="text-gray-500 text-sm text-center">{professor.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl mt-8">
          Professor list will be displayed here
        </div>
      )}
    </div>
  );
};

export default ProfessorsPage;
