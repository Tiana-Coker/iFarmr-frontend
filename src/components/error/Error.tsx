import React from 'react';
import { Link } from 'react-router-dom';
import agricultureImage from '../../../assets/dashboard/error.png'; // Replace with your agriculture image path

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform rotate-2 transition-transform hover:rotate-0 hover:shadow-xl">
        <div className="relative">
          <img
            src={agricultureImage}
            alt="Agriculture"
            className="w-full h-64 object-cover rounded-lg"
            style={{ transform: 'translateZ(10px)', transition: 'transform 0.5s' }}
          />
          <div className="absolute inset-0 bg-green-800 bg-opacity-50 flex items-center justify-center rounded-lg">
            <h1 className="text-white text-4xl font-bold">Oops! Something went wrong.</h1>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-lg">
            We encountered an issue. Please try again later or go back to the main dashboard.
          </p>
          <Link
            to="/dashboard"
            className="inline-block mt-6 bg-custom-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
