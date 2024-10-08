

import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

const PostCard = ({ post }: { post: any }) => 
{
  const navigate = useNavigate();  // Use navigate to handle the click

  const handlePostClick = () => {
    
    if (post.id) {
      navigate(`/post/${post.id}`);  // Navigate to post details page
    } else {
      console.error('Post ID is undefined or invalid');
    }
  };  

  //function to get initials from the user's name
const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
};

//function to generate a random color based on the user's name
const getRandomColor = (name: string) => {
  const colors = ['#F28B82', '#FBBC04', '#34A853', '#4285F4', '#A142F4', '#F9AB00', '#D93A00']; 
  const charCodeSum = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};


 return (
  <div className="bg-white border mb-4 rounded-lg cursor-pointer font-raleway" onClick={handlePostClick}>
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        {/* Image placeholder and Username side by side */}
        <div className="flex items-center mb-2">
          <div
            className="rounded-full h-12 w-12 flex justify-center items-center text-white font-bold mr-4"
            style={{ backgroundColor: getRandomColor(post.fullName) }}
          >
            {getInitials(post.fullName)}
          </div>
          <p className="font-medium text-gray-800 text-base">{post.fullName}</p>
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
      <span className="text-sm mr-4">{post.commentCount} Comments</span>
        <FaRegHeart className="mr-2" />
        <span className="mr-2 text-sm">{post.likeCount} Likes</span>
       
      </div>
    </div>
  </div>
);
};
export default PostCard;
