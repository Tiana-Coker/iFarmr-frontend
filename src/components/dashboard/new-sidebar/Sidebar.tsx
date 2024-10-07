import { useState } from 'react';
import { Link } from "react-router-dom";
import { sidebarItems, sidebarItems_settings } from "../../../utils/sidebar/sidebarItems.utils";
import IMAGES from "../../../assets/dashboard/sidebar";
import NotificationModal from '../../modals/NotificationModal';
import ProfileModal from '../../modals/UserProfile';

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
    <div className='px-4'>
      <div className={`mb-8`}>
        <img src={IMAGES.IFARMR_LOGO} alt="ifarmr_logo" />
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
