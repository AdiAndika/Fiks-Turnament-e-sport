import React from "react";

export default function ReplayManagement() {
  return (
    <>
      <header className="custom-admin-header">
        <h1 className="custom-dashboard-title">Replay Management</h1>
      </header>

      <section className="custom-dashboard-section">
        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Recent Replays</h3>
          <p className="custom-card-description">
            View and manage recently uploaded replays.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Match</th>
                <th>Tournament</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Final: Player1 vs Player2</td>
                <td>Summer Championship</td>
                <td>2023-06-30</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Semi-Final: Player3 vs Player4</td>
                <td>Summer Championship</td>
                <td>2023-06-29</td>
                <td>
                  <button className="custom-button">View</button>
                  <button className="custom-button custom-button-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Upload Replay</h3>
          <p className="custom-card-description">
            Upload and categorize new tournament replays.
          </p>
          <form className="custom-form">
            <div className="custom-form-group">
              <label htmlFor="replayFile">Replay File</label>
              <input type="file" id="replayFile" name="replayFile" className="custom-input" accept=".rep,.zip" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="matchName">Match Name</label>
              <input type="text" id="matchName" name="matchName" className="custom-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="tournament">Tournament</label>
              <select id="tournament" name="tournament" className="custom-input">
                <option value="">Select Tournament</option>
                <option value="1">Summer Championship</option>
                <option value="2">Fall Invitational</option>
              </select>
            </div>
            <button type="submit" className="custom-button">Upload Replay</button>
          </form>
        </div>
      </section>
    </>
  );
}

