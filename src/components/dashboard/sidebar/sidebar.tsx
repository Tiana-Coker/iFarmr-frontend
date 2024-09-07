import React from 'react';
import { Link } from 'react-router-dom';
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
import plusIcon from '../../../assets/dashboard/+.svg'; // Add this line

interface SidebarProps {
  // If you have any props for the Sidebar, define them here.
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar bg-gray-100 h-full w-64 p-4 flex flex-col justify-between"> {/* Flex column to align items properly */}
      <div>
        <div className="logo mb-8 hover:text-green-500">
          {/* Wrap the logo image in a Link */}
          <Link to="/dashboard">
            <img src={Ifarm} alt="iFarmr Logo" className="h-16 mx-auto " />
          </Link>
        </div>
        <ul className="nav-links space-y-4">
          <li className="flex items-center">
            <img src={Dashboard} alt="Dashboard Icon" className="h-6 w-6 mr-2" />
            <Link to="/dashboard" className="block text-gray-700 font-thin hover:text-green-500">Dashboard</Link>
          </li>
          <li className="flex items-center">
            <img src={plant} alt="Crop Management Icon" className="h-6 w-6 mr-2" />
            <Link to="/crop-management" className="block text-gray-700 font-thin hover:text-green-500">Crop Management</Link>
          </li>
          <li className="flex items-center">
            <img src={cow} alt="Livestock Management Icon" className="h-6 w-6 mr-2" />
            <Link to="/livestock-management" className="block text-gray-700 font-thin hover:text-green-500">Livestock Management</Link>
          </li>
          <li className="flex items-center mb-8">
            <img src={inventory} alt="Inventory Icon" className="h-6 w-6 mr-2" />
            <Link to="/inventory" className="block text-gray-700 font-thin hover:text-green-500">Inventory</Link>
          </li>
          <div className="flex items-center">
            Settings
          </div>
          <li className="flex items-center">
            <img src={setting} alt="Settings Icon" className="h-6 w-6 mr-2" />
            <Link to="/settings" className="block text-gray-700 font-thin hover:text-green-500">Settings</Link>
          </li>
          <li className="flex items-center">
            <img src={community} alt="Community Icon" className="h-6 w-6 mr-2" />
            <Link to="/community" className="block text-gray-700 font-thin hover:text-green-500">Community</Link>
          </li>
          <li className="flex items-center">
            <img src={bell} alt="Notifications Icon" className="h-6 w-6 mr-2" />
            <Link to="/notifications" className="block text-gray-700 font-thin hover:text-green-500">Notifications</Link>
          </li>
          <li className="flex items-center">
            <img src={profile} alt="Profile Icon" className="h-6 w-6 mr-2" />
            <Link to="/profile" className="block text-gray-700 font-thin hover:text-green-500">My Profile</Link>
          </li>
          <li className="flex items-center">
            <img src={logout} alt="Logout Icon" className="h-6 w-6 mr-2" />
            <Link to="/logout" className="block text-gray-700 font-thin hover:text-red-500">Logout</Link>
          </li>
        </ul>
      </div>

     {/* New Post Section */}
<div className="bg-[#C0F196] rounded-2xl p-6 text-center mt-8 shadow-sm relative">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
    <div className="bg-[#C0F196] w-32 h--5 mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-white rounded-full transform translate-y-8"></div>
    </div>
    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white rounded-full p-2 shadow-md">
        <img src={plusIcon} alt="Plus Icon" className="h-6 w-6" />
      </div>
    </div>
  </div>
  <div className="mt-8 flex items-center justify-center flex-col">
    <div className="text-green-800 font-normal text-lg  mb-2">Share Your Experience</div>
    <p className="text-green-700 text-sm mb-4 text-center">Connect with Others, Ask Questions, and Share Your Success Stories.</p>
    <button className="bg-white text-green-700 font-semibold py-2 px-6 rounded-full text-sm hover:bg-green-50 transition duration-300">
      Create New Post
    </button>
  </div>
</div>

    </div>
  );
};

export default Sidebar;
