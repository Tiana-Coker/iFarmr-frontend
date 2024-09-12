import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/globalSpinner/LoadingContext';
import { useNotification } from '../../context/notificationContext/Notification';
import Sidebar from '../dashboard/sidebar/sidebar';
import PopularPosts from '../dashboard/popularPost/PopularPost';
import { FaThumbsUp } from 'react-icons/fa';

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
  const [userPosts, setUserPosts] = useState<any[]>([]); // Store filtered posts
  const [showUserPosts, setShowUserPosts] = useState(false); // Toggle between all posts and user posts
  const [greeting, setGreeting] = useState<string>('');
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInN1YiI6IklraXNlaDEiLCJpYXQiOjE3MjYwOTM2NTUsImV4cCI6MTcyNjE4MDA1NX0.KULExpAYO0blUDMy8uc24YBWULd7q_3PFf6tm5Nj3Vs'; // Example token
  const baseUrl = 'http://localhost:8080';

  const decodedToken = decodeToken(token);
  const userName = decodedToken.sub;

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting(`Good morning, ${userName}`);
    } else if (currentHour < 18) {
      setGreeting(`Good afternoon, ${userName}`);
    } else {
      setGreeting(`Good evening, ${userName}`);
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/v1/posts/user-posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get('content-type');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error('Failed to fetch posts');
        }

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setPosts(data);
          setUserPosts(data.filter((post: any) => post.userName === userName)); // Filter user-specific posts
        }
      } catch (error) {
        showNotification('Error fetching posts data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [baseUrl, token, setLoading, showNotification, userName]);

  const handleShowUserPosts = () => {
    setShowUserPosts(true); // Show only user posts when clicked
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="flex-grow relative mt-11 mx-4 my-4 rounded-lg">
          <main className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">{greeting}</h2>

            {/* My Posts Button */}
            <button
              className="text-blue-500 underline mb-4"
              onClick={handleShowUserPosts}
            >
              My Posts
            </button>

            {/* Posts Section */}
            <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
              {/* Show User Posts if showUserPosts is true */}
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
                // Show all posts if not viewing only user posts
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
        <aside className="w-80 p-6">
          <div className="bg-white rounded-lg">
            <PopularPosts />
          </div>
        </aside>
      </div>
    </div>
  );
};

// PostCard component to render each post
const PostCard = ({ post }: { post: any }) => (
  <div className="bg-white border mb-4 rounded-lg">
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-start p-4">
        <div className="flex flex-col items-start md:items-start mb-4 md:mb-0">
          <div
            className="rounded-full h-12 w-12 flex justify-center items-center text-white font-bold mr-4"
            style={{ backgroundColor: 'blue' }}
          >
            {post.userName ? post.userName.charAt(0).toUpperCase() : ''}
          </div>
          <div className="text-left">
            <p className="text-black-500 font-semibold text-base mt-1">
              {post.title}
            </p>
          </div>
        </div>
        <p className="font-medium text-gray-800 mt-3 ">{post.userName}</p>
      </div>
      <div className="flex-1 flex flex-col items-end p-4">
        <img src={post.photoUrl} alt="Post" className="w-full h-auto rounded-lg mb-4" />
      </div>
    </div>
    <div className="w-full pl-4">
      <p className="text-gray-600 text-left text-lg mt-2">{post.content}</p>
    </div>
    <div className="flex items-center justify-end text-gray-500 mt-4 pr-24 pb-5">
      <div className="flex items-center">
        <FaThumbsUp className="mr-2" />
        <span className="mr-2 text-sm">{post.likeCount} Likes</span>
        <span className="text-sm">{post.commentCount} Comments</span>
      </div>
    </div>
  </div>
);

export default ViewPost;
