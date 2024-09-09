import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/authContext/AuthContext'; 
import image from '../../../assets/dashboard/image.svg';

interface FarmGlanceProps {}

const FarmGlance: React.FC<FarmGlanceProps> = () => {
  const [crops, setCrops] = useState<number | null>(null);
  const [livestock, setLivestock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [tasksToday, setTasksToday] = useState<number>(0);

  const { token, baseUrl } = useAuth(); 

  useEffect(() => {
    if (!baseUrl || !token) {
      setError('Configuration error: API base URL or token is not defined');
      return;
    }

    const decodeToken = (token: string) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Failed to decode token', e);
        return null;
      }
    };

    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.sub) {
      setUsername(decodedToken.sub);
    }

    const fetchData = async () => {
      try {
        const cropsResponse = await axios.get<number>(`${baseUrl}/api/v1/crops/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrops(cropsResponse.data);

        const livestockResponse = await axios.get<number>(`${baseUrl}/api/v1/livestock/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivestock(livestockResponse.data);

        const tasksResponse = await axios.get<any[]>(`${baseUrl}/api/v1/tasks/upcoming`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const today = new Date().toISOString().split('T')[0];
        const todayTasksCount = tasksResponse.data.filter(task => task.dueDate === today).length;
        setTasksToday(todayTasksCount);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [baseUrl, token]);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="w-full p-4">
      <h1 className="text-l font-semibold text-gray-800 mb-4">Welcome Back, {username ? username : 'User'}</h1>

      <section className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 rounded-lg shadow-md relative bg-cover bg-no-repeat" style={{ backgroundColor: '#C0F196' }}>
  <div className="w-full md:w-2/3 mb-6 md:mb-0">
    <h2 className="text-custom-xl font-medium text-custom-bg">Your Farm at a Glance</h2>
    <div className="mt-4 space-y-4 md:space-y-0 md:flex md:space-x-6">
      <div className="space-y-1">
        <p className="text-custom-lg font-medium text-custom-green">Total Crops</p>
        <p className="text-xl font-medium text-custom-green">
          {crops !== null ? `${crops} Crops` : 'Loading...'}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-custom-lg font-medium text-custom-green">Total Livestock</p>
        <p className="text-xl font-medium text-custom-green">
          {livestock !== null ? `${livestock} Livestock` : 'Loading...'}
        </p>
      </div>
    </div>

    <p className="mt-6 text-custom-lg text-custom-green">
      You have <span className="font-bold">{tasksToday} tasks</span> scheduled for today.
      <a href="/tasks" className="text-custom-bg">&rarr;</a>
    </p>
  </div>

  <div className="w-full md:w-1/3 relative">
    <img src={image} alt="Plants" className="w-full h-auto object-contain" />
    <div className="absolute top-0 right-0 h-24 w-24 border-t-4 border-r-4 border-white rounded-full"></div>
  </div>
</section>

    </div>
  );
};

export default FarmGlance;
