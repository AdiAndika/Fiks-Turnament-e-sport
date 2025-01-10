import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataPrivate } from '@/utils/api'; // Import your API utility
import './TournamentList.css';
import { Footer } from '@/widgets/layout';
import { getImage } from '@/utils/api';

const FollowedTournaments = () => {
  const [followedTournaments, setFollowedTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowedTournaments();
  }, []);

  const fetchFollowedTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await getDataPrivate('/api/v1/tournaments-followed/followed/read'); // Adjust the endpoint as per your API
      if (response?.datas) {
        setFollowedTournaments(response.datas);
      } else {
        setErrMsg("Failed to load followed tournaments.");
      }
    } catch (err) {
      console.error("Error fetching followed tournaments:", err);
      setErrMsg("Error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Followed Tournaments</h1>
      </div>
      <div className="tournament-list">
        {errMsg ? (
          <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
            {errMsg}
          </p>
        ) : followedTournaments.length > 0 ? (
          followedTournaments.map((tournament) => (
            <div
              key={tournament.tournament_id}
              className="tournament-card"
              onClick={() => navigate(`/tournament/${tournament.tournament_id}`)}
            >
              <img
                src={getImage(tournament.tournament_banner_path)}
                alt={tournament.tournament_name}
                className="tournament-image"
              />
              <p className="tournament-name">{tournament.tournament_name}</p>
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
