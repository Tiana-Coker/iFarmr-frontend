import React from 'react'; // Explicitly import React
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import MainUserDashboard from './components/dashboard/userdashboard/MainUserDashboard';
import './App.css';

export default function App() {
  return (
    <div>
      <MainUserDashboard />
    </div>
  );
}
