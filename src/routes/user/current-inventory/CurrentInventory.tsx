import React, { ChangeEvent, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import useParams and useNavigate
import IMAGES from "../../../assets/dashboard/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import Sidebar from "../../../components/dashboard/new-sidebar/Sidebar";
import MobileSidebar from "../../../components/dashboard/new-sidebar/MobileSidebar";
import UpcomingTask from "../../../components/upcoming_task/UpcomingTask";
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

type InventoryData = {
  itemType: string;
  name: string;
  quantity: string;
  cost: string;
  location: string;
  condition: string;
  dateAcquired: string;
  description: string;
};

export default function CurrentInventory() {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); 
  const [isMobileSidebarOpen, setMobileSidebar] = useState(false); // Sidebar state for mobile/tablet devices
  const [formData, setFormData] = useState<InventoryData | null>(null); 
  const [loading, setLoading] = useState(true); // loading state
  const [updating, setUpdating] = useState(false);

  const openMobileSidebar = () => setMobileSidebar(true);
  const closeMobileSidebar = () => setMobileSidebar(false);

  // Fetch inventory by ID when component mounts
  useEffect(() => {
    if (id) {
      fetch(`${baseApiUrl}/api/v1/inventory/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(formData)
          setFormData(data); 
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching inventory:", error));
    }
  }, [id, baseApiUrl, token]);

  // Function to handle input changes
  const handleInputChange = (key: keyof InventoryData, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
  };

  const capitalizeLabel = (label: string) => {
    return label
      .replace(/([A-Z])/g, ' $1') // Adds a space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalizes the first letter
  };

  // Function to submit updated inventory
  const handleSubmit = () => {
    setUpdating(true); // Start the loading effect
    if (id && formData) {
      const formDataToSend = new FormData();
  
      (Object.keys(formData) as Array<keyof InventoryData>).forEach((key) => {
          formDataToSend.append(key, formData[key] as string);  // Assert that formData[key] is a string
      });
  
      fetch(`${baseApiUrl}/api/v1/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
        body: formDataToSend,  
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success('Inventory updated successfully');
          if(data.code === 500){
            toast(data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating inventory:", error)
          toast.error(error.message)
        })
        .finally(() => setUpdating(false)); // Stop the loading effect
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Mobile Nav */}
      <div className="flex justify-between items-center lg:hidden px-8 pt-4 gap-4">
        <div><img className="w-full" src={IMAGES.IFARMR_LOGO} alt="" /></div>
        <button onClick={openMobileSidebar}><GiHamburgerMenu /></button>
      </div>

      <div className="flex">
        <div className="hidden lg:block lg:w-[16%] pt-4">
          <Sidebar />
        </div>
        <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />

        <div className="pt-10 px-8 md:w-[70%] lg:w-[60.3%] overflow-x-auto ">
          <Link to = '/user/inventory' className='flex items-center gap-2 mb-[22px]'>
            <IoArrowBack onClick={() => navigate('/inventory')} />
            <div className='font-[Raleway] font-[500] leading-[12.91px] text-[11px]'>Back</div>
          </Link>


          <div className='mb-4 font-[Raleway] font-[500] leading-[18.78px] text-[16px]'>Current Inventory</div>

          <div className='p-4 font-[Raleway]'>
            <div className='mb-12' style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                  {formData &&
                    Object.keys(formData)
                      // Filter out 'photoUrl'
                      .filter((key) => key !== 'photoUrl')
                      .filter((key) => key !== 'id')
                      .map((key) => (
                        <React.Fragment key={key}>

                          <div className='p-3 leading-[16.44px] text-[14px]'>{capitalizeLabel(key)}</div>

                          {key === 'itemType' ? (
                            // Render a select dropdown for 'itemType'
                            <select
                              className='bg-[#F2F2F280] font-[500] leading-[16.44px] text-[14px] rounded-[8px] p-3'
                              value={formData[key as keyof InventoryData] || ''}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                handleInputChange(key as keyof InventoryData, e.target.value)
                              }
                            >
                              <option value="EQUIPMENT">EQUIPMENT</option>
                              <option value="LIVESTOCK">LIVESTOCK</option>
                              <option value="CROP">CROP</option>
                            </select>
                          ) : (
                            // Default input for other fields

                            <input
                              className='bg-[#F2F2F280] font-[500] leading-[16.44px] text-[14px] rounded-[8px] p-3'
                              type="text"
                              value={formData[key as keyof InventoryData] || ''}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(key as keyof InventoryData, e.target.value)
                              }
                            />
                          )}
                        </React.Fragment>
                      ))}
            </div>
            <div className='flex justify-end'>
             <button
                className='bg-[#204E51] p-3 font-[500] leading-[16.44px] text-[14px] rounded-[8px] text-white'
                onClick={handleSubmit}
                disabled={updating} // Disable button while updating
              >
                {updating ? <ClipLoader color="#fff" size={18} /> : "Save Changes"}
              </button>
                  </div>
          </div>
        </div>

        <div className="hidden md:block w-[30%] lg:w-[23.7%] pr-4 lg:pr-12 pt-10">
          <UpcomingTask taskType='INVENTORY'
          
          
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
