import React, { useRef, useState, useEffect } from 'react';
import { Calendar, FolderOpen, Plus, ChevronDown, X, Save } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
// import "./Livestock.css";
import CustomDate from './CustomDate/CustomDate'

const CropModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    cropName: '',
    cropType: '',
    plantingSeason: '',
    numberOfSeedlings: '',
    costOfSeedlings: '',
    wateringFrequency: '',
    fertilizingFrequency: '',
    harvestDate: null,
    status: '',
    pestAndDiseases: [],
    description: '',
    sowDate:  null,
    photoUpload: null,
    location: '',
    quantity: '',
  
  });

  

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  };

  // State to manage which dropdown is open (either 'animal' or 'feeding')
  const [openDropdown, setOpenDropdown] = useState(false);

  // State for selected values
  const [selectedCrop, setSelectedCrop] = useState("Select Crop Type");
  const [selectedFertilizationSchedule, setSelectedFertilizationSchedule] = useState("Select fertilization Schedule");
  const [selectedWateringSchedule, setSelectedWateringSchedule] = useState("Select Watering Frequency");

  //Ref to click outside
  const wateringDropdownRef = useRef(null);
  const cropDropdownRef = useRef(null);
  const fertilizationDropdownRef = useRef(null);

  // Toggle dropdowns: if the clicked dropdown is already open, close it; otherwise, open it and close the other
  const toggleCropDropdown = () => {
    setOpenDropdown(openDropdown === "crop" ? null : "crop");
  };

  const toggleFertilizationDropdown = () => {
    setOpenDropdown(openDropdown === "fertilization" ? null : "fertilization");
  };
  const toggleWateringDropdown = () => {
    setOpenDropdown(openDropdown === "watering" ? null : "watering");
  };

  

  // Handle select for fertilization Schedule
  const handleCropSelect = (value) => {
    setFormData({ ...formData, cropType: value });
    setSelectedCrop(value);  // Update the UI
    setOpenDropdown(null);               // Close the dropdown
  };
  
  // Handle select for fertilization Schedule
  const handleFertilizationSelect = (value) => {
    setFormData({ ...formData, fertilizingFrequency: value });
    setSelectedFertilizationSchedule(value);  // Update the UI
    setOpenDropdown(null);               // Close the dropdown
  };
  
  // Handle select for Watering Schedule
  const handleWateringSelect = (value) => {
    setFormData({ ...formData, wateringFrequency: value });
    setSelectedWateringSchedule(value);  // Update the UI
    setOpenDropdown(null);               // Close the dropdown
  };
  

  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentIssue, setCurrentIssue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Handle click outside to close the calendar
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowCalendar(false);
        
      }
      if (
        (wateringDropdownRef.current && !wateringDropdownRef.current.contains(event.target)) &&
        (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) &&
        (fertilizationDropdownRef.current && !fertilizationDropdownRef.current.contains(event.target))
      ) {
        setOpenDropdown(null); // Close any open dropdown
      }
       // If an open dropdown exists, check individually for clicks outside it
    if (openDropdown === "watering" && wateringDropdownRef.current && !wateringDropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    } else if (openDropdown === "crop" && cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    } else if (openDropdown === "fertilization" && fertilizationDropdownRef.current && !fertilizationDropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]); 
  const [success, setSuccess] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // Close the parent modal
  };
  
    // Reset form when modal closes
useEffect(() => {
  if (!isOpen) {
    // Reset form data and dropdown selections
  setFormData({
    cropName: '',
    cropType: '',
    plantingSeason: '',
    numberOfSeedlings: '',
    costOfSeedlings: '',
    wateringFrequency: '',
    fertilizingFrequency: '',
    harvestDate: null,
    status: '',
    pestAndDiseases: [],
    description: '',
    sowDate:  null,
    photoUpload: null,
    location: '',
    quantity: '',
  });
  setSelectedCrop("Select Crop Type");
  setSelectedFertilizationSchedule("Select Fertilization Schedule");
  setSelectedWateringSchedule("Select Watering Frequency");
  setErrors({});
  setStartDate(null); // Reset date picker

}
}, [isOpen]);

  

  const closeModal = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      setSelectedCrop("Select Crop Type");
    setSelectedFertilizationSchedule("Select Fertilization Schedule");
    setSelectedWateringSchedule("Select Watering Frequency");
    setOpenDropdown(null); // Ensure all dropdowns are closed
    
      onClose();
    }
  };

    // Function to handle date change
 const handleSowDateChange = (selectedDate) => {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
  setStartDate(selectedDate);
  setFormData((prevFormData) => ({
    ...prevFormData,
    sowDate: formattedDate, // Save the selected date in formData
    
  }));
};
// Function to handle date change
const handleHarvestDateChange = (selectedDate) => {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
  setStartDate(selectedDate);
  setFormData((prevFormData) => ({
    ...prevFormData,
    harvestDate: formattedDate, // Save the selected date in formData
    
  }));
};

const formDataToSend = new FormData();
Object.keys(formData).forEach((key) => {
  if (formData[key] !== null && formData[key] !== '') {
    formDataToSend.append(key, formData[key]);
  }
});

const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.cropName) {
        newErrors.cropName = "Crop name is required.";
        }
    
      if (!formData.cropType) {
        newErrors.cropType = "Crop type is required.";
      }
      if (!formData.plantingSeason) {
        newErrors.plantingSeason = "Planting season is required.";
      }
      if (!formData.harvestDate) {
        newErrors.harvestDate = "Harvest date is required.";
      }
      if (!formData.numberOfSeedlings) {
        newErrors.numberOfSeedlings = "Number of seedlings is required.";
      }
      if (!formData.costOfSeedlings) {
        newErrors.costOfSeedlings = "Cost of seedlings is required.";
      }
      if (!formData.fertilizingFrequency) {
        newErrors.fertilizingFrequency = "Fertilization frequency is required.";
      }
      if (!formData.wateringFrequency) {
        newErrors.wateringFrequency = "Watering Frequency is required.";
      }
      if (!formData.photoUpload) {
        newErrors.photoUpload = "Photo is required.";
      }
      if (!formData.status) {
        newErrors.status = "Status is required.";
      }
      if (!formData.location) {
        newErrors.location = "Location is required.";
      }
      if (!formData.sowDate) {
        newErrors.sowDate = "Sow date is required.";
      }
      if (!formData.pestAndDiseases) {
        newErrors.pestAndDiseases = "Pest and Diseases is required.";
      }
      
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    
      setErrors({}); // Clear errors if there are none

    setLoading(true);

    
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL; 
    try{
    const response = await fetch(`${baseUrl}/api/v1/crops/add`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
    });

    if (response.ok) {
      setSuccess(true);
        setShowSuccessModal(true);
        setLoading(false);
    } else {
      console.log(formData)
      const errorData = await response.json();
      console.error("Error:", errorData);
      setLoading(false);
    }
  } catch (error) {
    console.log([formData]);
    console.error("Error:", error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
  };

  

  return (
    isOpen && (
      <div 
    //   className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-0" 
        className="fixed inset-0 bg-slate-900 bg-opacity-30 backdrop-blur-sm flex justify-center items-center px-4 sm:px-6 lg:px-8" 
        ref={modalRef}
        onClick={closeModal}
      >
        <div className="bg-white rounded-lg p-1 max-w-md sm:max-w-lg w-full shadow-sm relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-light text-black">Add New Crop</h2>
            <button className="text-black text-xl cursor-pointer" onClick={onClose}>
              <X className="w-5 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="overflow-y-auto h-96 space-y-1 p-2 text-black font-light">

          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Crop Name</label>
    <input
      type="text"
      className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.cropName}
      placeholder='Enter Name'
      onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
    />
  </div>
  {errors.cropName && <p className="text-red-500 text-xs">{errors.cropName}</p>}
  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Crop Type</label>
    <div className="relative w-full sm:w-2/3"  ref={cropDropdownRef}>
    <div 
            onClick={toggleCropDropdown}
            className='border border-gray-200 p-1.5 font-light text-sm text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
            {selectedCrop} <ChevronDown size={18}/>
          </div> 

          {openDropdown === "crop" && (
            <div id='cropDropdown'
              className='overflow-y-auto h-32 rounded font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-full sm:w-2/3 shadow-md z-10'>
              <div 
                onClick={() => handleCropSelect("CEREAL", "Cereal")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Cereal
              </div>
              <div 
                onClick={() => handleCropSelect("LEGUME", "Legume")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Legume
              </div>
              <div 
                onClick={() => handleCropSelect("FRUIT", "Fruit")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Fruit
              </div>
              <div 
                onClick={() => handleCropSelect("VEGETABLE", "Vegetable")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Vegetable
              </div>
              <div 
                onClick={() => handleCropSelect("TUBER", "Tuber")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Tuber
              </div>
              <div 
                onClick={() => handleCropSelect("OILSEED", "Oilseed")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Oilseed
              </div>
              <div 
                onClick={() => handleCropSelect("FORAGE_CROP", "Forage Crop")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Forage Crop
              </div>
              <div 
                onClick={() => handleCropSelect("FIBER_CROP", "Fiber Crop")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Fiber Crop
              </div>
              <div 
                onClick={() => handleCropSelect("SPICE", "Spice")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Spice
              </div>
              <div 
                onClick={() => handleCropSelect("MEDICINAL_PLANTP", "Medicinal Plant")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Medicinal Plant
              </div>
              <div 
                onClick={() => handleCropSelect("AROMATIC_PLANTS", "Aromatic Plant")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Aromatic Plant
              </div>
              <div 
                onClick={() => handleCropSelect("PULSES", "Pulses")}
                className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
                Pulses
              </div>
            </div>
          )}
    </div>
  </div>
  {errors.cropType && <p className="text-red-500 text-xs">{errors.cropType}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Plantng Season</label>
    <input
      type="text"
      className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.plantingSeason}
      placeholder='Enter planting season'
      onChange={(e) => setFormData({ ...formData, plantingSeason: e.target.value })}
    />
  </div>
  {errors.plantingSeason && <p className="text-red-500 text-xs">{errors.plantingSeason}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
      <label className="w-full sm:w-1/3 font-extralight text-sm">Harvest Time</label>
      <div className="relative border border-gray-200 rounded-lg w-full sm:w-2/3"
      selected={startDate}
      name="harvestDate"
      value={formData.harvestDate}
      onChange= {handleHarvestDateChange}
      >
        <CustomDate
        onDateChange={handleHarvestDateChange}
        className="absolute top-1/2  transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer text-gray-600 z-10"
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      />
      {showCalendar && (
        <div ref={calendarRef} className="relative z-20">
          {/* Display the calendar on top */}
          
            selected={startDate}
            value={formData.harvestDate}
            onChange={handleHarvestDateChange}
            
            inline // Inline datepicker display
          
        </div>
      )}
      </div>
    </div>
    {errors.harvestDate && <p className="text-red-500 text-xs">{errors.harvestDate}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full sm:w-1/3 font-extralight text-sm">Number of Seedlings</label>
              <input
                type="text"
                className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700 custom-number-input"
                value={formData.numberOfSeedlings}
                
                placeholder='Enter number of Seedlings'
                onChange={(e) => setFormData({ ...formData, numberOfSeedlings: e.target.value })}
              />
            </div>
            {errors.numberOfSeedlings && <p className="text-red-500 text-xs">{errors.numberOfSeedlings}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
  <label className="w-full sm:w-1/3 font-extralight text-sm">Cost of Seedlings</label>
  
  <div className="relative w-full sm:w-2/3">
    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-800">N</span> 
    <input
      type="text"
      className="pl-6 w-full border p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.costOfSeedlings}
      placeholder='Enter Cost'
      onChange={(e) => setFormData({ ...formData, costOfSeedlings: e.target.value })}
    />
  </div>
</div>
            {errors.costOfSeedlings && <p className="text-red-500 text-xs">{errors.costOfSeedlings}</p>}


            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Watering Frequency</label>
    <div className="relative w-full sm:w-2/3" ref={wateringDropdownRef}>
      <div 
        onClick={toggleWateringDropdown}
        
        className='border border-gray-200 p-1.5 font-light text-sm text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
        {selectedWateringSchedule} <ChevronDown size={18}/>
      </div> 

      {openDropdown === "watering" && (
        <div id='wateringDropdown'
          className='overflow-y-auto h-32 rounded font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-full sm:w-2/3 shadow-md z-10'>
          <div 
            onClick={() => handleWateringSelect("EVERYDAY", "Everyday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Everyday
          </div>
          <div 
            onClick={() => handleWateringSelect("EVERY_MONDAY", "Every Monday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Monday
          </div>
          <div 
            onClick={() => handleWateringSelect("EVERY_TUESDAY", "Every Tuesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Tuesday
          </div>
          <div 
            onClick={() => handleWateringSelect("EVERY_WEDNESDAY", "Every Wednesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Wednesday
          </div>
          <div 
            onClick={() => handleWateringSelect("EVERY_THURSDAY", "Every Thursday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Thursday
          </div>
          <div 
            onClick={() => handleWateringSelect("EVERY_FRIDAY", "Every Friday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Friday
          </div>
          <div 
            onClick={() => handleWateringSelect("TWICE_A_WEEK", "Twice a week")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Twice a week
          </div>
        </div>
      )}
    </div>
  </div>
  {errors.wateringFrequency && <p className="text-red-500 text-xs">{errors.wateringFrequency}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Fertlization Frequency</label>
    <div className="relative w-full sm:w-2/3"  ref={fertilizationDropdownRef}>
      <div 
        onClick={toggleFertilizationDropdown}
        
        className='border border-gray-200 p-1.5 font-light text-sm placeholder:text-gray-200 text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
        {selectedFertilizationSchedule} <ChevronDown size={18}/>
      </div> 

      {openDropdown === "fertilization"&& (
        <div id='fertilizationDropdown'
          className='overflow-y-auto h-32 rounded font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-full sm:w-2/3 shadow-md z-10'>
          <div 
            onClick={() => handleFertilizationSelect("EVERYDAY", "Everyday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Everyday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("EVERY_MONDAY", "Every Monday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Monday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("EVERY_TUESDAY", "Every Tuesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Tuesday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("EVERY_WEDNESDAY", "Every Wednesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Wednesday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("EVERY_THURSDAY", "Every Thursday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Thursday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("EVERY_FRIDAY", "Every Friday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Friday
          </div>
          <div 
            onClick={() => handleFertilizationSelect("TWICE_A_WEEK", "Twice a week")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Twice a week
          </div>
        </div>
      )}
    </div>
  </div>
  {errors.fertilizingFrequency && <p className="text-red-500 text-xs">{errors.fertilizingFrequency}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Status</label>
    <input
      type="text"
      className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.status}
      
      placeholder='Enter Status'
      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    />
  </div>
  {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Location</label>
    <input
      type="text"
      className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.location}
      
      placeholder='Enter breed'
      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
    />
  </div>
  {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
      <label className="w-full sm:w-1/3 font-extralight text-sm">Sow Time</label>
      <div className="relative border border-gray-200 rounded-lg w-full sm:w-2/3"
      selected={startDate}
      name="sowDate"
      value={formData.sowDate}
      onChange= {handleSowDateChange}>
        
        <CustomDate
        onDateChange= {handleSowDateChange}
        className="absolute top-1/2  transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer text-gray-600 z-10"
        
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      />
      {showCalendar && (
        <div ref={calendarRef} className="relative z-20">
          {/* Display the calendar on top */}
          
            selected={startDate}
            value={formData.sowDate}
            onChange= {handleSowDateChange}
            inline // Inline datepicker display
          
        </div>
      )}
      </div>
    </div>
{errors.sowDate && <p className="text-red-500 text-xs">{errors.sowDate}</p>}
            


<div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
  <label className="w-full md:w-1/3 font-extralight text-sm">Pest and Diseases</label>
  <div className="w-full md:w-2/3">
    <div className="flex items-center flex-wrap">
      {formData.pestAndDiseases.map((issue, index) => (
        <span 
          key={index}
           
          className="bg-[rgba(192,241,150,0.3)] text-sm border border-[rgba(32,78,81,0.9)] text-[rgba(32,78,81,0.9)] rounded-full p-1 mr-2 mb-2 flex items-center"
        >
          {issue} 
          <X 
            className="ml-1 cursor-pointer w-4 h-4" 
            onClick={() => {
              const issues = formData.pestAndDiseases.filter((_, i) => i !== index);
              setFormData({ ...formData, pestAndDiseases: issues });
            }} 
          />
        </span>
      ))}
      <div className="relative flex items-center w-full">
        <input
          type="text"
          className="pl-2 w-full p-1.5 text-sm border border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
          placeholder="Pests and Diseases"
          value={currentIssue}
          onChange={(e) => setCurrentIssue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (currentIssue.trim()) {
                setFormData({ ...formData, pestAndDiseases: [...formData.pestAndDiseases, currentIssue.trim()] });
                setCurrentIssue(''); // Clear input after adding
              }
            }
          }}
        />
        <label
        type='button'
          onClick={() => {
            if (currentIssue.trim()) {
              setFormData({ ...formData, pestAndDiseases: [...formData.pestAndDiseases, currentIssue.trim()] });
              setCurrentIssue(''); // Clear input after adding
            }
          }}
          className=" absolute flex items-center right-0 justify-center bg-blue-500 text-white p-1.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="ml-1">Add</span>
        </label>
      </div>
    </div>
  </div>
</div>
{errors.pestAndDiseases && <p className="text-red-500 text-xs">{errors.pestAndDiseases}</p>}

<div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
  <label className="w-full sm:w-1/3 font-extralight text-sm">Photo Upload</label>
  <div className="relative w-full sm:w-2/3 flex justify-between  bg-gray-100 rounded-lg pl-1 font-extralight items-center">
    <span className="truncate text-sm pl-1">
      {formData.photoUpload
        ? formData.photoUpload.name.length > 22
          ? `${formData.photoUpload.name.slice(0, 22)}...` // Truncate file name if it's too long
          : formData.photoUpload.name
        : "No file selected"}
      
    </span>
    <input
      type="file"
      className="hidden border border-gray-200"
      id="file-upload"
      onChange={(e) => setFormData({ ...formData, photoUpload: e.target.files[0] })}
    />
    <label
      htmlFor="file-upload"
      className="flex items-center cursor-pointer   bg-[rgba(249,112,102,1)] text-white p-1.5 font-extralight text-sm rounded-lg shadow-sm"
    >
        <FolderOpen className="fill-stone-50 w-4 h-4" />
      <span className="ml-2 ">
        {formData.photoUpload ? 'Change File' : 'File Selection'}
      </span>
      
    </label>
  </div>
</div>
{errors.photoUpload && <p className="text-red-500 text-xs">{errors.photoUpload}</p>}



            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full sm:w-1/3 font-extralight text-sm">Description</label>
              <div className="relative w-full sm:w-2/3" >
              <textarea
                className="pl-2  w-full p-1 border border-gray-200 text-gray-800 rounded-lg text-sm appearance-none  font-light bg-gray-100 shadow-sm focus:outline-none  focus:ring-0 focus:ring-green-700 resize-none "
                rows="2"
                placeholder='Description'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              </div>
            </div>

            <div className="flex justify-end sm:flex-row gap-y-4 sm:gap-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 text-sm font-extralight text-white bg-[rgba(32,78,81,1)] rounded-lg px-1 py-2 whitespace-nowrap
                ${loading ? "bg-[rgba(32,78,81,1)]" : "bg-[rgba(32,78,81,1)] hover:bg-green-900"}`}
                style={{ minWidth: '133px' }}
              >
                {!loading && <Save size={18} />}
                {loading ? <LoadingSpinner /> : "Save Changes"}
              </button>
            </div>
          </form>
          {/* success modal */}
          {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl text-black font-semibold mb-4">Created Successfully</h2>
            <button
              onClick={handleCloseSuccessModal}
              className="bg-[rgba(32,78,81,1)] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    )
  );
};

export default CropModal;
