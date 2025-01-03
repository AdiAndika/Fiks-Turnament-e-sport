import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamData from '../../../data/DummyData/MemberData';
import './TeamList.css';

const TeamList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tournamentTeams = TeamData.find((data) => data.tournamentId === parseInt(id));

  if (!tournamentTeams) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Registered Team Lists</h1>
        </div>
        <div className="team-list no-teams">
          <div className="team-info">
            <h2 className="team-name">No teams registered for this tournament!</h2>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Registered Team Lists</h1>
      </div>
      <div className="team-list">
        {tournamentTeams.teams.length > 0 ? (
          tournamentTeams.teams.map((team) => (
            <div
              key={team.id}
              className="team-card"
              onClick={() => navigate(`/followed-tournament/${id}/teams/${team.id}`)}
            >
              <div className="team-info">
                <h2 className="team-name">{team.name}</h2>
                <p className="team-origin">Origin: {team.origin}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            No teams registered for this tournament!
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
