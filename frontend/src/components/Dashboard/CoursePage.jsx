import React, { useState } from 'react';

const departments = [
  'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Software Engineering', 'Business Administration', 'Mathematics'
];

const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

const coursesData = {
  'Computer Science': {
    'Semester 1': [
      { code: 'CS-161', name: 'Programming Fundamental', credits: [3, 1] },
      { code: 'CS-102', name: 'Introduction to Computing', credits: [3, 1] },
      { code: 'HU-102', name: 'Functional English', credits: [3, 0] },
      { code: 'MA-123', name: 'Calculus', credits: [3, 0] },
      { code: 'PHY-111', name: 'Applied Physics', credits: [2, 1] },
      { code: 'ME-100L', name: 'Workshop Practice', credits: [0, 1] },
    ],
    'Semester 2': [
      { code: 'CS-162', name: 'Object Oriented Programming', credits: [3, 1] },
      { code: 'CMPE-222', name: 'Digital Logic Design', credits: [3, 1] },
      { code: 'HU-240', name: 'Psychology', credits: [3, 0] },
      { code: 'HU-111L', name: 'Communication Skills(Lab)', credits: [0, 1] },
      { code: 'MA-224', name: 'Multi-Variate Calculus', credits: [3, 0] },
      { code: 'MA-343', name: 'Applied Probability & Statistics', credits: [3, 0] },
      { code: 'QT-101', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 3': [
      { code: 'CS-261', name: 'Data Structures and Algorithms', credits: [3, 1] },
      { code: 'HU-221', name: 'Technical writing and Presentation skills', credits: [3, 0] },
      { code: 'CS-271', name: 'Computer Organization and Assembly Language', credits: [3, 1] },
      { code: 'MA-234', name: 'Linear Algebra', credits: [3, 0] },
      { code: 'CS-261', name: 'Discrete Mathematics', credits: [3, 0] },
    ],
    'Semester 4': [
      { code: 'CS-262', name: 'Database Systems', credits: [3, 1] },
      { code: 'CS-263', name: 'Operating Systems', credits: [3, 1] },
      { code: 'MA-228', name: 'Differential Equations', credits: [3, 0] },
      { code: 'CS-272', name: 'Design and Analysis of Algorithm', credits: [3, 0] },
      { code: 'CS-273', name: 'Theory of Automata', credits: [3, 0] },
      { code: 'QT-201', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 5': [
      { code: 'CS-364', name: 'Information Security', credits: [3, 0] },
      { code: 'CS-371', name: 'Artificial Intelligence', credits: [3, 1] },
      { code: 'CS-301', name: 'Professional Practices in Software Development', credits: [3, 0] },
      { code: 'CS-39x', name: 'Computer Science Elective-1', credits: [3, 0] },
      { code: 'CS-165', name: 'Software Engineering', credits: [3, 1] },
    ],
    'Semester 6': [
      { code: 'CS-373', name: 'Computer Networks', credits: [3, 1] },
      { code: 'CS-39x', name: 'Computer Science Elective-2', credits: [3, 0] },
      { code: 'CS-39x', name: 'Computer Science Elective-3', credits: [3, 0] },
      { code: 'CS-380', name: 'Graph Theory', credits: [3, 0] },
      { code: 'CS-372', name: 'Parallel and Distributed Computing', credits: [3, 0] },
      { code: 'QT-301', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 7': [
      { code: 'CS-465', name: 'Final Year Project-I', credits: [0, 3] },
      { code: 'CS-471', name: 'Compiler Construction', credits: [3, 1] },
      { code: 'CS-49x', name: 'Computer Science Elective-4', credits: [3, 0] },
      { code: 'IS-101', name: 'Islamic & Pakistan Studies-I', credits: [3, 0] },
      { code: 'CS-49x', name: 'Computer Science Elective-4', credits: [3, 0] },
    ],
    'Semester 8': [
      { code: 'CS-466', name: 'Final Year Project-II', credits: [0, 3] },
      { code: 'MGT-414', name: 'Entrepeneurship & Business Management', credits: [3, 0] },
      { code: 'IS-201', name: 'Islamic & Pakistan Studies-II', credits: [3, 0] },
      { code: 'HU-XXX', name: 'International Language', credits: [0, 0] },
      { code: 'MGT-424', name: 'Leadership Strategies', credits: [3, 0] },
      { code: 'QT-401', name: 'Translation of Holy Quran', credits: [3, 0] },
    ],
  },
  'Software Engineering': {
    'Semester 1': [
      { code: 'CS-161', name: 'Programming Fundamental', credits: [3, 1] },
      { code: 'CS-102', name: 'Introduction to Computing', credits: [3, 1] },
      { code: 'HU-102', name: 'Functional English', credits: [3, 0] },
      { code: 'MA-123', name: 'Calculus', credits: [3, 0] },
      { code: 'PHY-111', name: 'Applied Physics', credits: [2, 1] },
      { code: 'ME-100L', name: 'Workshop Practice', credits: [0, 1] },
    ],
    'Semester 2': [
      { code: 'CS-162', name: 'Object Oriented Programming', credits: [3, 1] },
      { code: 'IS-101', name: 'Islamic and Pak Studies-I', credits: [3, 0] },
      { code: 'CS-163', name: 'Discrete Mathematical Structure', credits: [3, 0] },
      { code: 'CS-165', name: 'Software Engineering', credits: [3, 1] },
      { code: 'MA-116', name: 'Linear Algebra and Differential Equation', credits: [3, 0] },
      { code: 'QT-101', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 3': [
      { code: 'CS-261', name: 'Data Structures and Algorithms', credits: [3, 1] },
      { code: 'SE-221', name: 'Introduction to Human Computer Interaction', credits: [3, 0] },
      { code: 'SE-211', name: 'Software Requirement Engineering', credits: [3, 0] },
      { code: 'MA-343', name: 'Applied Probability and Statistics', credits: [3, 0] },
      { code: 'HU-111L', name: 'Communication Skills Lab', credits: [0, 1] },
      { code: 'QT-201', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 4': [
      { code: 'CS-263', name: 'Operating Systems', credits: [3, 1] },
      { code: 'CS-262', name: 'Database Systems', credits: [3, 1] },
      { code: 'SE-222', name: 'Software Design & Architecture', credits: [2, 1] },
      { code: 'HU-240', name: 'Psychology', credits: [2, 0] },
      { code: 'IS-201', name: 'Islamic and Pak Studies-II', credits: [3, 0] },
      { code: 'MGT-103', name: 'Sociology for Engineering', credits: [2, 0] },
    ],
    'Semester 5': [
      { code: 'CS-364', name: 'Information Security', credits: [3, 0] },
      { code: 'CS-301', name: 'Professional Practices in Software Development', credits: [3, 0] },
      { code: 'SE-325', name: 'Formal Methods in Software Engineering', credits: [3, 0] },
      { code: 'CS-381', name: 'Compiler Construction', credits: [3, 0] },
      { code: 'SE-333', name: 'Software Quality Engineering', credits: [3, 0] },
      { code: 'QT-301', name: 'Translation of Holy Quran', credits: [1, 0] },
    ],
    'Semester 6': [
      { code: 'CS-372', name: 'Parallel and Distributed Computing', credits: [3, 1] },
      { code: 'CS-373', name: 'Computer Networks', credits: [3, 1] },
      { code: 'SE-326', name: 'Software Project Management', credits: [3, 0] },
      { code: 'SE-328', name: 'Software Construction & Development', credits: [2, 1] },
      { code: 'CS-351', name: 'Artificial Intelligence', credits: [3, 0] },
      { code: 'SE-XXX', name: 'Software Engineering Elective-I', credits: [3, 0] },
    ],
    'Semester 7': [
      { code: 'SE-401', name: 'Final Year Project-I', credits: [0, 3] },
      { code: 'SE-407', name: 'Software Re-Engineering', credits: [3, 0] },
      { code: 'SE-405', name: 'Software Testing and Quality Assurance', credits: [2, 1] },
      { code: 'SE-XXX', name: 'Software Engineering Elective-II', credits: [3, 0] },
      { code: 'SE-XXX', name: 'Software Engineering Elective-III', credits: [3, 0] },
    ],
    'Semester 8': [
      { code: 'SE-402', name: 'Final Year Project-II', credits: [0, 3] },
      { code: 'SE-417', name: 'Entrepreneurship', credits: [3, 0] },
      { code: 'MGT-418', name: 'Engineering Management', credits: [3, 0] },
      { code: 'SE-XXX', name: 'Software Engineering Elective-IV', credits: [3, 0] },
      { code: 'SE-XXX', name: 'Software Engineering Elective-V', credits: [3, 0] },
    ],
  },
 
};

const CoursePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedSemester('');
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Information</h1>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Department:</label>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">--Select Department--</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Semester:</label>
        <select
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="border border-gray-300 p-2 rounded w-full"
          disabled={!selectedDepartment}
        >
          <option value="">--Select Semester--</option>
          {semesters.map((semester, index) => (
            <option key={index} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedDepartment && selectedSemester && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Course Code</th>
                <th className="py-2 px-4 border-b">Course Name</th>
                <th className="py-2 px-4 border-b">Credits (Theory, Lab)</th>
              </tr>
            </thead>
            <tbody>
              {coursesData[selectedDepartment][selectedSemester].map((course, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{course.code}</td>
                  <td className="py-2 px-4 border-b">{course.name}</td>
                  <td className="py-2 px-4 border-b">{course.credits.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
