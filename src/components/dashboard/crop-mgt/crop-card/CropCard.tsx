import {useState} from 'react'

import IMAGES from "../../../../assets/dashboard/inventory_mgt/index";

import InventoryModal from "../../../modals/InventoryModal";


type CropProps = {
  totalCrops: number;
  totalMatureCrops: number;
  totalFloweringCrops: number;
  setCrops: (value: any) => void;
  setTotalCrops: (value: any) => void;
  setTotalMatureCrops: (value: number) => void;
  setTotalFloweringCrops: (value: number) => void;
};

export default function CropCard({
  totalCrops, totalMatureCrops, totalFloweringCrops,
  setCrops, setTotalCrops, setTotalMatureCrops, setTotalFloweringCrops
}: CropProps) {

  console.log("totalcrops", totalCrops)

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
                <div className="text-[#2F580F] font-[Raleway] font-[500] text-[23px] leading-[27px] mb-4">Manage Your Crops</div>
                <div className='flex flex-wrap justify-between gap-4  text-[#00563E] font-[Raleway] font-[500] text-[16px] leading-[18.78px]'>
                    {/* Total Crops */}
                    <div className=''>
                        <div>Total Crops</div>
                        <div>{totalCrops} Crops</div>

                    </div>

                   {/* Mature Crops */}
                   <div className=''>
                        <div>Mature Crops</div>
                        <div>{totalMatureCrops} Crops</div>

                    </div>

                    {/* Flowering Crops */}
                    <div className='mb-4 md:mb-0'>
                        <div>Flowering Crops</div>
                        <div>{totalFloweringCrops} Crops</div>
                    </div>
                </div>
            </div>

            <button onClick={openModal}  className="flex items-center gap-6 text-[#00563E] font-[Raleway] font-[500] text-[14px] leading-[16.44px]">
                <div >Add New Inventory</div>
                <div><img src={IMAGES.ARROW_RIGHT} alt="" /></div>
            </button >
            {isModalOpen && <InventoryModal onClose={closeModal} 
              setTotalCrops={setTotalCrops}  
              setTotalMatureCrops={setTotalMatureCrops}
              setTotalFloweringCrops={setTotalFloweringCrops}
              setCrops={setCrops}
            />}

        </div>

        <div className="sm:w-6/12">
            <img className="w-full h-full" src={IMAGES.INVENTORY_TRUCK} alt="" />
        </div>
    </div>
  )
}

