import React, { useState, useCallback, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Type definitions
interface User {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount?: number;
}

interface ChatsProps {
  onUserSelect?: (user: User) => void;
  className?: string;
}

// Component
const Chats: React.FC<ChatsProps> = ({ 
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample user data with proper typing
  const users: User[] = useMemo(() => [
    {
      id: '1',
      name: 'Ahmed Ali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey! How are you doing today?',
      timestamp: '2:30 PM',
      isOnline: true,
      unreadCount: 3
    },
    {
      id: '2',
      name: 'Fatima Khan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the help yesterday 😊',
      timestamp: '1:45 PM',
      isOnline: true,
      unreadCount: 1
    },
    {
      id: '3',
      name: 'Muhammad Hassan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Can we meet tomorrow?',
      timestamp: '12:15 PM',
      isOnline: false
    },
    {
      id: '4',
      name: 'Ayesha Malik',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'The project looks great!',
      timestamp: '11:30 AM',
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '5',
      name: 'Usman Sheikh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Let me know when you are free',
      timestamp: '10:20 AM',
      isOnline: false
    },
    {
      id: '6',
      name: 'Zara Ahmad',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Happy birthday! 🎉',
      timestamp: '9:45 AM',
      isOnline: true
    },
    {
      id: '7',
      name: 'Ali Raza',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Good morning everyone!',
      timestamp: 'Yesterday',
      isOnline: false
    },
    {
      id: '8',
      name: 'Sara Ibrahim',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'See you at the office',
      timestamp: 'Yesterday',
      isOnline: false,
      unreadCount: 5
    }
  ], []);

  // Memoized filtered users for performance
  const filteredUsers: User[] = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    return users.filter((user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Event handlers with proper typing
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(target.alt)}&background=10b981&color=fff`;
  }, []);

  return (
    <div className={` h-screen w-full p-2 ${className}`}>
      {/* Search Bar */}
      <div className='w-full bg-white flex items-center gap-3 p-3 rounded-lg shadow-sm mb-3'>
        <FaSearch className='text-gray-400' size={16} />
        <input 
          className='w-full outline-none text-gray-700 placeholder-gray-400' 
          type="text" 
          placeholder='Search chats...' 
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search chats"
        />
      </div>

      {/* Chat List */}
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        <div className='max-h-[calc(100vh-70px)] overflow-y-auto pb-24 md:pb-4 hide-scrollbar'>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: User) => (
              <Link 
              to={`/chatverse/chats/chat/${user.id}`}
                key={user.id}
                className='flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200'
                role="button"
              >
                {/* User Avatar */}
                <div className='relative flex-shrink-0'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-12 h-12 rounded-full object-cover'
                    onError={handleImageError}
                    loading="lazy"
                  />
                  {/* Online Status */}
                  {user.isOnline && (
                    <div 
                      className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'
                      aria-label="Online"
                    />
                  )}
                </div>

                {/* User Info */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-1'>
                    <h3 className='font-semibold text-gray-900 truncate text-sm'>
                      {user.name}
                    </h3>
                    <span className='text-xs text-gray-500 flex-shrink-0'>
                      {user.timestamp}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-600 truncate pr-2'>
                      {user.lastMessage}
                    </p>
                    {/* Unread Count */}
                    {user.unreadCount && user.unreadCount > 0 && (
                      <span 
                        className='bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0'
                        aria-label={`${user.unreadCount} unread messages`}
                      >
                        {user.unreadCount > 99 ? '99+' : user.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='p-8 text-center text-gray-500'>
              <FaSearch className='mx-auto text-4xl mb-4 text-gray-300' />
              <p className='text-lg font-medium'>No chats found</p>
              <p className='text-sm mt-1'>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;