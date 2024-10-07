import { useState, useEffect } from "react";
import IMAGES from "../../../assets/dashboard/sidebar/";
import { GiHamburgerMenu } from "react-icons/gi";

// import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";
import Sidebar from "../../../components/dashboard/new-sidebar/Sidebar"
import MobileSidebar from "../../../components/dashboard/new-sidebar/MobileSidebar";
import InventoryCard from "../../../components/dashboard/inventory-mgt/inventory-card/InventoryCard";
import InventoryTable from "../../../components/dashboard/inventory-mgt/inventory-table/InventoryTable";
import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";


// loading effect
import { useLoading } from "../../../context/globalSpinner/LoadingContext";

export default function Inventory() {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [inventories, setInventories] = useState([]);

  // Access loading state 
  const { setLoading } = useLoading();

  const [isMobileSidebarOpen, setMobileSidebar] = useState(false); // Sidebar state for mobile/tablet devices
  const openMobileSidebar = () => setMobileSidebar(true);
  const closeMobileSidebar = () => setMobileSidebar(false);

    // Inventories Useeffect
    useEffect(()=> {
      console.log('fetching inventories')
      setLoading(true);
      fetch(baseApiUrl + '/api/v1/inventory',{
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
        setInventories(data.inventories);
        setTotalInventory(data.totalInventory);
        setTotalInventoryValue(data.totalInventoryValue);
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
          <div className="font-[Raleway] font-[600] text-[18px] leading-[21.13px] mb-4">Good Morning, Ayomide</div>
          <div className="mb-8"><InventoryCard 
          
          setTotalInventory={setTotalInventory}  
          setTotalInventoryValue={setTotalInventoryValue}
          setInventories={setInventories}
          
          
          totalInventory = {totalInventory} totalInventoryValue = {totalInventoryValue}/></div>

            <InventoryTable inventories={inventories} />
      </div>

      <div className=" hidden md:block w-[30%] lg:w-[23.7%] pr-4 lg:pr-12 pt-10">
        <UpcomingTask taskType="INVENTORY"/>
      </div>

    <div>
 

</div>


    </div>
   </>
  )
}
