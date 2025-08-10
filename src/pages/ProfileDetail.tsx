import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiPhone,
  FiVideo,
  FiMessageCircle,
  FiStar,
  FiTrash2,
  FiVolume2,
  FiVolumeX,
  FiUserX,
} from "react-icons/fi";
import { MdLocationOn, MdEmail, MdWork, MdVerified } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  bio: string;
  location?: string;
  work?: string;
  joinDate: string;
  isOnline: boolean;
  lastSeen: string;
  isVerified?: boolean;
  mutualFriends?: number;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  mediaCount: {
    photos: number;
    videos: number;
    documents: number;
  };
}

interface ProfileDetailProps {
  chatId?: number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ chatId = 2 }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const { userId } = useParams();

  // Sample user data
  const sampleUsers: User[] = [
    {
      id: "1",
      name: "Ahmed Ali",
      phone: "+92 300 1234567",
      email: "ahmed.ali@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Software Engineer | Tech Enthusiast | Coffee Lover ☕",
      location: "Karachi, Pakistan",
      work: "Senior Developer at TechCorp",
      joinDate: "January 2020",
      isOnline: true,
      lastSeen: "Online",
      isVerified: true,
      mutualFriends: 12,
      mediaCount: {
        photos: 45,
        videos: 12,
        documents: 8,
      },
    },
    {
      id: "2",
      name: "Fatima Khan",
      phone: "+92 321 9876543",
      email: "fatima.khan@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Graphic Designer | Creative Mind | Art is Life 🎨",
      location: "Lahore, Pakistan",
      work: "UI/UX Designer at CreativeStudio",
      joinDate: "March 2021",
      isOnline: false,
      lastSeen: "Last seen 2 hours ago",
      mutualFriends: 8,
      mediaCount: {
        photos: 89,
        videos: 23,
        documents: 5,
      },
    },
  ];

  useEffect(() => {
    const foundUser = sampleUsers.find((u) => u.id === userId);
    setUser(foundUser || null);
  }, [userId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            User not found
          </h2>
          <button className="mt-4 text-green-500 hover:text-green-600">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleCall = () => {
    console.log(`Calling ${user.name}`);
  };

  const handleVideoCall = () => {
    console.log(`Video calling ${user.name}`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="flex items-center px-4 py-4">
          <Link
            to={`/chatverse/chats/chat/${chatId}`}
            className="p-2 hover:bg-green-700 rounded-full transition-colors mr-2"
          >
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-semibold">Contact Info</h1>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white">
        <div className="flex flex-col items-center py-8 px-6">
          <div className="relative mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {user.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            )}
          </div>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h2>
              {user.isVerified && (
                <MdVerified className="text-blue-500" size={20} />
              )}
            </div>
            <p className="text-gray-600 mb-1">{user.phone}</p>
            <p className="text-sm text-gray-500">{user.lastSeen}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleCall}
              className="flex items-center justify-center w-12 h-12 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
            >
              <FiPhone className="text-green-600" size={20} />
            </button>

            <button
              onClick={handleVideoCall}
              className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
            >
              <FiVideo className="text-blue-600" size={20} />
            </button>

            <Link
              to={`/chatverse/chats/chat/${(chatId = 2)}`}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <FiMessageCircle className="text-gray-600" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {user.bio && (
        <div className="bg-white mt-4 px-6 py-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
          <p className="text-gray-800">{user.bio}</p>
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white mt-4">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Contact Info
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FiPhone className="text-gray-400" size={20} />
              <div>
                <p className="text-gray-800">{user.phone}</p>
                <p className="text-xs text-gray-500">Mobile</p>
              </div>
            </div>

            {user.email && (
              <div className="flex items-center gap-4">
                <MdEmail className="text-gray-400" size={20} />
                <div>
                  <p className="text-gray-800">{user.email}</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-4">
                <MdLocationOn className="text-gray-400" size={20} />
                <div>
                  <p className="text-gray-800">{user.location}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
            )}

            {user.work && (
              <div className="flex items-center gap-4">
                <MdWork className="text-gray-400" size={20} />
                <div>
                  <p className="text-gray-800">{user.work}</p>
                  <p className="text-xs text-gray-500">Work</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="bg-white mt-4">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Media, Links and Docs
            </h3>
            <span className="text-sm text-gray-400">
              {user.mediaCount.photos +
                user.mediaCount.videos +
                user.mediaCount.documents}
            </span>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-800">
                {user.mediaCount.photos}
              </p>
              <p className="text-gray-500">Photos</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">
                {user.mediaCount.videos}
              </p>
              <p className="text-gray-500">Videos</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">
                {user.mediaCount.documents}
              </p>
              <p className="text-gray-500">Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white mt-4">
        <button
          onClick={toggleMute}
          className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          {isMuted ? (
            <FiVolumeX className="text-gray-400" size={20} />
          ) : (
            <FiVolume2 className="text-gray-400" size={20} />
          )}
          <span className="text-gray-800">
            {isMuted ? "Unmute Notifications" : "Mute Notifications"}
          </span>
        </button>

        <button
          onClick={toggleStar}
          className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <FiStar
            className={`${isStarred ? "text-yellow-500" : "text-gray-400"}`}
            size={20}
          />
          <span className="text-gray-800">
            {isStarred ? "Unstar Contact" : "Star Contact"}
          </span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white mt-4 mb-8">
        <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors border-b border-gray-100">
          <FiUserX className="text-red-500" size={20} />
          <span className="text-red-600">Block Contact</span>
        </button>

        <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors">
          <FiTrash2 className="text-red-500" size={20} />
          <span className="text-red-600">Delete Chat</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;
