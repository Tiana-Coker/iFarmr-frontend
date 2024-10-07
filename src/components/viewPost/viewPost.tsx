import React, { useEffect, useState } from 'react';
import { useLoading } from '../../context/globalSpinner/LoadingContext';
import { useNotification } from '../../context/notificationContext/Notification';
import Sidebar from '../../components/dashboard/new-sidebar/Sidebar';
import MobileSidebar from '../../components/dashboard/new-sidebar/MobileSidebar'; 
import PopularPosts from '../dashboard/popularPost/PopularPost';
import IMAGES from "../../assets/dashboard/sidebar";
import PostCard from './PostCard';
import { GiHamburgerMenu } from 'react-icons/gi'; 

const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

const ViewPost: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showUserPosts, setShowUserPosts] = useState(false); // Toggle between user and all posts
  const [isMobileSidebarOpen, setMobileSidebar] = useState(false); // For mobile sidebar
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

  let userName: string | null = null;
  if (token) {
    const decodedToken = decodeToken(token);
    userName = decodedToken.sub;
  }

  // Mobile Sidebar Toggle
  const openMobileSidebar = () => setMobileSidebar(true);
  const closeMobileSidebar = () => setMobileSidebar(false);

  // Fetch All Posts (Paginated)
  useEffect(() => {
    const fetchPosts = async () => {
      if (!showUserPosts && hasMore) {
        setLoading(true);
        try {
          const response = await fetch(`${baseUrl}/api/v1/posts/all?page=${page}&size=10`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }

          const data = await response.json();
          
          if (page === 0) {
            setPosts(data.content); // Set new data for the first page
          } else {
            setPosts((prevPosts) => [...prevPosts, ...data.content]); // Append new data for subsequent pages
          }

          setHasMore(data.content.length > 0); // Check if there are more posts
        } catch (error) {
          showNotification('Error fetching all posts.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [page, showUserPosts, hasMore, baseUrl, token, setLoading, showNotification]);

  // Fetch User Posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (showUserPosts && userName) {
        setLoading(true);
        try {
          const response = await fetch(`${baseUrl}/api/v1/posts/user-posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user posts');
          }

          const data = await response.json();
          setUserPosts(data);
        } catch (error) {
          showNotification('Error fetching user posts.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [showUserPosts, baseUrl, token, userName, setLoading, showNotification]);

  // Handle Infinite Scroll for All Posts
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && !showUserPosts && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle toggling between All Posts and User Posts
  const handleTogglePosts = (showUserPosts: boolean) => {
    setShowUserPosts(showUserPosts);
    setPage(0); // Reset page number
    setPosts([]); // Clear posts when switching views
    setHasMore(true); // Reset hasMore flag for All Posts
  };

  return (
    <>
      {/* Mobile Nav */}
      <div className="flex justify-between items-center lg:hidden px-8 pt-4 gap-4">
        <div className=""><img className="w-full" src={IMAGES.IFARMR_LOGO} alt="Logo" /></div>
        <button onClick={openMobileSidebar}><GiHamburgerMenu /></button>
      </div>

      <div className="flex h-screen bg-white">
        {/* Sidebar (Hidden on Mobile) */}
        <div className="hidden lg:block w-64 flex-shrink-0 pt-4">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-grow relative mt-11 mx-4 my-4 rounded-lg" onScroll={handleScroll}>
            <main className="p-6 max-w-3xl mx-auto">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Posts</h2>
                {/* Toggle Buttons */}
                <div>
                  <button
                    className={`mr-2 ${showUserPosts ? 'bg-[#01815d] text-white' : 'bg-[rgba(32,78,81,0.2)] text-[#204E51]'} px-4 py-2 rounded`}
                    onClick={() => handleTogglePosts(true)} // Call the new handler
                  >
                    My Posts
                  </button>
                  <button
                    className={`${!showUserPosts ? 'bg-[#01815d] text-white' : 'bg-[rgba(32,78,81,0.2)] text-[#204E51]'} px-4 py-2 rounded`}
                    onClick={() => handleTogglePosts(false)} // Call the new handler
                  >
                    All Posts
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
                {/* Show User Posts */}
                {showUserPosts ? (
                  userPosts.length > 0 ? (
                    <>
                      <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
                      {userPosts.map((post, index) => (
                        <PostCard key={index} post={post} />
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-600">You have no posts available.</p>
                  )
                ) : (
                  // Show All Posts with Infinite Scrolling
                  posts.length > 0 ? (
                    <>
                      <h3 className="text-xl font-semibold mb-2">All Posts</h3>
                      {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-600">No posts available.</p>
                  )
                )}
              </div>
            </main>
          </div>

          {/* Right Sidebar for Popular Posts */}
          <aside className="hidden md:block w-80 p-6">
            <div className="bg-white rounded-lg">
              <PopularPosts />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
