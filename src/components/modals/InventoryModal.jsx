import React, { useRef, useState, useEffect } from "react";
import { X, Save, Plus, Calendar,FolderOpen, ChevronDown } from "lucide-react";
import { black, blue, gray, slate } from "tailwindcss/colors";

import CustomDate from "./CustomDate/CustomDate";




const InventoryModal = ({ onClose }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("Select Item");
  const [errors, setErrors] = useState({});

  //for custom dropdaown
	const [selectedValue, setSelectedValue] = useState("");
	function toggleDropdown() {
	  setIsDropdownOpen(!isDropdownOpen);
	}
	function handleSelect(value, label) {
    setErrors((prevErrors) => ({ ...prevErrors, itemType: "" })); // Clear itemType error
	  setSelectedItem(label);
	  setSelectedValue(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemType: value,
    }));
	  setIsDropdownOpen(false);
	}

  //To send form data
  const [formData, setFormData] = useState({
    itemType: "",
    name: "",
    quantity: "",
    cost: "",
    location: "",
    dateAcquired: null,
    currentState: "",
    file: null,
    description:"",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Clear error for the current field
  setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

 // Handle click outside to close the calendar
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
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

   // Function to handle date change
 const handleDateChange = (selectedDate) => {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
  setStartDate(selectedDate);
  setFormData((prevFormData) => ({
    ...prevFormData,
    dateAcquired: formattedDate, // Save the selected date in formData
    
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

  if (!formData.itemType) {
    newErrors.itemType = "Item type is required.";
  }
  if (!formData.name) {
    newErrors.name = "Name is required.";
  }
  if (!formData.quantity) {
    newErrors.quantity = "Quantity is required.";
  }
  if (!formData.cost) {
    newErrors.cost = "Cost is required.";
  }
  if (!formData.location) {
    newErrors.location = "Location is required.";
  }
  if (!formData.currentState) {
    newErrors.currentState = "Current condition is required.";
  }
  if (!formData.file) {
    newErrors.file = "Photo is required.";
  }
  if (!formData.dateAcquired) {
    newErrors.dateAcquired = "Date acquired is required.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // Clear errors if there are none

    setLoading(true);

    const formDataToSend = new FormData();
  for (let key in formData) {
    if (formData[key]) {
      formDataToSend.append(key, formData[key]);
    } else if (key !== 'photoUpload') {
      formDataToSend.append(key, ""); // Avoid sending " This field is empty"
    }
  }

  const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/inventory/create`,
        {
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

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

   // Close the original modal after the success modal is dismissed
const handleCloseSuccessModal = () => {
  setShowSuccessModal(false);
  onClose();  // Close the task creation modal after success modal
};

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-30 z-50 flex justify-center items-center px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col mt-10 text-black bg-white rounded-xl px-2 py-3 items-center w-full max-w-lg">
        <div className="flex items-center justify-between w-full mb-3">
          <h1 className="text-md font-light">Add New Inventory</h1>
          <button onClick={onClose} className="place-self-end">
            <X size={25} />
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="p-2 space-y-2">
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="itemType"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Item Type
              </label>
              <div className='relative ' id='dropdownButton' value={formData.itemType}>
        <div 
          onClick={toggleDropdown}
          required
          className='border border-gray-200 p-1.5 font-light text-sm text-gray-800 bg-gray-100    rounded-lg cursor-pointer  flex justify-between items-center w-[330px] '> 
          {selectedItem} <ChevronDown size={18}/>
        </div> 
        
        
        {isDropdownOpen && (
          <div id='dropdown'
            className='rounded  font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-[300px] shadow-md z-10'>
            <div 
    onClick={() => handleSelect("LIVESTOCK", "Live Stock")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Live Stock
  </div>
  
  <div 
    onClick={() => handleSelect("CROP", "Crop")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Crop
  </div>
  
  <div 
    onClick={() => handleSelect("EQUIPMENT", "Equipment")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Equipment
  </div>
          </div>
        )}
      </div>

            </div>
            {errors.itemType && <p className="text-red-500 text-xs">{errors.itemType}</p>}

            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="name"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                placeholder="Enter name"
                className="w-full pl-2 p-1.5 font-light text-sm border border-gray-200 text-gray-800 rounded-lg  appearance-none  bg-gray-100 shadow-sm focus:outline-none  focus:ring-0 focus:ring-green-700"
              />
              
            </div>
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="quantity"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                
                placeholder="Enter quantity"
                className="w-full pl-2 p-1.5 font-light text-sm border border-gray-200 text-gray-800  rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700 custom-number-input"
              />
               
            </div>
            {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="cost"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Cost
              </label>
              <div className="relative w-full">
              <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-sm text-gray-800">N</span>
              <input
                type="text"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                
                placeholder="Enter amount"
                className="w-full p-1.5 pl-4 font-light text-sm border border-gray-200 text-gray-800 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700 custom-number-input"
              />
              
              </div>
            </div>
            {errors.cost && <p className="text-red-500 text-xs">{errors.cost}</p>}

            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="currentState"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Current Conditon
              </label>
              <input
                type="text"
                name="currentState"
                value={formData.currentState}
                onChange={handleChange}
                
                placeholder="Enter condition"
                className="w-full pl-2 p-1.5 font-light text-sm border border-gray-200 text-gray-800 rounded-lg appearance-none bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
              />
              
            </div>
            {errors.currentState && <p className="text-red-500 text-xs">{errors.currentState}</p>}

            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="location"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                
                placeholder="Enter location"
                className="w-full pl-2 p-1.5 font-light text-sm border border-gray-200 text-gray-800  appearance-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
              />
              
            </div>
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="dateAcquired"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Date Acquired
              </label>
              <div className="relative border border-gray-200 rounded-lg shadow-sm w-full sm:w-full" 
              selected={startDate}
              name="dateAcquired"
              value={formData.dateAcquired}
              onChange={handleDateChange}>
        
        <CustomDate
        onDateChange={handleDateChange}
        className="absolute top-1/2  transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer text-gray-600 z-10"
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      />
      {showCalendar && (
        <div ref={calendarRef} className="relative z-20">
          {/* Display the calendar on top */}
          
            selected={startDate}
            value={formData.dateAcquired}
            onChange={handleDateChange}
          
        </div>
      )}
      </div> 
            </div>
            {errors.dateAcquired && <p className="text-red-500 text-xs">{errors.dateAcquired}</p>}


            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 ">
  <label className="w-full sm:w-1/3 font-extralight text-sm">Photo Upload</label>
  
  <div className=" relative w-full flex justify-between border-gray-200 border text-gray-800 bg-gray-100 rounded-lg pl-1 font-light items-center">
    <span className="truncate  text-sm pl-1 ">
      {formData.file
        ? formData.file.name.length > 22
          ? `${formData.file.name.slice(0, 22)}...` // Truncate file name if it's too long
          : formData.file.name
        : "No file selected"}
    </span>
    
    <input
      type="file"
      className="hidden "
      id="file-upload"
      
      onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
    />
    
    <label
      htmlFor="file-upload"
      className="flex items-center cursor-pointer bg-[rgba(249,112,102,1)] text-white p-1.5 font-extralight text-sm rounded-lg shadow-sm"
    >
        <FolderOpen className="fill-stone-50 w-4 h-4" />
      <span className="ml-2">
        {formData.file ? 'Change File' : 'File Selection'}
      </span>
      
    </label>
    
  </div>
  
</div>
{errors.file && <p className="text-red-500 text-xs">{errors.file}</p>}
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full md:w-1/3  font-extralight text-sm">Description</label>
              {/* <div className="relative w-full sm:w-2/3" > */}
              <textarea
                className="pl-2  relative w-full p-1 border-gray-200 border text-gray-800 rounded-lg  appearance-none text-sm font-light bg-gray-100 shadow-sm focus:outline-none  focus:ring-0 focus:ring-green-700 resize-none "
                rows="2"
                value={formData.description}
                placeholder="Description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {/* </div> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-32 pt-7">
            <div className="flex items-center justify-center w-full">
          <Plus size={20} className="text-gray-500 opacity-0" />
          <input
            
            className="w-full border-none  focus:outline-none focus:ring-0  opacity-0"
            
          />
        </div>
        
              <button
                type="submit"
                disabled={loading}
                className={`flex flex-row items-center justify-center gap-2 text-sm font-extralight text-white bg-[rgba(32,78,81,1)] rounded-lg px-2 py-2 whitespace-nowrap
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
            <h2 className="text-xl font-semibold mb-4">Created Successfully</h2>
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
    </div>
  );
};

export default InventoryModal;
