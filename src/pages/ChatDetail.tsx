import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiSmile,
  FiPaperclip,
  FiMic,
  FiCheck,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import { LuCheckCheck } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import ChatMenu from "../components/chat_detail/ChatMenu";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isRead: boolean;
  messageType: "text" | "image" | "audio" | "video";
}

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

const ChatDetail: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [chatMenu, setChatMenu] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { chatId } = useParams<string>();

  // Sample user data with proper typing
  const users: User[] = useMemo(
    () => [
      {
        id: "1",
        name: "Ahmed Ali",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Hey! How are you doing today?",
        timestamp: "2:30 PM",
        isOnline: true,
        unreadCount: 3,
      },
      {
        id: "2",
        name: "Fatima Khan",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Thanks for the help yesterday 😊",
        timestamp: "1:45 PM",
        isOnline: true,
        unreadCount: 1,
      },
      {
        id: "3",
        name: "Muhammad Hassan",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Can we meet tomorrow?",
        timestamp: "12:15 PM",
        isOnline: false,
      },
      {
        id: "4",
        name: "Ayesha Malik",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        lastMessage: "The project looks great!",
        timestamp: "11:30 AM",
        isOnline: true,
        unreadCount: 2,
      },
      {
        id: "5",
        name: "Usman Sheikh",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Let me know when you are free",
        timestamp: "10:20 AM",
        isOnline: false,
      },
      {
        id: "6",
        name: "Zara Ahmad",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Happy birthday! 🎉",
        timestamp: "9:45 AM",
        isOnline: true,
      },
      {
        id: "7",
        name: "Ali Raza",
        avatar:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
        lastMessage: "Good morning everyone!",
        timestamp: "Yesterday",
        isOnline: false,
      },
      {
        id: "8",
        name: "Sara Ibrahim",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        lastMessage: "See you at the office",
        timestamp: "Yesterday",
        isOnline: false,
        unreadCount: 5,
      },
    ],
    []
  );

  // Sample messages
  const initialMessages: Message[] = [
    {
      id: "1",
      text: "Hey! How are you doing today?",
      timestamp: "10:30 AM",
      isOwn: false,
      isRead: true,
      messageType: "text",
    },
    {
      id: "2",
      text: "I am doing great! Thanks for asking. How about you?",
      timestamp: "10:32 AM",
      isOwn: true,
      isRead: true,
      messageType: "text",
    },
    {
      id: "3",
      text: "That's wonderful to hear! I'm doing well too.",
      timestamp: "10:33 AM",
      isOwn: false,
      isRead: true,
      messageType: "text",
    },
    {
      id: "4",
      text: "Are we still on for the meeting tomorrow?",
      timestamp: "10:35 AM",
      isOwn: true,
      isRead: true,
      messageType: "text",
    },
    {
      id: "5",
      text: "Yes, absolutely! Looking forward to it.",
      timestamp: "10:36 AM",
      isOwn: false,
      isRead: false,
      messageType: "text",
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-close menu effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      // Don't close if clicking on the menu button itself
      if (menuButtonRef.current && menuButtonRef.current.contains(target)) {
        return;
      }

      // Close menu if clicking anywhere else
      if (chatMenu) {
        setChatMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && chatMenu) {
        setChatMenu(false);
      }
    };

    if (chatMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [chatMenu]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        isRead: false,
        messageType: "text",
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate a response
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: false,
          isRead: false,
          messageType: "text",
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Fix: Properly find and set the user based on userId from params
  useEffect(() => {
    if (chatId) {
      const foundUser = users.find((u) => u.id === chatId);
      setChatUser(foundUser || null);
    }
  }, [chatId, users]);

  // Show loading or error if user not found
  if (!chatUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            {chatId ? "User not found" : "Loading..."}
          </h2>
          <Link
            to="/chatverse/chats"
            className="mt-4 inline-block text-green-500 hover:text-green-600"
          >
            Back to Chats
          </Link>
        </div>
      </div>
    );
  }

  const toggleChatMenu = () => {
    setChatMenu((prev) => !prev);
  };

  const handleMenuClose = () => {
    setChatMenu(false);
  };

  const handleMenuAction = (action: string, userId: number) => {
    console.log(`Menu action: ${action} for user: ${userId}`);
    // Handle different menu actions here
    setChatMenu(false);
  };

  return (
    <div className="flex flex-col relative h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex w-full items-center space-x-3">
          <Link
            to={"/chatverse/chats"}
            className="p-2 hover:bg-gray-100 mr-1 rounded-full transition-colors md:hidden"
          >
            <FiArrowLeft size={16} className="text-gray-600" />
          </Link>

          <div className="relative">
            <img
              src={chatUser.avatar}
              alt={chatUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {chatUser.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div>
            <h3 className="text-sm md:text-md font-semibold text-gray-900">
              {chatUser.name}
            </h3>
            <p className="text-sm text-gray-500">
              {chatUser.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center md:space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Voice Call"
          >
            <FiPhone size={20} className="text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Video Call"
          >
            <FiVideo size={20} className="text-gray-600" />
          </button>

          <button
            ref={menuButtonRef}
            onClick={toggleChatMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiMoreVertical size={20} className="text-gray-600" />
          </button>

          {chatMenu && (
            <ChatMenu
              userId={chatUser.id}
              onClose={handleMenuClose}
              onMenuAction={handleMenuAction}
            />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={`${msg.id}-${index}`}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div
                className={`flex items-center justify-end mt-1 space-x-1 ${
                  msg.isOwn ? "text-green-100" : "text-gray-500"
                }`}
              >
                <span className="text-xs">{msg.timestamp}</span>
                {msg.isOwn &&
                  (msg.isRead ? (
                    <LuCheckCheck size={14} className="text-blue-200" />
                  ) : (
                    <FiCheck size={14} />
                  ))}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiPaperclip size={20} className="text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
              <FiSmile size={20} className="text-gray-600" />
            </button>
          </div>

          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            >
              <FiSend size={20} className="text-white" />
            </button>
          ) : (
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiMic size={20} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
