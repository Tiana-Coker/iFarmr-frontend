import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";
import MainUserDashboard from './routes/userdashboard/MainUserDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/userdashboard" element={<MainUserDashboard />} />
    </Routes>
  );
}
