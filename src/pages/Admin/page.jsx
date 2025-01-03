import React from "react";

export default function AdminDashboard() {
  return (
    <>
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
    </>
  );
}

