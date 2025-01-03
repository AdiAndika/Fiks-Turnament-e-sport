import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tournament from "../Tournament/GameData"; // Pastikan jalur data benar
import "./DetailTournament.css";

const DetailTournament = () => {
  const { id } = useParams();
  const tournament = Tournament.find(
    (tournament) => tournament.id === parseInt(id)
  );
  const navigate = useNavigate();

  if (!tournament) {
    return (
      <div className="detail-container">
        <h1 className="detail-title">Turnamen tidak ditemukan</h1>
      </div>
    );
  }

  const handleRegisterClick = () => {
    // Navigasi ke halaman pendaftaran turnamen
    navigate(`/tournament-registration/${id}`);
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
            <p className="detail-location"><strong>Lokasi:</strong> {tournament.location}</p>
            <p className="detail-date-time"><strong>Tanggal:</strong> {tournament.date}</p>
            <p className="detail-date-time"><strong>Waktu:</strong> {tournament.time}</p>
          </div>
          <button className="register-button" onClick={handleRegisterClick}>
            Daftar Sekarang
          </button>
        </div>
      </div>
      <p className="detail-description">{tournament.description}</p>
    </div>
  );
};

export default DetailTournament;
