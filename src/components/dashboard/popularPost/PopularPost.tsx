import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import icon from '../../../assets/dashboard/icon.svg';

interface Post {
  id: number;
  title: string;
  content: string;
  photoUrl: string;
  dateCreated: string;
  commentCount: number;
  likeCount: number;
  postedBy: UserSummary; // Assuming postedBy contains user details
  commentedBy: UserSummary[];
}

interface UserSummary {
  name: string;
  photoUrl: string | null;
}

interface ErrorResponse {
  message: string;
}

const PopularPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/posts/popular`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setError('Unexpected data format from server.');
        }
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.message || 'Failed to fetch popular posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, [baseUrl, token]);

  const getInitials = (name: string): string => {
    const words = name.split(' ');
    const firstInitial = words[0][0].toUpperCase();
    const lastInitial = words.length > 1 ? words[1][0].toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  // Define an array of colors
  const colors = [
    '#FF5733', // Red-orange
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A6', // Pink
    '#A633FF', // Purple
    '#33FFF6', // Aqua
    '#FFBD33', // Yellow-orange
  ];

  // Function to generate color based on the name
  const getColorForName = (name: string): string => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const timeAgo = (dateCreated: string): string => {
    return moment(dateCreated).fromNow();
  };

  return (
    <div className="popular-posts ">
      <h1>Popular Posts</h1>
      {loading && <p>Loading popular posts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No popular posts.</p>}
      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card bg-white rounded-lg p-4 flex flex-col space-y-2 cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <Link to={`/posts/${post.id}`} className="no-underline flex flex-col">
                <div className="flex flex-row">
                  {/* Post Content on the left */}
                  <div className="flex flex-col flex-1 pr-4">
                    {/* User's Initials */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-md"
                        style={{ backgroundColor: getColorForName(post.postedBy.name) }}
                      >
                        {getInitials(post.postedBy.name)}
                      </div>
                      <p className="text-md font-thin text-black">{post.postedBy.name}</p>
                    </div>

                    {/* Post Title */}
                    <p className="text-custom-big font-thick leading-custom-h text-black">{post.title}</p>

                    {/* Post Content */}
                    <div className="my-2">
                      <p className="text-xs text-gray-500">{timeAgo(post.dateCreated)}</p>
                      <p className="font-raleway text-custom-sm font-verylight text-custom-writing overflow-hidden overflow-ellipsis">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  {/* Image on the right */}
                  {post.photoUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={post.photoUrl}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Interaction section at the bottom */}
                <div className="flex justify-between items-center mt-4">
                  {/* Commented by users */}
                  <div className="flex items-center space-x-1">
                    {post.commentedBy.slice(0, 5).map((user, index) => (
                      <div key={index} className="relative">
                        {user.photoUrl ? (
                          <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover border-2 border-white"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-300 text-xs text-white">
                            {getInitials(user.name)}
                          </div>
                        )}
                      </div>
                    ))}
                    {post.commentedBy.length > 5 && (
                      <span className="text-sm text-gray-500 ml-1">
                        +{post.commentedBy.length - 5} more
                      </span>
                    )}
                    <span className="text-sm text-gray-500 ml-1">
                      {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
                    </span>
                  </div>

                  {/* Likes */}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <img src={icon} alt="Like icon" className="w-5 h-5" />
                    <span>{post.likeCount} likes</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
