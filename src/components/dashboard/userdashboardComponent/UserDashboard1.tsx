import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../../../assets/dashboard/image.svg';

interface FarmGlanceProps {}

const FarmGlance: React.FC<FarmGlanceProps> = () => {
  const [crops, setCrops] = useState<number | null>(null);
  const [livestock, setLivestock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [tasksToday, setTasksToday] = useState<number>(0);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    if (!apiBaseUrl || !token) {
      console.error('API Base URL or token is not defined');
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
      setUsername(decodedToken.sub); // Assuming 'sub' contains the username
    }

    const fetchData = async () => {
      try {
        console.log('Fetching crops from:', `${apiBaseUrl}/api/v1/crops/total`);
        const cropsResponse = await axios.get<number>(`${apiBaseUrl}/api/v1/crops/total`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Crops response:', cropsResponse.data);
        setCrops(cropsResponse.data);

        console.log('Fetching livestock from:', `${apiBaseUrl}/api/v1/livestock/total`);
        const livestockResponse = await axios.get<number>(`${apiBaseUrl}/api/v1/livestock/total`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Livestock response:', livestockResponse.data);
        setLivestock(livestockResponse.data);

        console.log('Fetching upcoming tasks from:', `${apiBaseUrl}/api/v1/tasks/upcoming`);
        const tasksResponse = await axios.get<any[]>(`${apiBaseUrl}/api/v1/tasks/upcoming`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const today = new Date().toISOString().split('T')[0];
        const todayTasksCount = tasksResponse.data.filter(task => task.dueDate === today).length;
        setTasksToday(todayTasksCount);

      } catch (error: unknown) {
        console.error('Error details:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response);
          console.error('Error request:', error.request);
        }
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [apiBaseUrl, token]);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="w-full p-4">
      <h1 className="text-l font-semibold text-gray-800 mb-4">Welcome Back, {username ? username : 'User'}</h1>

      <section
        className="flex justify-between items-center p-8 rounded-lg shadow-md relative bg-cover bg-no-repeat"
        style={{ backgroundColor: '#C0F196' }}
      >
        <div>
          <h2 className="text-custom-xl font-medium text-custom-bg">Your Farm at a Glance</h2>

          <div className="mt-4"> {/* Adjusted margin */}
            <div className="flex justify-between">
              <div className="space-y-1"> {/* Adjusted spacing */}
                <p className="text-custom-lg font-medium text-custom-green">Total Crops</p>
                <p className="text-xl font-medium text-custom-green">
                  {crops !== null ? `${crops} Crops` : 'Loading...'}
                </p>
              </div>
              <div className="space-y-1"> {/* Adjusted spacing */}
                <p className="text-custom-lg font-medium text-custom-green">Total Livestock</p>
                <p className="text-xl font-medium text-custom-green">
                  {livestock !== null ? `${livestock} Livestock` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-custom-lg text-custom-green">
            You have <span className="font-bold">{tasksToday} tasks</span> scheduled for today.
            <a href="/tasks" className="text-custom-bg"> &rarr;</a> {/* Make the arrow a clickable link */}

          </p>

        
        </div>

        <div className="relative w-1/3">
          <img src={image} alt="Plants" className="w-full h-auto object-contain" />
          <div className="absolute top-0 right-0 h-24 w-24 border-t-4 border-r-4 border-white rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default FarmGlance;
