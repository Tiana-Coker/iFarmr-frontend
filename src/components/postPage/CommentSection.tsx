import React from 'react';
import Comment from './Comment';
import { CommentData } from './PostPage'; // Import CommentData

interface CommentSectionProps {
  comments: CommentData[];
  onReplySubmit: (content: string, parentContentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onReplySubmit }) => {
  return (
    <div className='mt-4'>
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          fullName={comment.fullName}
          avatar={comment.avatar}
          time={comment.dateCreated}
          content={comment.content}
          commentId={comment.commentId}
          isReply={comment.parentContentId !== null && comment.parentContentId !== 0}
          onReplySubmit={onReplySubmit}
          // Pass replies by mapping them to conform to CommentProps structure
          replies={(comment.replies || []).map(reply => ({
            fullName: reply.fullName,
            avatar: reply.avatar,
            time: reply.dateCreated,
            content: reply.content,
            commentId: reply.commentId,
            onReplySubmit: onReplySubmit, // Handle replies submission
            isReply: true,
          }))}
        />
      ))}
    </div>
  );
};

export default CommentSection;
