import Sidebar from '../components/admin/sidebar/Sidebar'; // Adjusted path
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import NotificationModal from '../components/modals/NotificationModal';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleNotificationModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} toggleNotificationModal={toggleNotificationModal}/>
      {isNotificationModalOpen && (
        <NotificationModal onClose={toggleNotificationModal} />
      )}

      {/* Main content area */}
      <div className="flex-grow p-8 ">
        {/* Outlet will render the main content pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
