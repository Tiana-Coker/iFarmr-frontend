import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';


const Login: React.FC = () => {
  const navigate = useNavigate();

   // State to track form data (username, password)
  const [formData, setFormData] = useState({
    
    username: '',
    password: '',
  });

   // State to handle loading (spinner) during form submission
  const [isLoading, setIsLoading] = useState(false);


  const [errorMessage, setErrorMessage] = useState<string | null>(null);

   // States to manage the visibility of the password and confirm password fields
  const [showPassword, setShowPassword] = useState(false);
  


 // Function to toggle the visibility of the password field
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };


// Function to handle input changes and update the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // Function to handle form submission
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    setErrorMessage(null); // Clear previous error message
  
    try {
      // Make API call to login
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username: formData.username, // Send the username
        password: formData.password, // Send the password
      });
  
      // Check if login was successful and JWT is received
      if (response.data && response.data.token) {
        const { token,role} = response.data;  // Extract the token and message from response
  
        // Store JWT in localStorage 
        localStorage.setItem('token', token);
  
        
        setIsLoading(false); // Stop loading spinner

        
         // Role is an array, get the first element
          const userRole = role[0]; // get the first role (e.g., 'USER' or 'ADMIN')

         // Redirect based on role
         if (userRole === 'USER') {
          navigate('/user/dashboard');
        } else if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          setErrorMessage('Unrecognized role. Please contact support.');
        }
  
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      setIsLoading(false);
     
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to login.');
      } else {
        setErrorMessage('Failed to login. Please check your credentials and try again.');
      }
    }
  };
  

  return (
    <div className="flex h-screen mx-auto font-sans">
      {/* Left section with the image and text */}
      <div className="w-1/2 bg-customGreen flex flex-col justify-center items-center relative bg-no-repeat bg-cover" style={{
      backgroundImage: `url('/src/assets/signupImages/wave.svg')`
      
    }}>
        <h1 className="text-4xl text-[#204E51] font-semibold mb-80 text-center z-10">Welcome to IFarmr</h1>
        <img
          src={signupImage} 
          alt="Farmers"
          className="w-2/3 absolute bottom-0 mb-0 z-10"
        />
     
      </div>

      {/* Right section with the signup form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white" style={{ maxWidth: '670px' }}>
      <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 w-3/4">

       {/* Farmer Icon Logo */}
      <img src={farmerIcon} alt="IFarmr Logo" className="mr-4 ml-32 w-48 h-auto mb-4" />


  {/* Username input field */}
  <div className="mb-2 flex items-center">
    <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="username">
      Username
    </label>
    <input
      name="username"
      type="text"
      className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f]  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
      value={formData.username}
      onChange={handleChange}
      placeholder="Username"
      required 
    />
  </div>


  {/* Password input field */}
  <div className="mb-2 flex items-center">
    <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="password">
      Password
    </label>
    <div className="w-3/4 relative">
    <input
      name="password"
      type={showPassword ? 'text' : 'password'}
      className=" appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
      value={formData.password}
      onChange={handleChange}
      placeholder="********"
      required 
    />
     
    {/* Eye icon to toggle password visibility */}
     <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          onClick={handleTogglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        </div>
  </div>

  


  {/* Error message (if any) */}
    {errorMessage && (
      <div className="text-red-500 text-sm mb-4">
         {errorMessage}
      </div>
     )}

 {/* Submit button with spinner */}
  <div className="flex justify-end">
    <button
      className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap"
      type="submit"
      disabled={isLoading} // Disable button when loading
    >
        {isLoading ? (
              <>
               <span className="text-sm">Logging in...</span>
                <FaSpinner className="animate-spin mr-2 text-sm" /> {/* Spinner icon */}
                
              </>
            ) : (
              "Log In"
            )}
      
    </button>
  </div>
</form>


      </div>
    </div>
  );
};

export default Login;
