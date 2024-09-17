import React, { useEffect, useState } from 'react';
import axios from 'axios';
import threeDotsIcon from '../../assets/adminImages/dots.svg'; 
import { useAuth } from '../../context/authContext/AuthContext'; 

interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  dateJoined: string;
  lastActive: string;
}

const UserDatabase: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Retrieve token, baseUrl, and adminName from AuthContext
  const { token, baseUrl, adminName } = useAuth();

  // Function to determine greeting based on time
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/admin/all-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });  
        if (Array.isArray(response.data.content)) {
          setUsers(response.data.content);
        } else {
          throw new Error('Response is not an array');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setError('User is not authenticated');
      setLoading(false);
    }
  }, [token, baseUrl]);

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <h2 className="text-xl lg:text-2xl font-medium mb-6"> {getGreeting()}, {adminName}</h2>

      {/* Responsive Layout for Small Screens */}
      <div className="block w-full lg:hidden">
        {/* Stacked Layout for Small Screens */}
        {users.map((user) => (
          <div key={user.id} className="bg-white border rounded-lg mb-4 p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">UserID:</span>
              <span>{user.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Username:</span>
              <span>{user.username}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Gender:</span>
              <span>{user.gender === 'MALE' ? 'M' : user.gender === 'FEMALE' ? 'F' : user.gender}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date Joined:</span>
              <span>{user.dateJoined}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Last Active:</span>
              <span>{user.lastActive}</span>
            </div>
            <div className="relative mt-4">
              <button
                className="text-gray-500 focus:outline-none"
                onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
              >
                <img src={threeDotsIcon} alt="Three dots" className="w-5 h-5" />
              </button>
              {openDropdown === user.id && (
                <div className="absolute top-full w-32 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('View clicked')}
                    >
                      View
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('Edit clicked')}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Standard Table for Larger Screens */}
      <div className="hidden lg:block">
        <table className="w-full bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-[#1E1E1E]">
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Date Joined</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-sm text-[#1E1E1E]">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {user.gender === 'MALE' ? 'M' : user.gender === 'FEMALE' ? 'F' : user.gender}
                </td>
                <td className="px-4 py-3">{user.dateJoined}</td>
                <td className="px-4 py-3">{user.lastActive}</td>
                <td className="px-4 py-3 relative">
                  {/* Three Dots Button */}
                  <button
                    className="text-gray-500 focus:outline-none"
                    onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                  >
                    <img src={threeDotsIcon} alt="Three dots" className="w-5 h-5" />
                  </button>
                  {/* Dropdown Menu */}
                  {openDropdown === user.id && (
                    <div className="absolute top-full w-32 bg-white border rounded-md shadow-lg z-50">
                      <ul className="py-1">
                        <li
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => alert('View clicked')}
                        >
                          View
                        </li>
                        <li
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => alert('Edit clicked')}
                        >
                          Edit
                        </li>
                        <li
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDatabase;
