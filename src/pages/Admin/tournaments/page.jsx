import React from "react";

export default function ManageTournaments() {
  return (
    <>
      <header className="custom-admin-header">
        <h1 className="custom-dashboard-title">Manage Tournaments</h1>
      </header>

      <section className="custom-dashboard-section">
        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Active Tournaments</h3>
          <p className="custom-card-description">
            View and manage ongoing tournaments.
          </p>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Summer Championship</td>
                <td>2023-06-01</td>
                <td>2023-06-30</td>
                <td>
                  <button className="custom-button">Edit</button>
                  <button className="custom-button custom-button-danger">Cancel</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Fall Invitational</td>
                <td>2023-09-15</td>
                <td>2023-09-30</td>
                <td>
                  <button className="custom-button">Edit</button>
                  <button className="custom-button custom-button-danger">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="custom-dashboard-card">
          <h3 className="custom-card-title">Create Tournament</h3>
          <p className="custom-card-description">
            Set up a new tournament with custom rules and settings.
          </p>
          <form className="custom-form">
            <div className="custom-form-group">
              <label htmlFor="tournamentName">Tournament Name</label>
              <input type="text" id="tournamentName" name="tournamentName" className="custom-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" name="startDate" className="custom-input" />
            </div>
            <div className="custom-form-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" className="custom-input" />
            </div>
            <button type="submit" className="custom-button">Create Tournament</button>
          </form>
        </div>
      </section>
    </>
  );
}

