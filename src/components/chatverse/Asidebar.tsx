import React, { useState } from "react";
import {  BiMenu } from "react-icons/bi";
import {
  BsChatDots,
  BsTelephone,
  BsCircle,
  BsStar,
  BsGear,
  BsPerson,
} from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  hasStatus?: boolean;
  href?: string;
}

interface SidebarProps {
  onMenuClick?: (menuId: string) => void;
}

const Asidebar: React.FC<SidebarProps> = () => {
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to check if current path matches the menu item
  const isActiveMenu = (href: string) => {
    return currentPath === href;
  };

  const mainMenuItems: MenuItem[] = [
    {
      id: "chats",
      icon: <BsChatDots size={20} />,
      label: "Chats",
      badge: 1,
      href: "/chatverse/chats",
    },
    {
      id: "calls",
      icon: <BsTelephone size={20} />,
      label: "Calls",
      href: "/chatverse/calls",
    },
    {
      id: "status",
      icon: <BsCircle size={20} />,
      label: "Status",
      hasStatus: true,
      href: "/chatverse/status",
    },
    {
      id: "posts",
      icon: <MdPostAdd size={20} />,
      label: "Posts",
      hasStatus: true,
      href: "/chatverse/posts",
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: "favorites User",
      icon: <BsStar size={20} />,
      label: "Starred messages",
      href: "/chatverse/starred",
    },
    {
      id: "settings",
      icon: <BsGear size={20} />,
      label: "Settings",
      href: "/chatverse/settings",
    },
    {
      id: "profile",
      icon: <BsPerson size={20} />,
      label: "Profile",
      href: "/chatverse/profile",
    },
  ];

  const handleToggleSidebar = (): void => {
    setActiveSidebar(!activeSidebar);
  };

  return (
    <div
      className={`hidden md:block ${
        activeSidebar ? "w-44 lg:w-56 absolute top-0 left-0 lg:relative" : "w-12"
      } h-screen bg-white z-50 text-black flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-4 border-b border-gray-100">
        {activeSidebar && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FaMessage size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-semibold">ChatVerse</h1>
          </div>
        )}
        <button className="p-1 hover:bg-gray-200 cursor-pointer rounded">
          <BiMenu
            onClick={handleToggleSidebar}
            size={20}
            className="text-black"
          />
        </button>
      </div>

      {/* Main Menu Items */}
      <div className="flex-1">
        <nav className="py-2">
          {mainMenuItems.map((item) => {
            const isActive = isActiveMenu(item.href || "");
            return (
              <Link
                key={item.id}
                to={item.href || "#"}
                className={`${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500"
                    : "hover:bg-gray-100"
                } flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 group cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`${
                      isActive
                        ? "text-green-500"
                        : "text-gray-700 group-hover:text-green-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {activeSidebar && (
                    <span className={`text-sm font-medium ${
                      isActive ? "text-green-500" : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Menu Items */}
      <div className="border-t border-gray-200">
        <nav className="py-2">
          {bottomMenuItems.map((item) => {
            const isActive = isActiveMenu(item.href || "");
            return (
              <Link
                key={item.id}
                to={item.href || "#"}
                className={`${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500"
                    : "hover:bg-gray-100"
                } flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 group cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`${
                      isActive
                        ? "text-green-500"
                        : "text-gray-700 group-hover:text-green-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {activeSidebar && (
                    <span className={`text-sm font-medium ${
                      isActive ? "text-green-500" : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Asidebar;