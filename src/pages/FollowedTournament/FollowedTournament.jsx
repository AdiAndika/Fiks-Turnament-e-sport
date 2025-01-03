import React from 'react';
import tournaments from './GameData';
import { useNavigate } from 'react-router-dom';
import './TournamentList.css';
import { Footer } from '@/widgets/layout';

const FollowedTournaments = () => {
  const navigate = useNavigate();

  const followedTournaments = tournaments.filter((tournament) => tournament.followed);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Followed Tournaments</h1>
      </div>
      <div className="tournament-list">
        {followedTournaments.length > 0 ? (
          followedTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="tournament-card"
              onClick={() => navigate(`/followed-tournament/${tournament.id}`)}
            >
              <img
                src={tournament.image}
                alt={tournament.name}
                className="tournament-image"
              />
              <p className="tournament-name">{tournament.name}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            You haven't followed any tournaments yet!
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FollowedTournaments;