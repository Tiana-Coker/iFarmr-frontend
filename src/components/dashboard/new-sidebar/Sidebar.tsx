import { useState } from "react";
import { sidebarItems, sidebarItems_settings } from "../../../utils/sidebar/sidebarItems.utils"
import IMAGES from "../../../assets/dashboard/sidebar/"

export default function Sidebar() {
  // const sidebarSpacing = 8;
  const [sidebarSpacing, setSidebarSpacing] = useState(8);
  return (

    <div className=' border px-4'>

      <div className={`mb-${sidebarSpacing}`}>
        <img src={IMAGES.IFARMR_LOGO} alt="ifarmr_logo" />
      </div>

      <div className={`flex flex-col gap-${sidebarSpacing} mb-${sidebarSpacing}`}>
        {
          sidebarItems.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-4">
                  <div className="w-[22px] border"><img  className="w-full h-full" src={item.icon} alt={item.title} /></div>
                  <div className="border font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
              </div>
            )
          })
        }
      </div>

      <div className="mb-10">Settings</div>

      <div className={`flex flex-col gap-${sidebarSpacing} mb-${sidebarSpacing}`}>
        {
          sidebarItems_settings.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-4">
                  <div className="w-[22px] border"><img  className="w-full h-full" src={item.icon} alt={item.title} /></div>
                  <div className="border font-[Raleway] text-[13px] leading-[15.26px] text-[#333333]">{item.title}</div>
              </div>
            )
          })
        }
      </div>

      <div>
        <div className="border"><img className="w-full h-full" src={IMAGES.EXPERIENCE} alt="" /></div>
      </div>


    </div>
  )
}

