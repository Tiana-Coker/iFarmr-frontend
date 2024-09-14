import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';
import Modal from '../../components/signUp/modal';

const Signup: React.FC = () => {
  // State to track form data (name, username, email, password, confirmPassword)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  // State to handle loading (spinner) during form submission
  const [isLoading, setIsLoading] = useState(false);

  // State to control whether the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // States to manage the visibility of the password and confirm password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to track if passwords match
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

  // Function to toggle the visibility of the password field
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  // Function to toggle the visibility of the confirm password field
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle visibility for confirm password
  };

  // Function to handle input changes and update the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear password match error on any input change
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordMatchError(null);
    }
  };

  // Function to validate if the passwords match
  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    setErrorMessage(null); // Clear previous error message

    // Validate passwords before proceeding
    if (!validatePasswords()) {
      setIsLoading(false);
      return; // Stop form submission if passwords do not match
    }

    // Perform the API call using axios
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        fullName: formData.name, // Map Name to fullName
        userName: formData.username, // Map Username to userName
        email: formData.email,
        password: formData.password,
        gender: formData.gender, // Send gender value from the form
      });

      console.log('Registration successful:', response.data);
      setIsLoading(false); // Stop loading spinner
      setIsModalOpen(true); // Show success modal

    } catch (error: any) {
      setIsLoading(false);

      // Check if error response exists
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle if errorData is an object (e.g., validation errors)
        if (typeof errorData === 'object') {
          // Convert object to a list of error messages and join them
          const errorMessages = Object.values(errorData).join(' ');
          setErrorMessage(errorMessages);
        }
        // Handle if errorData is a string (e.g., email already exists)
        else if (typeof errorData === 'string') {
          setErrorMessage(errorData);
        }
      } else {
        setErrorMessage('Failed to connect to the server.');
      }
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
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

          {/* iFarmer Icon Logo */}
          <img src={farmerIcon} alt="IFarmr Logo" className="mr-4 ml-32 w-48 h-auto mb-4" />

          {/* Name input field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f]  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          {/* Username input field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f]  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          {/* Gender dropdown */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>

          {/* Email input field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password input field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="w-3/4 relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className=" appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
              />

              {/* Eye icon to toggle confirm password visibility */}
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Display password match error message */}
          {passwordMatchError && (
            <p className="text-red-500 text-xs italic">{passwordMatchError}</p>
          )}

          {/* Submit button */}
          <div className="flex justify-end">
    <button
      className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap"
      type="submit"
      disabled={isLoading} // Disable button when loading
    >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Sign Up'}
            </button>
          </div>

          {/* Display error message */}
          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>
          )}
        </form>

        {/* Success modal */}
        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="You have successfully registered!
        Check your email to confirm your email address and then proceed to Login.
        Thank you!"
      />
      
      </div>
    </div>
  );
};

export default Signup;
