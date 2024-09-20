import Sidebar from '../components/admin/sidebar/Sidebar'; // Adjusted path
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

      {/* Main content area */}
      <div className="flex-grow p-8 ">
        {/* Outlet will render the main content pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
