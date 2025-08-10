import { Outlet, useLocation } from "react-router-dom"; // Your chat list component
import Chats from "./Chats";

const ChatLayout = () => {
  const location = useLocation();

  // Check if we're on a specific chat detail page
  const isOnChatDetail =
    location.pathname.includes("/chat/") ||
    location.pathname.includes("/profile/");

  return (
    <div className="flex h-screen">
      {/* Chat Sidebar - show on desktop or mobile when not on chat detail */}
      <div
        className={`${
          isOnChatDetail ? "hidden md:block" : "block"
        } w-full md:w-1/3 border-r border-gray-200`}
      >
        <Chats />
      </div>

      {/* Chat Detail Area */}
      <div
        className={`${
          isOnChatDetail ? "block" : "hidden md:block"
        } w-full md:w-2/3`}
      >
        {/* Add bottom padding on mobile to avoid bottom navigation overlap */}
        <div className={`h-full ${!isOnChatDetail ? "pb-16 md:pb-0" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
