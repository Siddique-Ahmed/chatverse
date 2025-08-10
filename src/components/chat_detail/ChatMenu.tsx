import React from "react";
import {
  FaUser,
  FaInfoCircle,
  FaImages,
  FaTrash,
  FaArchive,
  FaStar,
  FaVolumeMute,
  FaUserSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface ChatMenuProps {
  userId?: string;
  onClose?: () => void;
  onMenuAction?: (action: string, userId: number) => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  link?: string;
  className?: string;
  isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  link = "#",
  className = "",
  isDestructive = false,
}) => {
  const baseClasses =
    "flex items-center gap-3 px-4 py-3 transition-colors w-full text-left";
  const hoverClasses = isDestructive ? "hover:bg-red-50" : "hover:bg-gray-50";
  const textClasses = isDestructive ? "text-red-600" : "text-gray-700";

  return (
    <li>
      <Link
        to={link}
        className={`${baseClasses} ${hoverClasses} ${textClasses} ${className}`}
      >
        <span
          className={`text-lg ${
            isDestructive ? "text-red-600" : "text-gray-600"
          }`}
        >
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
};

const MenuDivider: React.FC = () => (
  <div className="border-t border-gray-100 my-1"></div>
);

const ChatMenu: React.FC<ChatMenuProps> = ({ userId = 2 }) => {
  console.log(userId);
  console.log("ChatMenu rendered with userId:", userId);
  return (
    <div className="absolute top-15 right-7 w-[200px] rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50">
      <ul className="text-sm">
        <MenuItem
          icon={<FaUser />}
          label="View Profile"
          link={`/chatverse/chats/profile/${userId}`}
        />

        <MenuItem
          icon={<FaInfoCircle />}
          label="Chat Info"
          link={`/chatverse/chats/profile/${userId}`}
        />

        <MenuItem
          icon={<FaImages />}
          label="Media & Files"
          link={`/chatverse/chats/profile/${userId}`}
        />

        <MenuItem icon={<FaStar />} label="Star Messages" />

        <MenuDivider />

        <MenuItem icon={<FaVolumeMute />} label="Mute Notifications" />

        <MenuItem icon={<FaArchive />} label="Archive Chat" />

        <MenuDivider />

        <MenuItem
          icon={<FaUserSlash />}
          label="Block User"
          isDestructive={true}
          link="#"
        />

        <MenuItem
          icon={<FaTrash />}
          label="Delete Chat"
          isDestructive={true}
          link="#"
        />
      </ul>
    </div>
  );
};

export default ChatMenu;
