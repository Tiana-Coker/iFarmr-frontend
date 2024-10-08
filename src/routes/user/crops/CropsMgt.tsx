import { useState, useEffect } from "react";
import IMAGES from "../../../assets/dashboard/sidebar/";
import { GiHamburgerMenu } from "react-icons/gi";

// import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";
import Sidebar from "../../../components/dashboard/new-sidebar/Sidebar"
import MobileSidebar from "../../../components/dashboard/new-sidebar/MobileSidebar";
import CropCard from "../../../components/dashboard/crop-mgt/crop-card/CropCard";
import CropTable from "../../../components/dashboard/crop-mgt/crop-table/CropTable";
import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";


// loading effect
import { useLoading } from "../../../context/globalSpinner/LoadingContext";

export default function Inventory() {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const[crops, setCrops] = useState([]);
  const [totalCrops, setTotalCrops] = useState(0);
  const [totalMatureCrops, setTotalMatureCrops] = useState(0);
  const [totalFloweringCrops, setTotalFloweringCrops] = useState(0);

  // Access loading state 
  const { setLoading } = useLoading();

  const [isMobileSidebarOpen, setMobileSidebar] = useState(false); // Sidebar state for mobile/tablet devices
  const openMobileSidebar = () => setMobileSidebar(true);
  const closeMobileSidebar = () => setMobileSidebar(false);

    // crops Useeffect
    useEffect(()=> {
      console.log('fetching crops')
      setLoading(true);
      fetch(baseApiUrl + '/api/v1/crops',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data);
        setCrops(data.crops);
        setTotalCrops(data.totalCrops);
        setTotalMatureCrops(data.totalMatureCrops);
        setTotalFloweringCrops(data.totalFloweringCrops);
      })
      .finally(()=>{
          setLoading(false);
      })
  
    } ,[])


  return (
   <>

    {/* Mobile Nav */}
   <div className="flex justify-between items-center lg:hidden px-8 pt-4  gap-4">
      <div className="" ><img className="w-full" src={IMAGES.IFARMR_LOGO} alt="" /></div>
      <button onClick={openMobileSidebar}><GiHamburgerMenu /></button>
   </div>
   
   <div className="flex">

      <div className="hidden lg:block lg:w-[16%] pt-4">
        <Sidebar />
      </div>

        <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar}/>


      <div className="pt-10 px-8 md:w-[70%] lg:w-[60.3%] overflow-x-auto">
          {/* <div className="font-[Raleway] font-[600] text-[18px] leading-[21.13px] mb-4"></div> */}
          <div className="mb-8">
            <CropCard 
                totalCrops={totalCrops}
                totalMatureCrops={totalMatureCrops}
                totalFloweringCrops={totalFloweringCrops}
                setTotalCrops={setTotalCrops}  
                setTotalMatureCrops={setTotalMatureCrops}
                setTotalFloweringCrops={setTotalFloweringCrops}
                setCrops={setCrops}
                />
                
          </div>

            <CropTable crops={crops} />
      </div>

      <div className=" hidden md:block w-[30%] lg:w-[23.7%] pr-4 lg:pr-12 pt-10">
        <UpcomingTask taskType = "CROP"/>
      </div>

    <div>
 

</div>


    </div>
   </>
  )
}
