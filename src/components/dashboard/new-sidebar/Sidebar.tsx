import { Link } from "react-router-dom";
import { sidebarItems, sidebarItems_settings } from "../../../utils/sidebar/sidebarItems.utils"
import IMAGES from "../../../assets/dashboard/sidebar/"

export default function Sidebar() {

  
  return (

    <div className=' px-4'>

      <div className={`mb-8`}>
        <img src={IMAGES.IFARMR_LOGO} alt="ifarmr_logo" />
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
        <Link to = '/post' className=""><img className="w-full h-full" src={IMAGES.EXPERIENCE} alt="" /></Link>
      </div>


    </div>
  )
}

