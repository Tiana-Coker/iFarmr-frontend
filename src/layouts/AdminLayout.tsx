import Sidebar from '../components/admin/sidebar/Sidebar'; 
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow p-8 ">
        {/* Outlet will render the nested routes (the main content pages) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
