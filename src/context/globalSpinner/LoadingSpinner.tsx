import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white bg-opacity-80 z-50">
      <div className="w-12 h-12 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
