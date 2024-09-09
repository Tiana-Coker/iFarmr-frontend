import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";
import Signup from './routes/signup/signup';
import VerifyEmail from './routes/emailConfirmation/EmailConfirmation';
import Login from './routes/login/login';
import MainUserDashboard from './routes/userdashboard/MainUserDashboard';
import { LoadingProvider } from './components/globalSpinner/LoadingContext';
import { AuthProvider } from './AuthContext';


export default function App() {
  return (
    <AuthProvider>
    <LoadingProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

      <Route path="user/dashboard" element={<MainUserDashboard />} />
    </Routes>
    </LoadingProvider>
    </AuthProvider>
  );
}