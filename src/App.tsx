import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";
import Signup from './routes/signup/signup';
import VerifyEmail from './components/emailConfirmation/EmailConfirmation';
import Login from './routes/login/login';
import MainUserDashboard from './routes/userdashboard/MainUserDashboard';
import { LoadingProvider } from './context/globalSpinner/LoadingContext';
import { AuthProvider } from './context/authContext/AuthContext';
import UploadSection from './components/createAPost/UploadSection';
import ViewPost from './components/viewPost/viewPost';
import { NotificationProvider } from './context/notificationContext/Notification';



export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
    <LoadingProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<UploadSection/>}></Route>
        <Route path="/view-post" element={<ViewPost/>} />

      <Route path="user/dashboard" element={<MainUserDashboard />} />


    </Routes>
    </LoadingProvider>
    </NotificationProvider>
    </AuthProvider>

  );
}