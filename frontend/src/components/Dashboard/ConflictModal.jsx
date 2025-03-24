import React from "react";
import Modal from "react-modal";

const ConflictModal = ({ isOpen, onRequestClose, conflicts }) => {
  // Separate conflicts into class and professor conflicts
  const classConflicts = conflicts.filter(conflict => conflict.type === 'Class Conflict');
  const professorConflicts = conflicts.filter(conflict => conflict.type === 'Teacher Conflict');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Conflict Alert"
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          width: '600px',
          height: '500px',
          border: '2px solid #ff4d4d',
          backgroundColor: '#ffe6e6',
        },
      }}
    >
      <h2 className="text-center font-bold text-xl text-red-700 mb-4">
        Clash of Classes
      </h2>

      {/* Class Conflicts List */}
      <div className="mb-4 h-40 overflow-y-auto border border-red-200 rounded-md p-2 bg-red-50">
        {classConflicts.length > 0 ? (
          <ul className="list-none p-0 space-y-2">
            {classConflicts.map((conflict, index) => (
              <li
                key={index}
                className="p-3 bg-red-100 rounded-md shadow-sm"
              >
                <strong>{conflict.className}</strong> on <strong>{conflict.day}</strong> from <strong>{conflict.startTime} - {conflict.endTime}</strong> is already allocated to <strong>{conflict.professor}</strong> for <strong>{conflict.course}</strong> of <strong>{conflict.semester}</strong> semester.
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-600">No class conflicts found.</p>
        )}
      </div>

      <h2 className="text-center font-bold text-xl text-red-700 mb-4">
        Clash of Professors
      </h2>

      {/* Professor Conflicts List */}
      <div className="mb-4 h-40 overflow-y-auto border border-red-200 rounded-md p-2 bg-red-50">
        {professorConflicts.length > 0 ? (
          <ul className="list-none p-0 space-y-2">
            {professorConflicts.map((conflict, index) => (
              <li
                key={index}
                className="p-3 bg-red-100 rounded-md shadow-sm"
              >
                <strong>{conflict.professor}</strong> is already assigned to <strong>{conflict.className}</strong> on <strong>{conflict.day}</strong> from <strong>{conflict.startTime} - {conflict.endTime}</strong> for <strong>{conflict.course}</strong> of <strong>{conflict.semester}</strong> semester.
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-600">No professor conflicts found.</p>
        )}
      </div>

      {/* Close Button */}
      <div className="text-center">
        <button
          onClick={onRequestClose}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ConflictModal;
