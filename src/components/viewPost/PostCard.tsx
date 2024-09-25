import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }: { post: any }) => 
{
  const navigate = useNavigate();  // Use navigate to handle the click

  const handlePostClick = () => {
    console.log('Post ID:', post.id);  // Debugging line
    if (post.id) {
      navigate(`/post/${post.id}`);  // Navigate to post details page
    } else {
      console.error('Post ID is undefined or invalid');
    }
  };  


 return (
  <div className="bg-white border mb-4 rounded-lg cursor-pointer" onClick={handlePostClick}>
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        {/* Image placeholder and Username side by side */}
        <div className="flex items-center mb-2">
          <div
            className="rounded-full h-12 w-12 flex justify-center items-center text-white font-bold mr-4"
            style={{ backgroundColor: 'blue' }}
          >
            {post.userName ? post.userName.charAt(0).toUpperCase() : ''}
          </div>
          <p className="font-medium text-gray-800 text-base">{post.userName}</p>
        </div>
        {/* Post title below both image placeholder and username */}
        <p className="text-black-500 font-semibold text-base mt-2">{post.title}</p>
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
};
export default PostCard;
