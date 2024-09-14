import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNotification } from '../../context/notificationContext/Notification';
import { baseUrl } from '../../utils/apiConfig';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth(); 
  const { showNotification } = useNotification(); // Use the notification context

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        const { token, role } = response.data;

        setToken(token);
        localStorage.setItem('token', token);

        showNotification('Login successful!'); // Show success notification

        setIsLoading(false);

        const userRole = role[0];
        if (userRole === 'USER') {
          navigate('/user/dashboard');
        } else if (userRole === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          setErrorMessage('Unrecognized role. Please contact support.');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      setIsLoading(false);
      showNotification('Failed to login. Please check your credentials and try again.'); // Show error notification
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to login.');
      } else {
        setErrorMessage('Failed to login. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="flex h-screen mx-auto font-sans">
      <div className="w-1/2 bg-customGreen flex flex-col justify-center items-center relative bg-no-repeat bg-cover" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <h1 className="text-4xl text-[#204E51] font-semibold mb-80 text-center z-10">Welcome to IFarmr</h1>
        <img src={signupImage} alt="Farmers" className="w-2/3 absolute bottom-0 mb-0 z-10" />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white" style={{ maxWidth: '670px' }}>
        <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 w-3/4">
          <img src={farmerIcon} alt="IFarmr Logo" className="mr-4 ml-32 w-48 h-auto mb-4" />
          
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required 
            />
          </div>

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
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" onClick={handleTogglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="text-sm">Logging in...</span>
                  <FaSpinner className="animate-spin mr-2 text-sm" />
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
