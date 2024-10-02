// Unauthorized.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'; // Custom styles

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>Oops! You don't have permission to access this page.</p>
        <div className="illustration">
          <img src="/images/lock.svg" alt="Unauthorized Access" />
        </div>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
