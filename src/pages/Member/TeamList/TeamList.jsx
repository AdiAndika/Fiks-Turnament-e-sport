import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TeamList.css';
import { getDataPrivate } from '@/utils/api';

const TeamList = () => {
  const { id } = useParams(); // Get the tournament ID from the URL
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]); // Store the fetched team list
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errMsg, setErrMsg] = useState(""); // Track error messages

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    setIsLoading(true);
    getDataPrivate(`/api/v1/teams/read/${id}`)
        .then((resp) => {
            setIsLoading(false);
            if (resp?.datas) {
                setTeams(resp?.datas);
            } else {
                setErrMsg("Can't fetch data");
            }
        })
        .catch((err) => {
            setIsLoading(false);
            setErrMsg("Data fetch failed");
            console.log(err);
        });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (errMsg) {
    return <h1>{errMsg}</h1>;
  }

  if (teams.length === 0) {
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
        {teams.map((team) => (
          <div
            key={team.team_id}
            className="team-card"
            onClick={() => navigate(`/followed-tournament/${id}/teams/${team.team_id}`)}
          >
            <div className="team-info">
              <h2 className="team-name">{team.team_name}</h2>
              <p className="team-origin">Origin: {team.origin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
