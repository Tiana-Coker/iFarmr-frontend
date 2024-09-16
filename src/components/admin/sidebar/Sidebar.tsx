import React from 'react';
import { NavLink } from 'react-router-dom'; 
import farmerIcon from '../../../assets/signupImages/f-logo.svg';
import gridIcon from '../../../assets/adminImages/grid4.svg';
import userIcon from '../../../assets/adminImages/user.svg';
import analyticsIcon from '../../../assets/adminImages/analytics.svg';
import settingsIcon from '../../../assets/adminImages/settings.svg';
import bellIcon from '../../../assets/adminImages/bell.svg';
import profileIcon from '../../../assets/adminImages/profile.svg';
import logoutIcon from '../../../assets/adminImages/logout.svg';


const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen mt-9 w-64 bg-white flex flex-col">
      {/* Logo */}
      <div className="flex p-2">
        <img src={farmerIcon} alt="IFarmr Logo" className="w-60 h-12" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col justify-start p-8 space-y-7">
        {/* Dashboard */}
        <NavLink to="user/dashboard" className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors">
        <img src={gridIcon} alt="icon" className="" />
          
          <span>Dashboard</span>
        </NavLink>

        {/* User Database */}
        <NavLink to="/user-database" 
        className={({ isActive }) =>
          isActive
            ? "flex items-center space-x-3 text-[#204E51] font-semibold transition-colors"
            : "flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
        }>
        
              <img src={userIcon} alt="icon" className="w-5 h-5 fill-[#204E51]"/>
             
              <span>User Database</span>
           
        </NavLink>

        {/* User Analytics */}
        <NavLink to="/user-analytics" 
        className={({ isActive }) =>
          isActive
            ? "flex items-center space-x-3 text-[#204E51] font-semibold transition-colors"
            : "flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors"
        }>
        <img src={analyticsIcon} alt="icon" className="" />
          <span>User Analytics</span>
        </NavLink>

        {/* Divider */}
        <div className="!mt-10 mb-2 text-black text-base tracking-wide font-semibold">
          Settings
        </div>

        {/* Settings */}
        <div className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors">
        <img src={settingsIcon} alt="icon" className="" />
          
          <span>Settings</span>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors">
          <img src={bellIcon} alt="IFarmr Logo" className="" />
          <span>Notifications</span>
        </div>

        {/* My Profile */}
        <div className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors">
          <img src={profileIcon} alt="IFarmr Logo" className="" />
          <span>My Profile</span>
        </div>

        {/* Logout */}
        <div className="flex items-center space-x-3 text-[#333333] hover:text-[#204E51] transition-colors">
        <img src={logoutIcon} alt="IFarmr Logo" className="" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
