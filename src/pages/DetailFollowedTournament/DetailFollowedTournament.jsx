import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameData from "../../data/DummyData/GameData"; // Adjust the import path as needed
import "./DetailFollowedTournament.css";

const DetailFollowedTournament = () => {
  const { id } = useParams();
  const tournament = GameData.find((tournament) => tournament.id === parseInt(id));
  const navigate = useNavigate();

  if (!tournament) {
    return (
      <div className="detail-container">
        <h1 className="detail-title">Tournament not found</h1>
      </div>
    );
  }

  const handleSeeRegisteredTeamClick = () => {
    console.log(id); // Debug: Log the ID
    navigate(`/followed-tournament/${id}/teams`); // Ensure this matches the route
  };

  const handleUnfollowClick = () => {
    // Handle unfollow logic
    alert("You have unfollowed this tournament.");
    navigate("/followed-tournaments"); // Redirect to the followed tournaments page
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="detail-image"
        />
        <div className="detail-info">
          <h1 className="detail-title">{tournament.name}</h1>
          <div className="detail-location-time">
            <p className="detail-location">
              <strong>Location:</strong> {tournament.location}
            </p>
            <p className="detail-date-time">
              <strong>Date:</strong> {tournament.date}
            </p>
            <p className="detail-date-time">
              <strong>Time:</strong> {tournament.time}
            </p>
          </div>
          <div className="button-container">
            <button
              className="action-button see-registered-team"
              onClick={handleSeeRegisteredTeamClick}
            >
              See Registered Team
            </button>
            <button
              className="action-button unfollow-button"
              onClick={handleUnfollowClick}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
      <p className="detail-description">{tournament.description}</p>
    </div>
  );
};

export default DetailFollowedTournament;
