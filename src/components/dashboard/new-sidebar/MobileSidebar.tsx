import { sidebarItems, sidebarItems_settings } from "../../../utils/sidebar/sidebarItems.utils"
import IMAGES from "../../../assets/dashboard/sidebar/";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";


interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({isOpen, onClose}: MobileSidebarProps) {
  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  const closeSidebar = () => {
    onClose();
  }

  return (
    <div onClick={handleOverlayClick} className="fixed lg:hidden inset-0 z-50 top-0 left-0 right-0 overflow-y-auto">

      <div className=' px-4 w-[250px] md:w-[300px]  bg-white pt-4 shadow-2xl'>

        <div className={`mb-8 flex items-center gap-4`}>
            <div>  <img className="" src={IMAGES.IFARMR_LOGO} alt="ifarmr_logo" /></div>
            <button onClick={closeSidebar} ><IoIosClose size={30} /></button>
        </div>

        <div className={`flex flex-col gap-8 mb-8`}>
          {
            sidebarItems.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-4">
                    <div className="w-[22px]"><img  className="w-full h-full" src={item.icon} alt={item.title} /></div>
                    <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
                </div>
              )
            })
          }
        </div>

        <div className="mb-10">Settings</div>

        <div className={`flex flex-col gap-8 mb-8`}>
          {
            sidebarItems_settings.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-4">
                    <div className="w-[22px]"><img  className="w-full h-full" src={item.icon} alt={item.title} /></div>
                    <div className="font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
                </div>
              )
            })
          }
        </div>

        <div>
          <Link  to = '/post' className=""><img className="w-full h-full" src={IMAGES.EXPERIENCE} alt="" /></Link>
        </div>


      </div>
    </div>

  )
}

