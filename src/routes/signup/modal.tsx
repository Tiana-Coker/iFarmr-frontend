import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#204E51] hover:bg-opacity-90 text-white py-2 px-4 rounded-md focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
