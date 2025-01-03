import React from "react";
import { useParams } from "react-router-dom";
import TeamData from "../../../data/DummyData/MemberData"; // Updated import
import './TeamDetail.css'; // New CSS file for this component

const TeamDetail = () => {
  const { id, teamId } = useParams();
  const tournamentTeams = TeamData.find((data) => data.tournamentId === parseInt(id));
  const team = tournamentTeams?.teams.find((t) => t.id === parseInt(teamId));

  if (!team) {
    return <h1>Team not found</h1>;
  }

  return (
    <div className="team-detail-container">
      <div className="team-detail-header">
        <img src={team.imageUrl} alt={team.name} className="team-detail-image" />
        <div className="team-detail-info">
          <h1 className="team-name-detail">{team.name}</h1>
          <p className="team-origin"><strong>Origin:</strong> {team.origin}</p>
        </div>
      </div>
      <div className="team-members">
        <h2 className="members-title">Team Members</h2>
        <ul className="members-list">
          {team.members.map((member, index) => (
            <li key={index} className="member-card">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="member-image"
              />
              <div className="member-info">
                <p className="member-name">{member.name}</p>
                <p className="member-id">ID: {member.id}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetail;
