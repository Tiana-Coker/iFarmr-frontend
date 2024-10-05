import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Prevent the modal from rendering if it's not open
  if (!isOpen) return null;

  // Function to handle navigation to the login page
  const handleGoToLogin = () => {
    onClose(); // Close the modal first
    navigate('/login'); // Navigate to the login page
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Password Reset</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700 mb-6">
          <p>Your Password has been changed successfully.</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg"
            onClick={handleGoToLogin} // Use the handleGoToLogin function
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>,
    document.body // The modal will be rendered as a child of the <body> tag
  );
};

export default Modal;
