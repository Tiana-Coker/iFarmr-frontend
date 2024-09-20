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
import AdminLayout from './layouts/AdminLayout';
import UserDatabase from './routes/admin/UserDatabase';
import UserAnalytics from './routes/admin/UserAnaytics';
import ProtectedRoute from './utils/ProtectedRoute';
 import AdminDashboard from './components/dashboard/adminDashboard/AdminDashboard';

import Inventory from './routes/user/inventory/Inventory';


export default function App() {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <LoadingProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post" element={<UploadSection/>}></Route>
              <Route path="/user/dashboard" element={<MainUserDashboard />} />
            </Routes>
          </LoadingProvider>
      </NotificationProvider>
      </AuthProvider>

      <Routes>
        <Route path="/user/inventory" element={<Inventory />} />
      </Routes>
    </>

  );
}