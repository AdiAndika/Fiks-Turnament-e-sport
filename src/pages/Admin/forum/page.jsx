import React from "react";

export default function ForumDiscussions() {
  return (
    <>
      <header className="custom-admin-header">
        <h1 className="custom-dashboard-title">Forum Discussions</h1>
      </header>

      <section className="custom-dashboard-section">
        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Recent Threads</h3>
          <p className="custom-card-description">
            View and moderate recent forum discussions.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tournament Strategies</td>
                <td>user123</td>
                <td>2023-05-15</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Lock</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>New Player Introduction</td>
                <td>newbie456</td>
                <td>2023-05-14</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Lock</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Reported Posts</h3>
          <p className="custom-card-description">
            Review and take action on reported forum posts.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Post Content</th>
                <th>Reported By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>This post contains inappropriate content...</td>
                <td>moderator1</td>
                <td>2023-05-15</td>
                <td>
                  <button className="custom-button">Review</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Suspected spam content in this post...</td>
                <td>moderator2</td>
                <td>2023-05-14</td>
                <td>
                  <button className="custom-button">Review</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

