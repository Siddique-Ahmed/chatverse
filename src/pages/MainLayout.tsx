import { Outlet, useLocation } from "react-router-dom";
import Asidebar from "../components/chatverse/Asidebar";
import BottomNavigation from "../global/BottomNavigation";

const MainLayout = () => {
  const location = useLocation();

  // Check if we're on a specific chat detail page
  const isOnChatDetail =
    location.pathname.includes("/chat/") ||
    location.pathname.includes("/profile/");

  return (
    <div className="flex relative w-full h-screen">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Asidebar />
      </div>

      <div className="w-full">
        <Outlet />
      </div>

      {/* Bottom Navigation - only show on mobile and not on chat details */}
      {!isOnChatDetail && (
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
