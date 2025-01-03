import React from "react";

export default function ManageUsers() {
  return (
    <>
      <header className="custom-admin-header">
        <h1 className="custom-dashboard-title">Manage Users</h1>
      </header>

      <section className="custom-dashboard-section">
        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">User List</h3>
          <p className="custom-card-description">
            View and manage all registered users.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>user1</td>
                <td>user1@example.com</td>
                <td>
                  <button className="custom-button">Edit</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>user2</td>
                <td>user2@example.com</td>
                <td>
                  <button className="custom-button">Edit</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">User Statistics</h3>
          <p className="custom-card-description">
            View user engagement and activity statistics.
          </p>
          <ul className="custom-stats-list">
            <li>Total Users: 1,234</li>
            <li>Active Users (last 30 days): 789</li>
            <li>New Users (last 30 days): 56</li>
          </ul>
        </div>
      </section>
    </>
  );
}

