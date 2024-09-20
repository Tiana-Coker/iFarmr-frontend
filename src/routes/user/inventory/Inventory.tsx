import { useState, useEffect } from "react";

// import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";
import Sidebar from "../../../components/dashboard/new-sidebar/Sidebar"
import InventoryCard from "../../../components/dashboard/inventory-mgt/inventory-card/InventoryCard";
import InventoryTable from "../../../components/dashboard/inventory-mgt/inventory-table/InventoryTable";
import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";

export default function Inventory() {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcyNjYxNTM4OCwiZXhwIjoxNzI2NzAxNzg4fQ.ZiCJ6UCAzPL5JTGWXj2WnAeXAv-CCdcUqTjqH6nVTc8"
  const [upcomingTask, setUpcomingTask] = useState([])

  


  // Tasks Useeffect
  useEffect(()=> {
    console.log('fetching tasks')
    fetch(baseApiUrl + '/api/v1/tasks/upcoming',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Bearer': token
      }
    })
    .then(res => {
      console.log(res)
    })

  } ,[])

  return (
    <div className="flex">

      <div className="hidden lg:block lg:w-[16%] pt-4">
        <Sidebar />
      </div>


      <div className="pt-10 px-8 md:w-[70%] lg:w-[60.3%] border">
          <div className="font-[Raleway] font-[600] text-[18px] leading-[21.13px] mb-4">Good Morning, Ayomide</div>
          <div className="mb-8"><InventoryCard /></div>

          <InventoryTable />
      </div>

      <div className=" hidden md:block w-[30%] lg:w-[23.7%] pr-4 lg:pr-12 pt-10">
        <UpcomingTask />
      </div>

      <div>
       

      </div>
      
      
    </div>
  )
}
