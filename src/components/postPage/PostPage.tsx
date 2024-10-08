import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext/AuthContext'; 
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import CommentSection from './CommentSection';
import Sidebar from '../../components/dashboard/new-sidebar/Sidebar';
import MobileSidebar from '../../components/dashboard/new-sidebar/MobileSidebar'; // Import MobileSidebar
import IMAGES from "../../assets/dashboard/sidebar";
import PopularPosts from '../dashboard/popularPost/PopularPost'; 
import { GiHamburgerMenu } from 'react-icons/gi'; // Import Hamburger Icon

interface PostData {
  title: string;
  content: string;
  photoUrl: string;
  fullName: string;
  likeCount: number;
  userProfileImage: string | null;
}

export interface CommentData {
  fullName: string;
  avatar: string | null;
  dateCreated: string;
  content: string;
  commentId: number;
  replies?: CommentData[]; // Add replies as an array of CommentData
  parentContentId?: number | null; // To handle parent-child relationships
}

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebar] = useState(false); // Mobile sidebar state
  const { token, baseUrl } = useAuth();
  const currentUser = localStorage.getItem('username') || 'Anonymous';

  // Mobile Sidebar Toggle
  const openMobileSidebar = () => setMobileSidebar(true);
  const closeMobileSidebar = () => setMobileSidebar(false);

  // Fetch post, comments, and like status from the backend
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setPostData(response.data);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const organizedComments = organizeComments(response.data);
        setComments(organizedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/posts/${postId}/likes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setIsLiked(response.data.includes(currentUser));
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchPostData();
    fetchComments();
    fetchLikeStatus();
  }, [postId, token, baseUrl, currentUser]);

  // Organize comments and replies
  const organizeComments = (comments: CommentData[]) => {
    const commentMap: { [key: number]: CommentData } = {};
    const mainComments: CommentData[] = [];

    comments.forEach(comment => {
      if (comment.parentContentId === null || comment.parentContentId === 0) {
        comment.replies = [];
        mainComments.push(comment);
      }
      commentMap[comment.commentId] = comment;
    });

    comments.forEach(comment => {
      if (comment.parentContentId && commentMap[comment.parentContentId]) {
        commentMap[comment.parentContentId].replies = commentMap[comment.parentContentId].replies || [];
        commentMap[comment.parentContentId].replies!.push(comment);
      }
    });

    return mainComments;
  };

  // Handle like/unlike action
  const handleLikeToggle = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        console.error('Error: Unable to toggle like');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Handle new comment submit
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      setIsSubmitting(true);

      try {
        const response = await axios.post(`${baseUrl}/api/v1/posts/comment`, {
          postId,
          content: newComment,
          parentContentId: 0, // Ensure main comments have parentContentId as 0 or null
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newCommentData: CommentData = {
          fullName: response.data.fullName,
          avatar: null,
          dateCreated: new Date().toISOString(),
          content: newComment,
          commentId: response.data.commentId,
          parentContentId: 0, // Ensure it's a top-level comment
          replies: [],
        };

        setComments((prevComments) => [...prevComments, newCommentData]); // Add as top-level comment
        setNewComment('');
        setIsTyping(false);
      } catch (error) {
        console.error('Error adding comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (replyContent: string, parentContentId: number) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/posts/comments/reply`, {
        postId,
        content: replyContent,
        parentContentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const newReply: CommentData = {
        fullName: response.data.fullName,
        avatar: null,
        dateCreated: new Date().toISOString(),
        content: replyContent,
        commentId: response.data.commentId,
        parentContentId, // Link it to the parent comment
      };

      setComments((prevComments) =>
        prevComments.map(comment =>
          comment.commentId === parentContentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    setIsTyping(e.target.value.trim().length > 0);
  };

  return (
    <>
      {/* Mobile Nav */}
      <div className="flex justify-between items-center lg:hidden px-8 pt-4 gap-4">
        <div className=""><img className="w-full" src={IMAGES.IFARMR_LOGO} alt="Logo" /></div>
        <button onClick={openMobileSidebar}><GiHamburgerMenu /></button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar (Hidden on Mobile) */}
        <div className="hidden lg:block w-64 flex-shrink-0 pt-4">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />

        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-grow relative mt-11 mx-4 my-4 rounded-lg">
            <main className="p-6 max-w-4xl mx-auto">
              <PostHeader />
              {postData && (
                <PostContent
                  postData={postData}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  onLikeToggle={handleLikeToggle}
                />
              )}

              <div className="mt-6">
                <textarea
                  value={newComment}
                  onChange={handleTextChange}
                  maxLength={1250} 
                  className={`w-full p-4 border rounded-3xl h-auto resize-none focus:outline-none focus:border-gray-500 ${
                    isTyping ? 'border-gray-500' : 'border-gray-300'
                  }`}
                  rows={3}
                  placeholder="Add a comment..."
                />

                {isTyping && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleCommentSubmit}
                      className="px-4 py-2 bg-[#01815d] text-white rounded-lg hover:bg-[#00563E]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Posting...' : 'Comment'}
                    </button>
                  </div>
                )}
              </div>

              <CommentSection comments={comments} onReplySubmit={handleReplySubmit} />
            </main>
          </div>

          <aside className="hidden md:block w-80 p-6">
            <PopularPosts />
          </aside>
        </div>
      </div>
    </>
  );
};

export default PostPage;
