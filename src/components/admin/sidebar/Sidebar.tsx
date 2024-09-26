import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'; 
import { FaBars, FaTimes } from 'react-icons/fa'; 
import farmerIcon from '../../../assets/signupImages/f-logo.svg';
import gridIcon from '../../../assets/adminImages/grid4.svg';
import userIcon from '../../../assets/adminImages/user.svg';
import analyticsIcon from '../../../assets/adminImages/analytics.svg';
import settingsIcon from '../../../assets/adminImages/settings.svg';
import bellIcon from '../../../assets/adminImages/bell.svg';
import profileIcon from '../../../assets/adminImages/profile.svg';
import logoutIcon from '../../../assets/adminImages/logout.svg';
import NotificationModal from '../../modals/NotificationModal';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleNotificationModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, toggleNotificationModal }) => {
  // const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  // const toggleNotificationModal = () => {
  //   setNotificationModalOpen(!isNotificationModalOpen);
  // };

  return (
    <div>
      {/* Top bar for small screens with just the hamburger menu */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-12 bg-white z-40 flex items-center justify-between px-4">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:block`} // Sidebar is always visible on large screens
      >
        {/* Logo and Close button inside the sidebar for small screens */}
        <div className="lg:hidden flex justify-between items-center p-4">
          <img src={farmerIcon} alt="IFarmr Logo" className="w-48 h-12" />
          {isOpen && (
            <button onClick={toggleSidebar} className="text-xl">
              <FaTimes />
            </button>
          )}
        </div>

        {/* Sidebar menu items */}
        <div className="flex flex-col justify-start p-8 space-y-7">
          {/*logo for large screens */}
          <div className="hidden lg:flex items-start">
            <img src={farmerIcon} alt="IFarmr Logo" className="w-48 h-12" />
          </div>

          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
          >
            <img src={gridIcon} alt="icon" className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          {/* User Database */}
          <NavLink
            to="/admin/user-database"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-3 text-[#204E51] font-semibold transition-colors'
                : 'flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors'
            }
          >
            <img src={userIcon} alt="icon" className="w-5 h-5" />
            <span>User Database</span>
          </NavLink>

          {/* User Analytics */}
          <NavLink
            to="/admin/user-analytics"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-3 text-[#204E51] font-semibold transition-colors'
                : 'flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors'
            }
          >
            <img src={analyticsIcon} alt="icon" className="w-5 h-5" />
            <span>User Analytics</span>
          </NavLink>

          {/* Divider */}
          <div className="!mt-10 mb-2 text-black text-base tracking-wide font-semibold">Settings</div>

          {/* Settings */}
          <NavLink
            to="#"
            className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
          >
            <img src={settingsIcon} alt="icon" className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="#"
            className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
            onClick={toggleNotificationModal}
          >
            <img src={bellIcon} alt="Notifications" className="w-5 h-5" />
            <span>Notifications</span>
          </NavLink>
          {/* {isNotificationModalOpen && (
        <NotificationModal onClose={toggleNotificationModal} /> 
      )} */}

          {/* My Profile */}
          <NavLink
            to="#"
            className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
          >
            <img src={profileIcon} alt="Profile" className="w-5 h-5" />
            <span>My Profile</span>
          </NavLink>

          {/* Logout */}
          <NavLink
            to="#"
            className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
          >
            <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
