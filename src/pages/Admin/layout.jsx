import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HomeIcon, UserGroupIcon, TrophyIcon, ChatBubbleOvalLeftEllipsisIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import "./admin.css";

export default function AdminLayout() {
  return (
    <div className="custom-dashboard">
      {/* Sidebar */}
      <aside className="custom-sidebar">
        <h2 className="custom-sidebar-title">Admin Panel</h2>
        <ul className="custom-menu-list">
          <li className="custom-menu-item">
            <Link to="/admin">
              <HomeIcon className="custom-menu-icon" /> Dashboard
            </Link>
          </li>
          <li className="custom-menu-item">
            <Link to="/admin/users">
              <UserGroupIcon className="custom-menu-icon" /> Manage Users
            </Link>
          </li>
          <li className="custom-menu-item">
            <Link to="/admin/tournaments">
              <TrophyIcon className="custom-menu-icon" /> Manage Tournaments
            </Link>
          </li>
          <li className="custom-menu-item">
            <Link to="/admin/forum">
              <ChatBubbleOvalLeftEllipsisIcon className="custom-menu-icon" /> Forum Discussions
            </Link>
          </li>
          <li className="custom-menu-item">
            <Link to="/admin/replays">
              <VideoCameraIcon className="custom-menu-icon" /> Replay Management
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="custom-main-content">
        <Outlet />
      </main>
    </div>
  );
}

