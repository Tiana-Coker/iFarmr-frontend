import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface PostContentProps {
  postData: {
    title: string;
    content: string;
    photoUrl: string;  
    fullName: string;
    userProfileImage: string | null;  
  };
  isLiked: boolean;  
  likeCount: number;  
  onLikeToggle: () => void;  
}

//function to get initials from the user's name
const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
};

//function to generate a random color based on the user's name
const getRandomColor = (name: string) => {
  const colors = ['#F28B82', '#FBBC04', '#34A853', '#4285F4', '#A142F4', '#F9AB00', '#D93A00']; // Example color palette
  const charCodeSum = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

//function to calculate reading time (assuming an average reading speed of 200 words per minute)
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;  // Adjust as needed
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const PostContent: React.FC<PostContentProps> = ({ postData, isLiked, likeCount, onLikeToggle }) => {
  const readingTime = calculateReadingTime(postData.content);  // Calculate reading time

  return (
    <div className="mb-12 font-raleway">
      {/* Post Image */}
      <img src={postData.photoUrl} alt="Post" className="w-full h-64 mb-6 rounded-none object-cover" />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>

      {/* Poster Information */}
      <div className="flex items-center mb-4">
        {/* Show user profile image if available, otherwise show initials with dynamic background color */}
        {postData.userProfileImage ? (
          <img 
            src={postData.userProfileImage} 
            alt="User Avatar" 
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div 
            className="w-12 h-12 flex justify-center items-center rounded-full text-white font-bold mr-4"
            style={{ backgroundColor: getRandomColor(postData.fullName) }}  // Dynamic background color
          >
            {getInitials(postData.fullName)}
          </div>
        )}
        <span className="text-xl font-normal ">{postData.fullName}</span>
      </div>

      {/* Likes and Read Time */}
      <div className="flex items-center mt-6 mb-6 ml-2 text-gray-600">
        <span 
          className="text-2xl mr-2 cursor-pointer" 
          onClick={onLikeToggle}
        >
          {isLiked ? (
            <FaHeart className="text-red-600" />  // Filled heart if liked
          ) : (
            <FaRegHeart className="text-gray-400" />  // Outline heart if not liked
          )}
        </span>
        <span className="ml-2 mr-4 text-[#1A1B1F]">{likeCount} likes</span>
        {/* Display reading time */}
        <span className="text-[#4F4F4F] ml-4">{readingTime} min read</span>
      </div>

      {/* Article Text */}
      <p className="text-lg leading-relaxed text-[#4F4F4F]">{postData.content}</p>
    </div>
  );
};

export default PostContent;
