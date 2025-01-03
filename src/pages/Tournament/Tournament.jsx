import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TournamentList.css';
import tournaments from './GameData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Footer } from '@/widgets/layout';

const Tournament = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            key={tournament.id}
            className="tournament-card"
            onClick={() => navigate(`/tournament/${tournament.id}`)} // Navigasi ke halaman detail dengan ID tournament
          >
            <img
              src={tournament.image}
              alt={tournament.name}
              className="tournament-image"
            />
            <p className="tournament-name">{tournament.name}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Tournament;
