import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import upload from '../../assets/images/upload.svg';
import { useLoading } from '../../context/globalSpinner/LoadingContext';
// import { useAuth } from '../../context/authContext/AuthContext';
import { useNotification } from '../../context/notificationContext/Notification';
import Sidebar from '../dashboard/sidebar/sidebar';
import PopularPosts from '../dashboard/popularPost/PopularPost';

const UploadSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { setLoading } = useLoading();
  // const { token, baseUrl } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token'); // Get token directly from localStorage


  const userName = 'John Doe';
  const userInitials = getInitials(userName);
  const profileColor = getColorForName(userName);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      setUploadProgress(0);
      const uploadSimulator = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(uploadSimulator);
            return 100;
          }
          return prevProgress + Math.random() * 10;
        });
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !description || !title) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', description);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        setLoading(false);
        if (xhr.status === 200) {
          showNotification('Post created successfully!');
          setFile(null);
          setDescription('');
          setTitle('');
          setUploadProgress(0);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        } else {
          showNotification('There was an error creating the post. Please try again.');
        }
      };

      xhr.onerror = () => {
        setLoading(false);
        showNotification('There was an error creating the post. Please try again.');
      };

      xhr.open('POST', `${baseUrl}/api/v1/posts`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    } catch (error) {
      setLoading(false);
      console.error(error);
      showNotification('There was an error creating the post. Please try again.');
    }
  };
  return (
    <div className="flex h-screen bg-white-100 ">
      <Sidebar className="w-20  mr-0 flex-shrink-0" />
      
      <div className="flex-grow flex flex-col md:flex-row ">
        <main className="flex-grow p-0  ml-0  md:ml-8">
          <div className="bg-white rounded-lg  p-6 max-w-3xl  md:mr-8 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
                ← Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <img src={upload} alt="Upload" className="h-12 w-12 mx-auto mb-4" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
                  Drop your files here or browse
                </label>
                <p className="text-sm text-gray-400 mt-2">Maximum size: 50MB</p>
                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-600 text-lg"
                />
              </div>

              <div className="flex items-center">
                <div
                  className="rounded-full h-10 w-10 flex justify-center items-center text-white font-bold mr-4"
                  style={{ backgroundColor: profileColor }}
                >
                  {userInitials}
                </div>
                <p className="font-medium text-gray-800">You</p>
              </div>

              <div className="mt-8">
                <p className='text-gray-400'>Description</p>
  <textarea
    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-600 text-lg"
    placeholder="Type here.."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={1}  // Adjust the number of rows for initial height
  ></textarea>
</div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </main>
        
        <aside className="md:w-80 p-6 ">
          <div className="bg-white rounded-lg ">
            <PopularPosts />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UploadSection;

function getInitials(name: string): string {
  const words = name.split(' ');
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial = words.length > 1 ? words[1][0].toUpperCase() : '';
  return firstInitial + lastInitial;
}

function getColorForName(name: string): string {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#33FFF6', '#FFBD33',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}