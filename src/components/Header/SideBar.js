import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const unreadCount = useSelector((state) => state.Unread.unreadCount);

  return (
    <div className="sidebar">
      📥 Inbox <span className="badge bg-primary">{unreadCount}</span>
    </div>
  );
};

export default Sidebar;
