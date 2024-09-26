import React, { useRef, useState, useEffect } from "react";
import { X, Save, Plus, Calendar,FolderOpen, ChevronDown } from "lucide-react";

import CustomDate from "./CustomDate/CustomDate";




const TaskModal = ({ onClose }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("Select Category");
    const [errors, setErrors] = useState({});

  //for custom dropdaown
	const [selectedValue, setSelectedValue] = useState("");
	function toggleDropdown() {
	  setIsDropdownOpen(!isDropdownOpen);
	}
	function handleSelect(value, label) {
	  setSelectedItem(label);
	  setSelectedValue(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
	  setIsDropdownOpen(false);
	}

  //To send form data
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    dueDate: null,
    description: "",

  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

 // Handle click outside to close the calendar
  const [startDate, setStartDate] = useState();
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
    dueDate: formattedDate, // Save the selected date in formData
    
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

  if (!formData.title) {
    newErrors.title = "Title is required.";
  }
  if (!formData.location) {
    newErrors.location = "Location is required.";
  }
  if (!formData.category) {
    newErrors.category = "Category is required.";
  }
  if (!formData.dueDate) {
    newErrors.dueDate = "Due date is required.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // Clear errors if there are none

    setLoading(true);
   
       console.log(formData);
    
 
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
  for (let key in formData) {
    if (formData[key] instanceof File) {
      formDataToSend.append(key, formData[key]);
    } else {
      formDataToSend.append(key, formData[key] || " This field is empty"); // Handle empty fields
    }
  }
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/tasks/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Send form data as JSON
      }
    );

      if (response.ok) {
        setSuccess(true);
        setShowSuccessModal(true);
        setLoading(false);
      } else {
        console.error("Error:", response.statusText);
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-30 z-50 flex justify-center items-center px-4 sm:px-6 lg:px-5"
    >
      <div className="flex flex-col mt-10 text-black bg-white rounded-xl px-2 py-3 items-center w-full max-w-md">
        <div className="flex items-center justify-between w-full mb-3">
          <h1 className="text-md font-light">Add New Task</h1>
          <button onClick={onClose} className="place-self-end">
            <X size={25} />
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="p-1 space-y-1.5">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="title"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-1.5 font-light text-sm border border-gray-200 text-gray-800 rounded-lg  appearance-none  bg-gray-100 shadow-sm focus:outline-none  focus:ring-0 focus:ring-green-700"
              />
            </div>
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}

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
                required
                className="w-full p-1.5 font-light text-sm border border-gray-200 text-gray-800  appearance-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-0 focus:ring-green-700"
              />
            </div>
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="category"
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Category
              </label>
              <div className='relative w-full md:w-3/3 ' id='dropdownButton' value={formData.category}>
        <div 
          onClick={toggleDropdown}
          className='border border-gray-200 p-1.5 font-light text-sm text-gray-800 bg-gray-100  border-1  rounded-lg cursor-pointer  flex justify-between items-center w-full '> 
          {selectedItem} <ChevronDown size={18}/>
        </div> 
        
        {isDropdownOpen && (
          <div id='dropdown'
            className='rounded  font-light text-xs border-[1px] border-gray-300 bg-gray-100 absolute top-[40px] w-[300px] shadow-md z-10'>
            <div 
    onClick={() => handleSelect("LIVESTOCK", "LiveStock")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Live Stock
  </div>
  
  <div 
    onClick={() => handleSelect("CROP", "Crop")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Crop
  </div>
  
  <div 
    onClick={() => handleSelect("INVENTORY", "Inventory")}
    className='cursor-pointer font-light hover:bg-green-900 hover:text-white p-1.5'>
    Inventory
  </div>
          </div>
        )}
      </div>
            </div>
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            

            <div className="flex flex-col md:flex-row  items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <label
                htmlFor="dueDate"
              
                className="w-full md:w-1/3 font-extralight text-sm"
              >
                Date
              </label>
              <div className="relative w-full border border-gray-200 rounded-lg sm:w-full"

              selected={startDate}
              name="dueDate"
              value={formData.dueDate}
              onChange={handleDateChange}
            >
        
        <CustomDate
        onDateChange={handleDateChange}
        className="absolute top-1/2  transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer text-gray-600 z-10"
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
        required
      />
      {showCalendar && (
        <div ref={calendarRef} className="relative z-20">
          {/* Display the calendar on top */}
          
            selected={startDate}
            value={formData.dueDate}
            onChange={handleDateChange}
          
          
        </div>
      )}
      </div>
              
            </div>
            {errors.dueDate && <p className="text-red-500 text-xs">{errors.dueDate}</p>}


            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
              <label className="w-full md:w-1/3 font-extralight text-sm">Description</label>
              {/* <div className="relative w-full sm:w-2/3" > */}
              <textarea
                className="pl-2 text-xs relative w-full p-1 border border-gray-200 text-gray-800 rounded-lg  appearance-none  font-light bg-gray-100 shadow-sm focus:outline-none  focus:ring-0 focus:ring-green-700 resize-none "
                rows="3"
                value={formData.description}
                name="description"
                onChange={handleChange}
                // onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {/* </div> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-32 pt-7">
            <div className="flex items-center justify-center w-full">
          <Plus size={20} className="text-gray-500 opacity-0" />
          <input
            type="text"
            className="w-full border-none  focus:outline-none focus:ring-0  opacity-0"
            placeholder="Description"
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

export default TaskModal;
