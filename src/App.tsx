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
import PostPage from './components/postPage/PostPage';

import Inventory from './routes/user/inventory/Inventory';
import CurrentInventory from './routes/user/current-inventory/CurrentInventory';


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
            <Route path="/view-post" element={<ViewPost/>} />
                {/* Post Details Page */}
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="user/dashboard" element={<MainUserDashboard />} />
            <Route path="/user/inventory" element={<Inventory />} />
            <Route path="/user/inventory/:id" element={<CurrentInventory />} />

            {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="user-database" element={<UserDatabase />} />
                  <Route path="user-analytics" element={<UserAnalytics />} />
                </Route>
          </Route> 


          </Routes>
        </LoadingProvider>
     </NotificationProvider>
    </AuthProvider>


  );
}