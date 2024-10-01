import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, email }) => {
  // Prevent the modal from rendering if it's not open
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Email Verification</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700 mb-6">
          <p>
            Your Password Reset Link has been sent to <strong>{email}</strong>.
          </p>
          <p>The link leads to your change of password screen.</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body // The modal will be rendered as a child of the <body> tag
  );
};

export default Modal;
