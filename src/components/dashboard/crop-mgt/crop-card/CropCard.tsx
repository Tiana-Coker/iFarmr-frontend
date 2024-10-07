import {useState} from 'react'

import IMAGES from "../../../../assets/dashboard/crop_mgt/index";

import CropModal from '../../../modals/CropModal';


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
  totalCrops,
  // totalMatureCrops, totalFloweringCrops,
  setCrops, setTotalCrops, setTotalMatureCrops, setTotalFloweringCrops
}: CropProps) {

  console.log("totalcrops", totalCrops)

   // State to control Crop modal visibility
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
                        <div>{totalCrops} {totalCrops > 1 ? "Crops" : "Crop" }</div>

                    </div>

                   {/* <div className=''> // Commented because it may be reused next wee
                        <div>Mature Crops</div>
                        <div>{totalMatureCrops} {totalMatureCrops > 1 ? "Crops" : "Crop" } </div>

                    </div>

                    <div className='mb-4 md:mb-0'>
                        <div>Flowering Crops</div>
                        <div>{totalFloweringCrops} {totalFloweringCrops > 1 ? "Crops" : "Crop" }</div>
                    </div> */}
                </div>
            </div>

            <button onClick={openModal}  className="flex items-center gap-6 text-[#00563E] font-[Raleway] font-[500] text-[14px] leading-[16.44px]">
                <div >Add New Crop</div>
                <div><img src={IMAGES.ARROW_RIGHT} alt="" /></div>
            </button >
            {isModalOpen && <CropModal isOpen={isModalOpen} onClose={closeModal} 
              setTotalCrops={setTotalCrops}  
              setTotalMatureCrops={setTotalMatureCrops}
              setTotalFloweringCrops={setTotalFloweringCrops}
              setCrops={setCrops}
            />}

        </div>

        <div className="sm:w-6/12">
            <img className="w-full h-full" src={IMAGES.CROPS} alt="" />
        </div>
    </div>
  )
}

