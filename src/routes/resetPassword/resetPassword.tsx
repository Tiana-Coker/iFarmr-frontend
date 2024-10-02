import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and token retrieval
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons
import signupImage from "../../assets/signupImages/image 5.png";
import farmerIcon from "../../assets/signupImages/f-logo.svg";
import Modal from '../../components/modals/passwordResetModal';

const ResetPassword: React.FC = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  console.log("Token from URL:", token); // Add this line to check the token value
  const { baseUrl } = useAuth(); // Get the base URL from context

  // State for form data
  const [formData, setFormData] = useState<{ password: string; confirmPassword: string }>({
    password: '',
    confirmPassword: ''
  });

  // Loading state, modal state, and error states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordMatchError(null);
    }
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
    setPasswordMatchError("Passwords do not match.");
    setIsLoading(false);
    return;
    }

    // Prepare the request payload with the token
    const payload = {
    newPassword: formData.password,
    confirmNewPassword: formData.confirmPassword,
    token: token, // Include token from the URL in the payload
    };

    try {
    const response = await fetch(`${baseUrl}/api/v1/auth/reset`, { // No longer using token as a query parameter
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send payload in the request body
    });

    if (response.ok) {
        setIsModalOpen(true); // Open modal on success
    } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred while resetting the password.");
    }
    } catch (error) {
    setErrorMessage("An error occurred while resetting the password.");
    } finally {
    setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen mx-auto font-raleway">
      {/* Left section with image */}
      <div
        className="custom-bp:flex hidden custom-bp:w-1/2 bg-customGreen flex-col justify-center items-center relative bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}
      >
        <h1 className="text-4xl text-[#204E51] font-semibold mb-80 text-center z-10">
          Welcome Back
        </h1>
        <img
          src={signupImage}
          alt="Farmers"
          className="w-2/3 absolute bottom-0 mb-0 z-10"
        />
      </div>

      {/* Form Section */}
      <div
        className="w-full custom-bp:w-1/2 flex flex-col justify-center items-center bg-white"
        style={{ maxWidth: "670px" }}
      >
        <form className="bg-white px-8 pt-6 pb-8 mb-4 w-3/4" onSubmit={handleSubmit}>
          <img
            src={farmerIcon}
            alt="IFarmr Logo"
            className="mr-4 ml-32 w-48 h-auto mb-4"
          />

          {/* Password field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="password">
              Password
            </label>
            <div className="w-3/4 relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="w-3/4 relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Save Changes'}
            </button>
          </div>

          {passwordMatchError && <p className="text-red-500 text-xs italic">{passwordMatchError}</p>}
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} email={formData.password} />
    </div>
  );
};

export default ResetPassword;
