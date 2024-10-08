import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';
import Modal from '../../components/signUp/modal';
// import { baseUrl } from '../../utils/apiConfig';

const Signup: React.FC = () => {
  const navigate = useNavigate(); 

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [showTooltip, setShowTooltip] = useState(false);

  // State to track form data (name, username, email, password, confirmPassword)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordMatchError(null);
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!validatePasswords()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/register`, {
        fullName: formData.name, 
        userName: formData.username, 
        email: formData.email,
        password: formData.password,
        gender: formData.gender, 
      });

      console.log('Registration successful:', response.data);
      setIsLoading(false);
      setIsModalOpen(true);

    } catch (error: any) {
      console.log("here is the error ", error)
      setIsLoading(false);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (typeof errorData === 'object') {
          const errorMessages = Object.values(errorData).join(' ');
          setErrorMessage(errorMessages);
        } else if (typeof errorData === 'string') {
          setErrorMessage(errorData);
        }
      } else {
        setErrorMessage('Failed to connect to the server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="flex h-screen mx-auto font-raleway">
      
      {/* Left side: Image and Welcome for large screens */}
      
      <div className="custom-bp:flex hidden custom-bp:w-1/2 bg-customGreen flex-col justify-center items-center relative bg-no-repeat bg-cover" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <h1 className="text-4xl text-[#204E51] font-semibold mb-80 text-center z-10">Welcome to IFarmr</h1>
        <img src={signupImage} alt="Farmers" className="w-2/3 absolute bottom-0 mb-0 z-10" />
      </div>

      {/* Right side: Form for large screens */}
      <div className="w-full custom-bp:w-1/2 flex flex-col justify-center items-center bg-white" style={{ maxWidth: '670px' }}>
        <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 w-3/4">
          <img src={farmerIcon} alt="IFarmr Logo" className="mr-4 ml-32 w-48 h-auto mb-4" />

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="name">Name</label>
            <input name="name" type="text" className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="username">Username</label>
            <input name="username" type="text" className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.username} onChange={handleChange} placeholder="Username" required />
          </div>

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="gender">Gender</label>
            <select name="gender" className="appearance-none border rounded-lg w-3/4 py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="email">Email</label>
            <input name="email" type="email" className="appearance-none border rounded-lg w-3/4 py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="password">Password</label>
            <div className="w-3/4 relative">
              <input name="password" type={showPassword ? 'text' : 'password'} className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.password} onChange={handleChange} onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)}  placeholder="********" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleTogglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>

              {/* Tooltip */}
            {showTooltip && (
              <div className=" hidden custom-bp:block absolute left-0 mt-2 w-full bg-gray-100 border border-gray-300 p-2 rounded-md shadow-md text-sm text-gray-600 z-10">
                Password must include:
                <ul className="list-disc ml-4">
                  <li>At least 1 uppercase letter</li>
                  <li>At least 1 number</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </div>
            )}

            </div>
          </div>

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="confirmPassword">Confirm Password</label>
            <div className="w-3/4 relative">
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.confirmPassword} onChange={handleChange} placeholder="********" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleToggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
          </div>

          {passwordMatchError && <p className="text-red-500 text-xs italic">{passwordMatchError}</p>}

           {/* "Already have an account? Login" */}
           <div className="flex justify-center mt-4 ml-16">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </p>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap" type="submit" disabled={isLoading}>
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Sign Up'}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </form>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} message="You have successfully registered! Check your email to confirm your email address and then proceed to Login. Thank you!" />
      </div>

      {/* For smaller screens: Form floats on background */}
      <div className="custom-bp:hidden flex absolute inset-0 justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <img src={farmerIcon} alt="IFarmr Logo" className="mx-auto w-24 h-auto mb-4" />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="name">Name</label>
            <input name="name" type="text" className="appearance-none border rounded-lg w-full py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="username">Username</label>
            <input name="username" type="text" className="appearance-none border rounded-lg w-full py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.username} onChange={handleChange} placeholder="Username" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">Email</label>
            <input name="email" type="email" className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="gender">Gender</label>
            <select name="gender" className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? 'text' : 'password'} className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.password} onChange={handleChange} onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)}  placeholder="********" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleTogglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>

               {/* Tooltip */}
            {showTooltip && (
              <div className=" block custom-bp:hidden absolute left-0 mt-2 w-full bg-gray-100 border border-gray-300 p-2 rounded-md shadow-md text-sm text-gray-600 z-10">
                Password must include:
                <ul className="list-disc ml-4">
                  <li>At least 1 uppercase letter</li>
                  <li>At least 1 number</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </div>
            )}

            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline" value={formData.confirmPassword} onChange={handleChange} placeholder="********" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleToggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
          </div>

          {passwordMatchError && <p className="text-red-500 text-xs italic">{passwordMatchError}</p>}

           {/* "Already have an account? Login" */}
           <div className="flex justify-center mt-4 mb-4">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </p>
          </div>

          <div className="flex justify-center w-full">
            <button className="bg-[#204E51] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center w-full" type="submit" disabled={isLoading}>
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Sign Up'}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
