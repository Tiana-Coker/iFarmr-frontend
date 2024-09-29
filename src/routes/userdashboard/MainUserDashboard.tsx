import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/sidebar/sidebar';
import PopularPosts from '../../components/dashboard/popularPost/PopularPost';
import Dashboard1 from '../../components/dashboard/userdashboardComponent/UserDashboard1';
import Dashboard2 from '../../components/dashboard/userdashboardComponent/UserDashboard2';
import { useAuth } from '../../context/authContext/AuthContext';

const MainUserDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();  // Get auth status from the context
  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col custom-md:flex-row h-screen">
      {/* Sidebar */}
      <div className="lg:w-1/3 w-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-grow w-full p-4 custom-md:p-6">
        <Dashboard1 />
        <Dashboard2 />
      </main>

      {/* Popular Posts */}
      <aside className="w-full custom-md:w-[calc(29.7%+10px)] bg-white p-0 custom-md:p-6">    
        <PopularPosts />
      </aside>
    </div>
  );
};

export default MainUserDashboard;
