import { useState } from 'react';
import { Link } from "react-router-dom";
import { sidebarItems, sidebarItems_settings } from "../../../utils/sidebar/sidebarItems.utils";
import IMAGES from "../../../assets/dashboard/sidebar";
import NotificationModal from '../../modals/NotificationModal';
import ProfileModal from '../../modals/UserProfile';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleModalOpen = (modalType: string) => {
    if (modalType === 'notifications') {
      setNotificationModalOpen(true);
    } else if (modalType === 'profile') {
      setProfileModalOpen(true);
    }
  };

  const handleModalClose = (modalType: string) => {
    if (modalType === 'notifications') {
      setNotificationModalOpen(false);
    } else if (modalType === 'profile') {
      setProfileModalOpen(false);
    }
  };

  

  return (
    <div className={`${styles.hide_scrollbar} px-4 pt-4 fixed top-0 left-0 h-screen overflow-y-auto`}>
      <div className={`mb-8`}>
        <Link to='/'><img src={IMAGES.IFARMR_LOGO} alt="ifarmr_logo" /></Link>
      </div>

      <div className={`flex flex-col gap-8 mb-8`}>
        {sidebarItems.map((item) => (
          <Link to={`${item.route}`} key={item.id} className="flex items-center gap-4">
            <div className="w-[22px]"><img className="w-full h-full" src={item.icon} alt={item.title} /></div>
            <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
          </Link>
        ))}
      </div>

      <div className="mb-10">Settings</div>

      <div className={`flex flex-col gap-8 mb-8`}>
        {sidebarItems_settings.map((item) => {
          if (item.title === "Notifications") {
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleModalOpen('notifications')}
              >
                <div className="w-[22px]"><img className="w-full h-full" src={item.icon} alt={item.title} /></div>
                <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
              </div>
            );
          } else if (item.title === "My Profile") {
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleModalOpen('profile')}
              >
                <div className="w-[22px]"><img className="w-full h-full" src={item.icon} alt={item.title} /></div>
                <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
              </div>
            );
          } else {
            return (
              <Link to={`${item.route}`} key={item.id} className="flex items-center gap-4">
                <div className="w-[22px]"><img className="w-full h-full" src={item.icon} alt={item.title} /></div>
                <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
              </Link>
            );
          }
        })}
      </div>

      <div>
        <Link to="/post" className=""><img className="w-full h-full" src={IMAGES.EXPERIENCE} alt="Experience" /></Link>
      </div>

      {/* Modals */}
      {isNotificationModalOpen && <NotificationModal onClose={() => handleModalClose('notifications')} />}
      {isProfileModalOpen && <ProfileModal isOpen={isProfileModalOpen} onClose={() => handleModalClose('profile')} />}
    </div>
  );
}
