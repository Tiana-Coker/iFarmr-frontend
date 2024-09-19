import React from 'react';
import FarmStats from './FramStats';
import UserCharts from './UserCharts';


const AdminDashboard: React.FC = () => {
   
  return (
    <div className="flex flex-col flex-grow custom-md:flex-row h-screen">
        
      <main className="flex-grow w-full lg:w-1/3  p-4 custom-md:p-6">
        <FarmStats />
        <UserCharts />
      </main>
      <aside className="w-full custom-md:w-[calc(20%+10px)] bg-white p-0 custom-md:p-6">    
        
      </aside>
    </div>
  );
};

export default AdminDashboard;
