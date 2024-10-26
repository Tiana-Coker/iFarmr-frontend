import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ifarm from '../../../assets/dashboard/Ifarm.svg';
import Dashboard from '../../../assets/dashboard/grid-4-svgrepo-com.svg';
import plant from '../../../assets/dashboard/Plant.svg';
import cow from '../../../assets/dashboard/cow.svg';
import inventory from '../../../assets/dashboard/inventory.svg';
import community from '../../../assets/dashboard/community.svg';
import setting from '../../../assets/dashboard/settings-svgrepo-com.svg';
import bell from '../../../assets/dashboard/bell (1).svg';
import profile from '../../../assets/dashboard/user-1-svgrepo-com.svg';
import logout from '../../../assets/dashboard/logout.svg';
import plusIcon from '../../../assets/dashboard/+.svg';
import menuIcon from '../../../assets/dashboard/menu.jpg';
import NotificationModal from '../../modals/NotificationModal';
import ProfileModal from '../../modals/UserProfile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false); // State for notification modal
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // State for profile modal

  const handleDashboardClick = () => {
    location.pathname === '/user/dashboard'
      ? window.location.reload()
      : (window.location.href = '/user/dashboard');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotificationModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  // Top navigation items
  const topNavItems = [
    { src: plant, alt: 'Crop Management Icon', text: 'Crop Management', path: '/user/crops' },
    {
      src: cow,
      alt: 'Livestock Management Icon',
      text: 'Livestock Management',
      path: '/livestock-management',
    },
    { src: inventory, alt: 'Inventory Icon', text: 'Inventory', path: '/user/inventory' },
  ];

  // Settings navigation items
  const settingsNavItems = [
    { src: setting, alt: 'Settings Icon', text: 'Settings', path: '/settings' },
    { src: community, alt: 'Community Icon', text: 'Community', path: '/view-post' },
    {
      src: bell,
      alt: 'Notifications Icon',
      text: 'Notifications',
      path: '#',
      onClick: toggleNotificationModal,
    },
    {
      src: profile,
      alt: 'Profile Icon',
      text: 'My Profile',
      path: '#',
      onClick: toggleProfileModal, // Opens Profile Modal
    },
    { src: logout, alt: 'Logout Icon', text: 'Logout', path: '/logout', textColor: 'text-red-500' },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-200 rounded-md"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-label="Toggle sidebar"
      >
        <img src={menuIcon} alt="Menu Icon" className="h-6 w-6" />
      </button>

      <div
        className={`sidebar h-screen w-64 p-4 flex flex-col justify-between fixed z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ${className} ${
          'overflow-y-hidden md:overflow-y-hidden'
        }`}
      >
        <div className="hover:text-side-bar">
          <div className="logo mb-12 hover:text-side-bar">
            <Link to="/">
              <img src={Ifarm} alt="iFarmr Logo" className="h-16 mx-auto" />
            </Link>
          </div>
          <ul className="nav-links">
            {/* Dashboard Link */}
            <li className="flex items-center mb-6" onClick={handleDashboardClick}>
              {/* Increased mb-6 to mb-8 for more spacing */}
              <img src={Dashboard} alt="Dashboard Icon" className="h-6 w-6 mr-2" />
              <span className="text-black hover:text-side-bar cursor-pointer text-sm">
                Dashboard
              </span>
            </li>

            {/* Top Navigation Items */}
            {topNavItems.map(
              ({ src, alt, text, path, onClick = undefined, textColor = 'text-black' }: { src: string; alt: string; text: string; path: string; onClick?: () => void; textColor?: string }, index) => (
                <li
                  key={index}
                  className="flex items-center mb-6" // Increased mb-6 to mb-8
                  onClick={onClick}
                >
                  <img src={src} alt={alt} className="h-6 w-6 mr-2" />
                  <Link to={path} className={`block hover:text-side-bar ${textColor} text-sm`}>
                    {text}
                  </Link>
                </li>
              )
            )}

            {/* Settings Section Header */}
            <h1 className="text-gray-700 font-bold text-lg mt-6 mb-6">Settings</h1>

            {/* Settings Navigation Items */}
            {settingsNavItems.map(
              ({ src, alt, text, path, onClick = undefined, textColor = 'text-black' }, index) => (
                <li key={index} className="flex items-center mb-8">
                  <img src={src} alt={alt} className="h-6 w-6 mr-2" />
                  <Link
                    to={path}
                    className={`block hover:text-side-bar ${textColor} text-sm`}
                    onClick={onClick} // Moved onClick handler here
                  >
                    {text}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#C0F196] rounded-3xl p-6 text-center mt-8 shadow-sm relative">
          {/* Top-left arc */}
          <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-[#D8F9C4] rounded-tl-[10rem] rounded-br-[50rem]"></div>
          {/* Bottom-right arc */}
          <div className="absolute bottom-0 right-0 w-2/5 h-2/5 bg-[#D8F9C4] rounded-tl-[60rem] rounded-br-[9rem]"></div>

          {/* Plus icon */}
          <div className="absolute top-0 left-1/2 -mt-3 transform -translate-x-1/2 translate-y-1/4">
            <div className="bg-white rounded-full p-2 shadow-md">
              <img src={plusIcon} alt="Plus Icon" className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center flex-col relative z-10">
            <div className="text-green-800 font-semibold text-sm mb-2">Share Your Experience</div>
            <p className="text-green-700 text-sm mb-4 text-center">
              Connect with Others, Ask Questions, and Share Your Success Stories.
            </p>
            <Link to="/post">
              <button className="bg-white text-green-700 font-semibold py-2 px-6 rounded-lg text-sm hover:bg-green-50 transition duration-300">
                Create New Post
              </button>
            </Link>
          </div>

          {/* Cutout for the button */}
          <div className="absolute bottom-5 right-7 w-2/5 h-10.5 bg-[#C0F196]"></div>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Notification Modal */}
      {isNotificationModalOpen && <NotificationModal onClose={toggleNotificationModal} />}

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={toggleProfileModal} />
    </>
  );
};

export default Sidebar;
