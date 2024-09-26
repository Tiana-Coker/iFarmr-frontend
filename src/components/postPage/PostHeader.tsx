import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostHeader: React.FC = () => {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex items-center mb-6 font-raleway">
      <span className="text-2xl mr-4 cursor-pointer" onClick={handleBack}>
        &larr;
      </span>
      <span className="text-lg cursor-pointer" onClick={handleBack}>
        Back
      </span>
    </div>
  );
};

export default PostHeader;
