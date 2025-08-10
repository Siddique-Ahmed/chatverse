import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Phone, Users, Star, Settings } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/chatverse/chats", icon: MessageCircle, label: "Chats" },
    { path: "/chatverse/calls", icon: Phone, label: "Calls" },
    { path: "/chatverse/status", icon: Users, label: "Status" },
    { path: "/chatverse/starred", icon: Star, label: "Starred" },
    { path: "/chatverse/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? "text-green-500 bg-green-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
