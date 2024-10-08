import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNotification } from '../../context/notificationContext/Notification';
import { requestFirebaseToken } from '../../utils/firebase';  // Import Firebase token request function

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, setFirebaseToken, baseUrl, userRole, isAuthenticated } = useAuth(); 
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false); // To show the reset password button

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
    setShowResetPassword(false); // Hide reset password button when trying to login

    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
        username: formData.username,
        password: formData.password,
      });
  
      if (response.data && response.data.token) {
        const { token, role, username } = response.data;
  
        setToken(token, username, role[0]); // Pass role to setToken
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', role[0]); // Save user role in localStorage
  
        showNotification('Login successful!');
        setIsLoading(false);
  
        const firebaseToken = await requestFirebaseToken();
        console.log('Firebase token:', firebaseToken);
  
        if (firebaseToken) {
          try {
            await axios.post(`${baseUrl}/token/firebase-save`, {
              token: firebaseToken,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            showNotification('Firebase token saved successfully!');
            setFirebaseToken(firebaseToken); 
          } catch (saveError: any) {
            if (saveError.response && saveError.response.status === 409) {
              console.log('Firebase token already exists. Proceeding with the rest of the flow.');
            } else {
              console.error('Error saving Firebase token:', saveError.message);
            }
          }
        }
  
        // Redirect based on user role
        if (role[0] === 'USER') {
          navigate('/user/dashboard');
        } else if (role[0] === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          setErrorMessage('Unrecognized role. Please contact support.');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      setIsLoading(false);
      showNotification('Failed to login. Please check your credentials and try again.');
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to login.');
      } else {
        setErrorMessage('Failed to login. Please check your credentials and try again.');
      }

      // Show reset password button on login failure
      setShowResetPassword(true);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'USER') {
        navigate('/user/dashboard');
      } else if (userRole === 'ADMIN') {
        navigate('/admin/dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="flex h-screen font-raleway">
      {/* Left side: Image + Welcome for larger screens */}
      <div className="hidden custom-bp:flex custom-bp:w-1/2 bg-customGreen relative bg-no-repeat bg-cover justify-center items-center" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <h1 className="text-4xl text-[#204E51] font-semibold mb-80 text-center z-10">Welcome to IFarmr</h1>
        <img src={signupImage} alt="Farmers" className="absolute bottom-0 w-2/3" />
      </div>

      {/* Right side: Form for larger screens */}
      <div className="w-full custom-bp:w-1/2 flex justify-center items-center bg-white p-4">
        <form onSubmit={handleSubmit} className="bg-white px-4 md:px-8 pt-6 pb-8 mb-4 w-full md:w-3/4">
          <img src={farmerIcon} alt="IFarmr Logo" className="mx-auto w-24 md:w-48 h-auto mb-4" />
          
          <div className="mb-2 flex flex-col md:flex-row items-center">
            <label className="block text-gray-700 text-sm font-light mb-1 md:mb-0 md:mr-4 w-full md:w-1/3" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="appearance-none border rounded-lg w-full md:w-3/4 py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required 
            />
            
          </div>

          <div className="mb-2 flex flex-col md:flex-row items-center">
            <label className="block text-gray-700 text-sm font-light mb-1 md:mb-0 md:mr-4 w-full md:w-1/3" htmlFor="password">
              Password
            </label>
            <div className="w-full md:w-3/4 relative">
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

             {/* Add "Don't have an account?" link */}
             <div className="flex justify-center mt-4 ml-8">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/signup')}
              >
                Register
              </button>
            </p>
          </div>

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
          

          {showResetPassword && (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
          )}
          
          
        </form>
        
      </div>

      {/* For smaller screens: Form floats on background */}
      <div className="custom-bp:hidden absolute inset-0 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <img src={farmerIcon} alt="IFarmr Logo" className="mx-auto w-32 h-auto mb-4" />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="appearance-none border rounded-lg w-full py-2 px-3 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="appearance-none border rounded-lg w-full py-2 px-3 pr-10 bg-[#e0e0e01f] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

          

           <div className="flex justify-center mt-4">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/signup')}
              >
                Register
              </button>
            </p>
          </div>

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

          {showResetPassword && (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="text-[#204E51] hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
