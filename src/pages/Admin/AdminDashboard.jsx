import React from "react";
import {
  HomeIcon,
  UserGroupIcon,
  TrophyIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import "./Admin.css";

export default function AdminDashboard() {
  return (
    <div className="custom-dashboard">
      {/* Sidebar */}
      <aside className="custom-sidebar">
        <h2 className="custom-sidebar-title">Admin Panel</h2>
        <ul className="custom-menu-list">
          <li className="custom-menu-item">
            <HomeIcon className="custom-menu-icon" /> Dashboard
          </li>
          <li className="custom-menu-item">
            <UserGroupIcon className="custom-menu-icon" /> Manage Users
          </li>
          <li className="custom-menu-item">
            <TrophyIcon className="custom-menu-icon" /> Manage Tournaments
          </li>
          <li className="custom-menu-item">
            <ChatBubbleOvalLeftEllipsisIcon className="custom-menu-icon" /> Forum Discussions
          </li>
          <li className="custom-menu-item">
            <VideoCameraIcon className="custom-menu-icon" /> Replay Management
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="custom-main-content">
        <header className="custom-admin-header">
          <h1 className="custom-dashboard-title">Welcome, Admin!</h1>
        </header>

        <section className="custom-dashboard-section">
          <div className="custom-dashboard-card">
            <h3 className="custom-card-title">Manage Users</h3>
            <p className="custom-card-description">
              View, edit, and remove users participating in tournaments.
            </p>
          </div>

          <div className="custom-dashboard-card">
            <h3 className="custom-card-title">Manage Tournaments</h3>
            <p className="custom-card-description">
              Create, update, and delete tournament information.
            </p>
          </div>

          <div className="custom-dashboard-card">
            <h3 className="custom-card-title">Forum Discussions</h3>
            <p className="custom-card-description">
              Moderate user posts and manage forum threads.
            </p>
          </div>

          <div className="custom-dashboard-card">
            <h3 className="custom-card-title">Replay Management</h3>
            <p className="custom-card-description">
              Upload, organize, and delete tournament replays.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
