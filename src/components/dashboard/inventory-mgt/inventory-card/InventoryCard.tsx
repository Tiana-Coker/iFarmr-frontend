import {useState} from 'react'

import IMAGES from "../../../../assets/dashboard/inventory_mgt/index";

import InventoryModal from "../../../modals/InventoryModal";

type InventoryProps = {
    totalInventory: number;
    totalInventoryValue: number;
  };



export default function InventoryCard({totalInventory, totalInventoryValue}: InventoryProps) {

   // State to control Inventory modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bg-[#C0F196] flex flex-wrap justify-center sm:justify-between  px-8 rounded-2xl py-6'>
        <div className="flex flex-col justify-between  w-12/12 sm:w-6/12">
            <div>
                <div className="text-[#2F580F] font-[Raleway] font-[500] text-[23px] leading-[27px] mb-4">Track Your Farm Inventory</div>
                <div className='flex flex-wrap justify-between gap-4  text-[#00563E] font-[Raleway] font-[500] text-[16px] leading-[18.78px]'>
                    {/* Total Inventory */}
                    <div className=''>
                        <div>Total Inventory</div>
                        <div>{totalInventory} Inventory</div>

                    </div>

                    {/* Inventory Value */}
                    <div className='mb-4 md:mb-0'>
                        <div>Inventory Value</div>
                        <div>N {totalInventoryValue?.toLocaleString()}</div>

                    </div>
                </div>
            </div>

            <button onClick={openModal}  className="flex items-center gap-6 text-[#00563E] font-[Raleway] font-[500] text-[14px] leading-[16.44px]">
                <div >Add New Inventory</div>
                <div><img src={IMAGES.ARROW_RIGHT} alt="" /></div>
            </button >
            {isModalOpen && <InventoryModal onClose={closeModal} />}

        </div>

        <div className="sm:w-6/12">
            <img className="w-full h-full" src={IMAGES.INVENTORY_TRUCK} alt="" />
        </div>
    </div>
  )
}
