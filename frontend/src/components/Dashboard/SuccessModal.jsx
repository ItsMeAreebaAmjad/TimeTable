import React from "react";
import Modal from "react-modal";

const SuccessModal = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success"
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
          height: '200px',
          border: '2px solid #28a745',  
          backgroundColor: '#d4edda',  
        },
      }}
    >
      <h2 className="text-center font-bold text-xl text-green-700 mb-4">
        Success
      </h2>
      <p className="text-center text-green-600">{message}</p>

      <div className="text-center mt-4">
        <button
          onClick={onRequestClose}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
