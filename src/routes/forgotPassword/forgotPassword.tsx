import React, { useState } from 'react';
import signupImage from '../../assets/signupImages/image 5.png';
import farmerIcon from '../../assets/signupImages/f-logo.svg';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../../components/modals/forgotPasswordModal';
import { useAuth } from '../../context/authContext/AuthContext';

const ForgotPassword: React.FC = () => {
  const { baseUrl } = useAuth();  // Using baseUrl from AuthContext
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);  // Reset error message

    try {
      const response = await fetch(`${baseUrl}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      // Check if the request was successful (status 200-299)
      if (response.ok) {
        setIsModalOpen(true);  // Open the modal on success
        setFormData({ email: '' });  // Reset form after showing the modal
      } else {
        // If not successful, show an error message
        setErrorMessage('Failed to send password reset email. Please try again.');
        console.error('Failed request with status:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('An error occurred. Please try again.');
      console.error('Error sending request:', error);
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen mx-auto font-raleway">
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

      <div className="w-full custom-bp:w-1/2 flex flex-col justify-center items-center bg-white" style={{ maxWidth: '670px' }}>
        <form className="bg-white px-8 pt-6 pb-8 mb-4 w-3/4" onSubmit={handleSubmit}>
          <img src={farmerIcon} alt="IFarmr Logo" className="mr-4 ml-32 w-48 h-auto mb-4" />

          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm font-light mr-4 w-1/3" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="appearance-none border rounded-lg w-3/4 py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleInputChange}  // Handle input change
              placeholder="Email"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-[#204E51] hover:bg-opacity-90 text-white mt-4 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center whitespace-nowrap"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Reset Password'}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </form>
      </div>

      <div className="custom-bp:hidden flex absolute inset-0 justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/signupImages/wave.svg')` }}>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <img src={farmerIcon} alt="IFarmr Logo" className="mx-auto w-24 h-auto mb-4" />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-[#e0e0e01f] leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleInputChange}  // Handle input change
              placeholder="Email"
              required
            />
          </div>

          <div className="flex justify-center w-full">
            <button
              className="bg-[#204E51] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Reset Password'}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={formData.email}
      />
    </div>
  );
};

export default ForgotPassword;
