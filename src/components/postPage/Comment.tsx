import React, { useState } from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

interface CommentProps {
  fullName: string;
  avatar: string | null;
  time: string | undefined;
  content: string;
  commentId: number;
  onReplySubmit: (content: string, parentContentId: number) => void;
  isReply?: boolean;
  replies?: CommentProps[]; 
}

// function to get initials from the user's name
const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
};

// function to generate a random color based on the user's name
const getRandomColor = (name: string) => {
  const colors = ['#F28B82', '#FBBC04', '#34A853', '#4285F4', '#A142F4', '#F9AB00', '#D93A00']; // Example color palette
  const charCodeSum = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

const Comment: React.FC<CommentProps> = ({
  fullName,
  avatar,
  time,
  content,
  commentId,
  onReplySubmit,
  isReply = false,
  replies = [],
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReplySubmit(replyContent, commentId);
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  const getFormattedTimeAgo = (time: string | undefined) => {
    if (!time) return 'Unknown time';
    try {
      const parsedDate = parseISO(time);
      return formatDistanceToNowStrict(parsedDate, { addSuffix: true });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className={`flex-col mb-6 ${isReply ? 'ml-12' : ''}`} style={isReply ? { backgroundColor: '#F2F2F280', padding: '20px', borderRadius: '20px' } : {}}>
      
      {/* Conditional rendering based on isReply */}
      {!isReply ? (
        <div className="flex mb-2">
          {avatar ? (
            <img src={avatar} alt={fullName} className="w-10 h-10 rounded-full mr-4" />
          ) : (
            <div
              className="w-10 h-10 rounded-full text-white flex justify-center items-center mr-4 font-bold"
              style={{ backgroundColor: getRandomColor(fullName) }}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div>
            <span className="block font-semibold text-lg">{fullName}</span>
            <span className="block text-gray-500 text-xs">{getFormattedTimeAgo(time)}</span>
          </div>
        </div>
      ) : (
        <div className="flex mb-2">
          {avatar ? (
            <img src={avatar} alt={fullName} className="w-10 h-10 rounded-full mr-4" />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 text-white flex justify-center items-center mr-4 font-bold"
              style={{ backgroundColor: getRandomColor(fullName) }}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div>
            <span className="block font-semibold text-lg">{fullName}</span>
            <span className="block text-gray-500 text-xs">{getFormattedTimeAgo(time)}</span>
            <p className="text-gray-700 mt-3">{content}</p> 
          </div>
        </div>
      )}

      {/* Main comment text */}
      {!isReply && <p className="text-gray-700">{content}</p>}

      {/* Show Reply Button only for main comments */}
      {!isReply && (
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="text-sm text-gray-600 mt-2 hover:bg-gray-200 p-1 rounded"
        >
          Reply
        </button>
      )}

      {/* Reply Input Box */}
      {showReplyBox && (
        <div className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-4 border rounded-3xl focus:outline-none resize-none focus:border-[#00563E]"
            placeholder="Write a reply..."
            rows={2}
          />
          <button
            onClick={handleReplySubmit}
            className="mt-2 px-4 py-2 bg-[#01815d] text-white rounded-lg hover:bg-[#00563E]"
          >
            Reply
          </button>
        </div>
      )}

      {/* Render Replies */}
      {replies.length > 0 && (
        <div className="mt-4">
          {replies.map((reply) => (
            <Comment
              key={reply.commentId}
              fullName={reply.fullName}
              avatar={reply.avatar}
              time={reply.time}
              content={reply.content}
              commentId={reply.commentId}
              onReplySubmit={onReplySubmit}
              isReply={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
