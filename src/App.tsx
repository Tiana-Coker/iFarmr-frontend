
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";
import Signup from './routes/signup/signup';
import VerifyEmail from './routes/emailConfirmation/EmailConfirmation';
import Login from './routes/login/login';
import UserDashboard from './routes/user/dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
