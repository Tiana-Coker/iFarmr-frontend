import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'; 
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";
import Signup from './routes/signup/signup';
import VerifyEmail from './components/emailConfirmation/EmailConfirmation';
import Login from './routes/login/login';
import Logout from './routes/logout/logout';
import ForgotPassword from './routes/forgotPassword/forgotPassword';
import ResetPassword from './routes/resetPassword/resetPassword';
import MainUserDashboard from './routes/userdashboard/MainUserDashboard';
import { LoadingProvider } from './context/globalSpinner/LoadingContext';
import { AuthProvider, useAuth } from './context/authContext/AuthContext'; // Import useAuth
import UploadSection from './components/createAPost/UploadSection';
import ViewPost from './components/viewPost/viewPost';
import { NotificationProvider, useNotification } from './context/notificationContext/Notification';
import AdminLayout from './layouts/AdminLayout';
import UserDatabase from './routes/admin/UserDatabase';
import UserAnalytics from './routes/admin/UserAnaytics';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminDashboard from './components/dashboard/adminDashboard/AdminDashboard';
import PostPage from './components/postPage/PostPage';
import Inventory from './routes/user/inventory/Inventory';
import CurrentInventory from './routes/user/current-inventory/CurrentInventory';
import Unauthorized from './routes/unauthorized/unauthorized'; 

import LivestockManagement from './components/livestockPage/LivestockManagement';
import { listenForMessages } from './utils/firebase'; // Import listenForMessages
import { requestFirebaseToken } from './utils/firebase';

const App: React.FC = () => {
  const { showNotification } = useNotification();
  const { firebaseToken, userRole, setFirebaseToken } = useAuth(); // Access firebaseToken, userRole, and setFirebaseToken

  useEffect(() => {
    listenForMessages(showNotification);
  }, [showNotification]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!firebaseToken && userRole) {
        const newFirebaseToken = await requestFirebaseToken();
        if (newFirebaseToken) {
          setFirebaseToken(newFirebaseToken); // Save the new Firebase token
          console.log('Firebase token set after retry:', newFirebaseToken);
        }
      }
    }, 120000); // Run every 2 minutes (120,000 ms)

    return () => clearInterval(intervalId); // Clean up the interval when component unmounts
  }, [firebaseToken, userRole, setFirebaseToken]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route path="/post" element={<UploadSection />} />
        <Route path="/view-post" element={<ViewPost />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/user/dashboard" element={<MainUserDashboard />} />
        <Route path="/user/inventory" element={<Inventory />} />
        <Route path="/user/inventory/:id" element={<CurrentInventory />} />
      </Route>
        <Route path='livestock-management' element={<LivestockManagement/>}/>


      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-database" element={<UserDatabase />} />
          <Route path="user-analytics" element={<UserAnalytics />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default () => (
  <AuthProvider>
    <NotificationProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </NotificationProvider>
  </AuthProvider>
);
