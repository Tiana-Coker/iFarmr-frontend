import React, { useState, useEffect } from 'react';
import axios from 'axios';
import livestockImage from '../../assets/dashboard/livestock.svg';
import LivestockModal from '../modals/LivestockModal';
import { getGreeting } from '../../utils/greetings';

// Define the shape of the Livestock data
interface LivestockData {
  name: string;
  age: number;
  breed: string;
  // Add other fields as needed
}

// Define the props interface
interface LivestockDashboardProps {
  username: string;
}

const LivestockDashboard: React.FC<LivestockDashboardProps> = ({ username }) => {
  const [livestock, setLivestock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal visibility

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
 // Use the utility function to get the greeting
 const [greeting, setGreeting] = useState<string>(getGreeting());
  

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token directly from localStorage

    if (!baseUrl || !token) {
      setError('Configuration error: API base URL or token is not defined');
      return;
    }

    const fetchData = async () => {
      try {
        const livestockResponse = await axios.get<number>(`${baseUrl}/api/v1/livestock/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivestock(livestockResponse.data);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNewLivestock = (newData: LivestockData) => {
    console.log(newData);
    toggleModal(); // Close modal after submission
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="w-full p-4">
      <h2 className="text-l font-semibold text-gray-800 mb-4">
       {greeting}, {username ? username : 'User'}
      </h2>

      <section
        className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 rounded-lg shadow-md relative bg-cover bg-no-repeat"
        style={{ backgroundColor: '#C0F196' }}
      >
        <div className="w-full md:w-2/3 mb-6 md:mb-0">
          <h2 className="text-custom-xl font-medium text-custom-bg">Manage Your Livestock</h2>
          <div className="mt-4 space-y-4 md:space-y-0 md:flex md:space-x-6">
            <div className="space-y-1">
              <p className="text-custom-lg font-medium text-custom-green">Total Livestock</p>
              <p className="text-xl font-medium text-custom-green">
                {livestock !== null ? `${livestock} Livestock` : 'Loading...'}
              </p>
            </div>
          </div>

          <p className="mt-6 text-custom-lg text-custom-green">
            Add New Livestock
            {/* Trigger Modal */}
            <button onClick={toggleModal} className="text-custom-bg  ml-2 cursor-pointer">
              &rarr;
            </button>
          </p>
        </div>

        <div className="w-full md:w-1/3 relative">
          <img src={livestockImage} alt="Livestock" className="w-full h-auto object-contain" />
          <div className="absolute top-0 right-0 h-24 w-24 border-t-4 border-r-4 border-white rounded-full"></div>
        </div>
      </section>

      {isModalOpen && (
        <LivestockModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onSubmit={(newData: LivestockData) => {
            // Handle new livestock data submission here
            console.log(newData);
            toggleModal(); // Close modal after submission
          }}
        />
      )}
    </div>
  );
};

export default LivestockDashboard;
