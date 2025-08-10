import React from "react";
import { BiHeart, BiPhone, BiSend, BiShield, BiVideo } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";


interface ChatVerseDetailProps {
  className?: string;
}

const ChatVerseDetail: React.FC <ChatVerseDetailProps>=({className}) => {
  return (
    <div className={`${className}`}>
      <div className="text-center max-w-md w-full">
        {/* Logo Section */}
        <div className="mx-auto mb-12">
          <div className="w-48 h-48 mx-auto mb-8 relative">
            {/* Circle with icons */}
            <div className="w-full h-full rounded-full border border-green-500/30 flex items-center justify-center relative">
              {/* Central logo */}
              <div className="text-5xl font-bold text-green-400">CV</div>

              {/* Icons around the circle */}
              <div className="absolute inset-0">
                <LuMessageCircle
                  size={20}
                  className="text-green-400 absolute top-4 left-1/2 transform -translate-x-1/2"
                />
                <FaUsers
                  size={20}
                  className="text-green-400 absolute top-8 right-8"
                />
                <BiPhone
                  size={20}
                  className="text-green-400 absolute right-4 top-1/2 transform -translate-y-1/2"
                />
                <BiVideo
                  size={20}
                  className="text-green-400 absolute bottom-8 right-8"
                />
                <BiSend
                  size={20}
                  className="text-green-400 absolute bottom-4 left-1/2 transform -translate-x-1/2"
                />
                <BiShield
                  size={20}
                  className="text-green-400 absolute bottom-8 left-8"
                />
                <FiZap
                  size={20}
                  className="text-green-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <BiHeart
                  size={20}
                  className="text-green-400 absolute top-8 left-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl font-normal text-gray-900">
            Welcome to ChatVerse
          </h1>

          <p className="text-gray-600 text-base max-w-sm mx-auto leading-relaxed">
            A simple, reliable, and private way to use ChatVerse on your
            computer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatVerseDetail;
