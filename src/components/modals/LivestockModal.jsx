import React, { useRef, useState, useEffect } from 'react';
import { Calendar, FolderOpen, Plus, ChevronDown, X, Save } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

import CustomDate from './CustomDate/CustomDate'

const LivestockModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    animalName: '',
    animalType: '',
    breed: '',
    quantity: '',
    age: '',
    feedingSchedule: '',
    wateringFrequency: '',
    vaccinationSchedule: null,
    status: '',
    healthIssues: [],
    description: '',
    photoUpload: null,
  });

  

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  };

  // State to manage which dropdown is open (either 'animal' or 'feeding')
  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});
  // State for selected values
  const [selectedAnimal, setSelectedAnimal] = useState("Select Animal Type");
  const [selectedFeedingSchedule, setSelectedFeedingSchedule] = useState("Select Feeding Schedule");
  const [selectedWateringSchedule, setSelectedWateringSchedule] = useState("Select Watering Frequency");
  const [selectedItem, setSelectedItem] = useState("Select Item");

  // Toggle dropdowns: if the clicked dropdown is already open, close it; otherwise, open it and close the other
  const toggleAnimalDropdown = () => {
    setOpenDropdown(openDropdown === "animal" ? null : "animal");
  };

  const toggleFeedingDropdown = () => {
    setOpenDropdown(openDropdown === "feeding" ? null : "feeding");
  };
  const toggleWateringDropdown = () => {
    setOpenDropdown(openDropdown === "watering" ? null : "watering");
  };

  // State for Animal Type dropdown
  const [isAnimalDropdownOpen, setIsAnimalDropdownOpen] = useState(false);


  // State for Feeding Schedule dropdown
  const [isFeedingDropdownOpen, setIsFeedingDropdownOpen] = useState(false);
  
  // State for Watering Schedule dropdown
  const [isWateringDropdownOpen, setIsWateringDropdownOpen] = useState(false);
  

  // Handle select for Animal Type
  const handleAnimalSelect = (value) => {
    setFormData({ ...formData, animalType: value });
    setSelectedAnimal(value);  // This updates the displayed animal
    setOpenDropdown(null);     // Close the dropdown after selection
  };
  
  const handleFeedingSelect = (value) => {
    setFormData({ ...formData, feedingSchedule: value });
    setSelectedFeedingSchedule(value);  // Update the UI
    setOpenDropdown(null);              // Close the dropdown
  };
  
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
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 
  const [success, setSuccess] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();  // Close the task creation modal after success modal
  };
  
     // Function to handle date change
 const handleDateChange = (selectedDate) => {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
  setStartDate(selectedDate);
  setFormData((prevFormData) => ({
    ...prevFormData,
    vaccinationSchedule: formattedDate, // Save the selected date in formData
    
  }));
};
// Reset form when modal closes
useEffect(() => {
  if (!isOpen) {
    // Reset all form data to initial values when modal closes
    setFormData({
        animalName:'',
      animalType: '',
      breed: '',
      quantity: '',
      age: '',
      feedingSchedule: '',
      wateringFrequency: '',
      vaccinationSchedule: null,
      status: '',
      healthIssues: [],
      description: '',
      photoUpload: null,
    });
    setSelectedAnimal("Select Animal Type");
    setSelectedFeedingSchedule("Select Feeding Schedule");
    setSelectedWateringSchedule("Select Watering Frequency");
    setOpenDropdown(null);
    setErrors({});
    setStartDate(null);
  }
}, [isOpen]);

const closeModal = (e) => {
  if (modalRef.current === e.target) {
    onClose();
  }
};

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
if (!formData.animalName) {
    newErrors.animalName = "Health issue is required.";
    }

  if (!formData.animalType) {
    newErrors.animalType = "Animal type is required.";
  }
  if (!formData.breed) {
    newErrors.breed = "Breed is required.";
  }
  if (!formData.quantity) {
    newErrors.quantity = "Quantity is required.";
  }
  if (!formData.age) {
    newErrors.age = "Age is required.";
  }
  if (!formData.feedingSchedule) {
    newErrors.feedingSchedule = "Feeding Schedule is required.";
  }
  if (!formData.wateringFrequency) {
    newErrors.wateringFrequency = "Watering Frequency is required.";
  }
  if (!formData.photoUpload) {
    newErrors.photoUpload = "Photo is required.";
  }
  if (!formData.vaccinationSchedule) {
    newErrors.vaccinationSchedule = "Vaccination Schedule is required.";
  }
  if (!formData.healthIssues) {
    newErrors.healthIssues = "Health issue is required.";
  }
  

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // Clear errors if there are none
    setLoading(true);


    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    for (let key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        console.log(formDataToSend)
        formDataToSend.append(key, formData[key] ); // Handle empty fields
      }
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
    const response = await fetch(`${baseUrl}/api/v1/livestock/add`, {
       method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify(formData), // Send form data as JSON
          body: formDataToSend, // Send form data as FormData
        }
      );

      if (response.ok) {
        setSuccess(true);
        setShowSuccessModal(true);
        setLoading(false);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setLoading(false);
      }
    } catch (error) {
      console.log([...formDataToSend]);
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
        <div className="bg-white rounded-lg p-2 max-w-md sm:max-w-lg w-full shadow-sm relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-light text-black">Add New Livestock</h2>
            <button className="text-black text-xl cursor-pointer" onClick={onClose}>
              <X className="w-7 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className=" overflow-y-auto h-96 space-y-1 p-2 text-black font-light">

          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full sm:w-1/3 font-extralight text-sm">Animal Name</label>
              <input
                type="text"
                className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700 custom-number-input"
                value={formData.animalName}
                
                placeholder='Enter name'
                onChange={(e) => setFormData({ ...formData, animalName: e.target.value })}
              />
              
            </div>
            {errors.animalName && <p className="text-red-500 text-xs">{errors.animalName}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Animal Type</label>
    <div className="relative w-full sm:w-2/3 "  value={formData.animalType}>
    <div 
            onClick={toggleAnimalDropdown}
            
            className='border border-gray-200 p-1.5 font-light text-xs text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
            {selectedAnimal} <ChevronDown size={18}/>
          </div> 
          
          {openDropdown === 'animal' && (
        <div className="overflow-y-auto h-32 text-xs border-[1px] absolute top-[40px] w-full sm:w-2/3 shadow-md z-10 bg-gray-100  border-gray-300 rounded">
          {['Cattle', 'Sheep', 'Goat', 'Pig', 'Poultry', 'Horse', 'Rabbit', 'Bee', 'Fish', 'Others'].map((type) => (
            <div
              key={type}
              onClick={() => handleAnimalSelect(type.toUpperCase(), type)}
              className="cursor-pointer p-1.5 hover:bg-green-900 hover:text-white"
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  {errors.animalType && <p className="text-red-500 text-xs">{errors.animalType}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Breed</label>
    <input
      type="text"
      className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
      value={formData.breed}
      
      placeholder='Enter breed'
      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
      
    />
  </div>
  {errors.breed && <p className=" text-red-500 text-xs">{errors.breed}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full sm:w-1/3 font-extralight text-sm">Quantity</label>
              <input
                type="text"
                className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700 custom-number-input"
                value={formData.quantity}
                
                placeholder='Enter Quantity'
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
              
            </div>
            {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full sm:w-1/3 font-extralight text-sm">Age</label>
              <input
                type="text"
                className="pl-2 w-full border sm:w-2/3 p-1.5 text-sm border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
                value={formData.age}
                
                placeholder='Enter Age'
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              
            </div>
            {errors.age && <p className="  text-red-500 text-xs">{errors.age}</p>}

            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Feeding Schedule</label>
    <div className="relative w-full sm:w-2/3" id='dropdownButton' value={formData.feedingSchedule}>
      <div 
        onClick={toggleFeedingDropdown}
        
        className='border border-gray-200 p-1.5 font-light text-sm placeholder:text-gray-200 text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
        {selectedFeedingSchedule} <ChevronDown size={18}/>
      </div> 
      
      {openDropdown === "feeding"&& (
        <div id='feedingDropdown'
          className='overflow-y-auto h-32 rounded font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-full sm:w-2/3 shadow-md z-10'>
          <div 
            onClick={() => handleFeedingSelect("EVERYDAY", "Everyday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Everyday
          </div>
          <div 
            onClick={() => handleFeedingSelect("EVERY_MONDAY", "Every Monday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Monday
          </div>
          <div 
            onClick={() => handleFeedingSelect("EVERY_TUESDAY", "Every Tuesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Tuesday
          </div>
          <div 
            onClick={() => handleFeedingSelect("EVERY_WEDNESDAY", "Every Wednesday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Wednesday
          </div>
          <div 
            onClick={() => handleFeedingSelect("EVERY_THURSDAY", "Every Thursday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Thursday
          </div>
          <div 
            onClick={() => handleFeedingSelect("EVERY_FRIDAY", "Every Friday")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Every Friday
          </div>
          <div 
            onClick={() => handleFeedingSelect("TWICE_A_WEEK", "Twice a week")}
            className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
            Twice a week
          </div>
        </div>
      )}
    </div>
  </div>
  {errors.feedingSchedule && <p className="text-red-500 text-xs">{errors.feedingSchedule}</p>}

  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
    <label className="w-full sm:w-1/3 font-extralight text-sm">Watering Frequency</label>
    <div className="relative w-full sm:w-2/3 " id='dropdownButton' value={formData.wateringFrequency}>
      <div 
        onClick={toggleWateringDropdown}
        required
        className='border border-gray-200 p-1.5 font-light text-sm text-gray-800 bg-gray-100  rounded-lg cursor-pointer flex justify-between items-center w-full'> 
        {selectedWateringSchedule} <ChevronDown size={18}/>
      </div> 
      
      {openDropdown === "watering" && (
        <div id='feedingDropdown'
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
      <label className="w-full sm:w-1/3 font-extralight text-sm">Vaccination Schedule</label>
      <div className="relative border border-gray-200 rounded-lg w-full sm:w-2/3"
      selected={startDate}
      name="vaccinationSchedule"
      value={formData.vaccinationSchedule}
      onChange={handleDateChange}>
        
        <CustomDate
        onDateChange={handleDateChange}
        className="absolute top-1/2  transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer text-gray-600 z-10"
        required
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      />
      {showCalendar && (
        <div ref={calendarRef} className="relative z-20">
          {/* Display the calendar on top */}
          
            selected={startDate}
            value={formData.vaccinationSchedule}
            onChange={handleDateChange}
            inline // Inline datepicker display
          
        </div>
      )}
      </div>
      
    </div>
    {errors.vaccinationSchedule && <p className="text-red-500 text-xs">{errors.vaccinationSchedule}</p>}


<div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
  <label className="w-full md:w-1/3 font-extralight text-sm">Health Issues</label>
  <div className="w-full md:w-2/3">
    <div className="flex items-center flex-wrap">
      {formData.healthIssues.map((issue, index) => (
        <span 
          key={index}
          required 
          className="bg-[rgba(192,241,150,0.3)] text-sm border border-[rgba(32,78,81,0.9)] text-[rgba(32,78,81,0.9)] rounded-full p-1 mr-2 mb-2 flex items-center"
        >
          {issue} 
          <X 
            className="ml-1 cursor-pointer w-4 h-4" 
            onClick={() => {
              const issues = formData.healthIssues.filter((_, i) => i !== index);
              setFormData({ ...formData, healthIssues: issues });
            }} 
          />
        </span>
      ))}
      <div className="relative flex items-center w-full">
        <input
          type="text"
          className="pl-2 w-full p-1.5 text-sm border border-gray-200 text-gray-800 rounded-lg appearance-none font-light bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
          placeholder="Add a health issue"
          value={currentIssue}
          onChange={(e) => setCurrentIssue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (currentIssue.trim()) {
                setFormData({ ...formData, healthIssues: [...formData.healthIssues, currentIssue.trim()] });
                setCurrentIssue(''); // Clear input after adding
              }
            }
          }}
        />
        <label
        type='button'
          onClick={() => {
            if (currentIssue.trim()) {
              setFormData({ ...formData, healthIssues: [...formData.healthIssues, currentIssue.trim()] });
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
{errors.healthIssues && <p className="text-red-500 text-xs">{errors.healthIssues}</p>}

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
      id="photoUpload"
      onChange={(e) => setFormData({ ...formData, photoUpload: e.target.files[0] })}
    />
    <label
      htmlFor="photoUpload"
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

export default LivestockModal;
