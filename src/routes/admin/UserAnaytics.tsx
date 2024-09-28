import React from 'react';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow custom-md:flex-row h-screen">
      <main className="flex-grow w-full lg:w-1/3 p-4 custom-md:p-6">
      <p>Good Morning, Admin</p>
      <br></br>
        <AnalyticsCharts />
      </main>
      <aside className="w-full custom-md:w-[calc(20%+10px)] bg-white p-0 custom-md:p-6">    
        {/* Any additional sidebar content can go here */}
      </aside>
    </div>
  );
};

export default AdminAnalytics;
