import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TournamentList.css';
import tournaments from './GameData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Footer } from '@/widgets/layout';
import { getDataPrivate, getImage } from '@/utils/api';

const Tournament = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getTournaments();
  }, []);

  const getTournaments = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/tournaments/read")
        .then((resp) => {
            setIsLoading(false);
            if (resp?.datas) {
                setTournaments(resp?.datas);
                console.log("tournament:", tournaments);
            } else {
                setErrMsg("Can't fetch data");
            }
        })
        .catch((err) => {
            setIsLoading(false);
            setErrMsg("Data fetch failed");
            console.log(err);
        });
  }

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery === '') {
      setSearchVisible(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.tournament_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let tournament_banner_url = getImage(tournaments.tournament_banner_path);
  console.log("banner_url", tournament_banner_url);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Tournament List</h1>
        <div className="search-bar">
          {!searchVisible ? (
            <button className="search-icon" onClick={handleSearchClick}>
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </button>
          ) : (
            <input
              type="text"
              placeholder="Cari turnamen..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              autoFocus
            />
          )}
        </div>
      </div>

      <div className="tournament-list">
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament.tournament_id}
            className="tournament-card"
            onClick={() => navigate(`/tournament/${tournament.tournament_id}`)} // Navigasi ke halaman detail dengan ID tournament
          >
            <img
              src={getImage(tournament.tournament_banner_path)}
              alt={tournament.tournament_name}
              className="tournament-image"
            />
            <p className="tournament-name">{tournament.tournament_name}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Tournament;
