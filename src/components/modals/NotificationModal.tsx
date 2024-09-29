import React, { useEffect, useState } from 'react';
import { Boxes, TicketCheck, X } from 'lucide-react'; 
import { ThumbsUp, ListTodo, MessageSquareText, Newspaper, Sprout } from 'lucide-react'; 
import { GiCow } from "react-icons/gi";

// Icon mapping
const iconMap: { [key: string]: React.ElementType | string } = {
  post: Newspaper,
  comment: MessageSquareText,
  like: ThumbsUp,
  task: ListTodo,
  crop: Sprout,
  inventory: Boxes,
  livestock: GiCow,
  ticket: TicketCheck,
};

interface Notification {
  id: string;
  icon: string;
  title: string;
  description: string;
  date: string;
  timeAgo: string;
  userFullName: string;
  message: string;
}

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/notifications/recent-activities`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data.slice(0, 5)); // Limit to 5 items
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black backdrop-blur-30 bg-opacity-70 z-50" onClick={handleBackdropClick}></div>

      {/* Modal Content */}
      {/* <div className="fixed top-1/2 left-1/2 font-raleway transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md p-4 rounded-lg z-50 shadow-lg"> */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-sm p-4 rounded-lg shadow-lg md:max-w-sm lg:max-w-md" 
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-raleway font-normal">Notifications</h2>
          <button onClick={onClose} className="text-black hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="mt-4 space-y-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && notifications.length === 0 && <p>No notifications found</p>}

          {notifications.map((notification) => {
            // Find the correct icon from the map
            const IconComponent = iconMap[notification.icon];

            return (
              <div key={notification.id} className="flex items-center space-x-4">
                {/* Notification Icon */}
                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {IconComponent ? (
                    typeof IconComponent === 'string' ? (
                      <img src={IconComponent} alt={`${notification.title} icon`} className="h-6 w-6" />
                    ) : (
                      React.createElement(IconComponent, { className: 'h-7 w-6 text-[rgba(32,78,81,1)]'  })
                    )
                  ) : (
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div> // Default placeholder
                  )}
                </div>

                {/* Notification Content */}
                <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <p className="text-sm font-normal">{notification.title}</p>
          <div className="flex items-end text-xs text-gray-400">
            {notification.timeAgo}
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2">{notification.description}</p>
        <p className="text-xs text-gray-400">{notification.date}</p>
      </div>
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default NotificationModal;
