import Chats from "./Chats";
import { Outlet, useLocation } from "react-router-dom";

const ChatLayout = () => {
  const location = useLocation();

  const isDetailPage = location.pathname.includes("/chatverse/chats/");

  return (
    <div className="flex h-screen">
      {/* Show chats only if no chat selected OR screen is large */}
      <div
        className={`w-full lg:w-80 border-r border-gray-200 overflow-y-auto ${
          isDetailPage ? "hidden lg:block" : "block"
        }`}
      >
        <Chats />
      </div>

      {/* Show Outlet (Chat Detail) only if chatId exists or screen is large */}
      <div
        className={`flex-1 h-screen items-center justify-center overflow-y-auto ${
          isDetailPage ? "block" : "hidden lg:block"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
