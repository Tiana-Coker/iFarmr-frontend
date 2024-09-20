// import React from 'react'

import IMAGES from "../../../../assets/dashboard/inventory_mgt/index"

export default function InventoryCard() {
  return (
    <div className='bg-[#C0F196] flex justify-between px-8 rounded-2xl py-6'>
        <div className="flex flex-col justify-between">
            <div>
                <div className="text-[#2F580F] font-[Raleway] font-[500] text-[23px] leading-[27px] mb-4">Track Your Farm Inventory</div>
                <div className='flex  justify-between  text-[#00563E] font-[Raleway] font-[500] text-[16px] leading-[18.78px]'>
                    {/* Total Inventory */}
                    <div>
                        <div>Total Inventory</div>
                        <div>50 Inventory</div>

                    </div>

                    {/* Inventory Value */}
                    <div>
                        <div>Inventory Value</div>
                        <div>N 2,000,000</div>

                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 text-[#00563E] font-[Raleway] font-[500] text-[14px] leading-[16.44px]">
                <div>Add New Inventory</div>
                <div><img src={IMAGES.ARROW_RIGHT} alt="" /></div>
            </div>

        </div>

        <div className="">
            <img className="w-full h-full" src={IMAGES.INVENTORY_TRUCK} alt="" />
        </div>
    </div>
  )
}
