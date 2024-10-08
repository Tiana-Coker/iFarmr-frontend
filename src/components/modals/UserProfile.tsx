import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [existingProfilePictureUrl, setExistingProfilePictureUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add a request interceptor to include the token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Adjust the key if needed
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch user data when modal opens
  useEffect(() => {
    if (isOpen) {
      axiosInstance
        .get('/api/v1/user/get-user-details')
        .then((response) => {
          const data = response.data;
          setFormData({
            fullName: data.fullName || '',
            username: data.username || '',
            email: data.email || '',
            bio: data.bio || '',
            password: '',
            confirmPassword: '',
            gender: data.gender || '',
          });
          setExistingProfilePictureUrl(data.profilePictureUrl || null);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isOpen]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      // Optional: Preview the selected image
      setExistingProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Prepare form data for submission
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('username', formData.username);
    submitData.append('bio', formData.bio);
    submitData.append('password', formData.password);
    submitData.append('gender', formData.gender);

    // If profile picture is selected, include it
    if (profilePicture) {
      submitData.append('file', profilePicture);
    }

    // Send data to backend
    axiosInstance
      .put('/api/v1/user/edit-user-details', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        // Handle success
        setShowSuccessModal(true);
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
      });
  };

  if (!isOpen) return null;

  // Success Modal Component
  const SuccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Success</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-4">Your profile has been updated successfully.</p>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <form
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {existingProfilePictureUrl ? (
                <img
                  src={existingProfilePictureUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Add Photo
                </span>
              )}
              {/* File input for profile picture */}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePictureChange}
              />
            </div>
          </div>

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ayomide Fasan"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="AyomideFasan123"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            />
          </div>

          {/* Email Input (Read-only) */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Bio Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="farm.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
              />
              <button
                type="button"
                onClick={handleToggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-modal-green text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            onClose(); // Close the ProfileModal
          }}
        />
      )}
    </>
  );
};

export default ProfileModal;
