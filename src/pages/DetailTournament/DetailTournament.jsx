import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailTournament.css";
import { deleteDataPrivate, getDataPrivate, sendDataPrivate, getImage } from "@/utils/api";

const DetailTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailTournaments, setDetailTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    getDetailTournaments();
  }, []);

  const getDetailTournaments = () => {
    setIsLoading(true);
    getDataPrivate(`/api/v1/tournaments/read/${id}`)
      .then((resp) => {
        setIsLoading(false);
        if (resp?.datas) {
          const tournamentData = resp.datas[0];
          setDetailTournaments(tournamentData);
          setIsFollowed(tournamentData.is_followed);
          setIsRegistered(tournamentData.is_registered); // Assuming the API returns `is_registered`
        } else {
          setErrMsg("Can't fetch data");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg("Data fetch failed");
        console.error(err);
      });
  };

  const handleRegisterClick = () => {
    if (isRegistered) return; // Prevent action if already registered
    navigate(`/tournament-registration/${id}`);
  };

  const handleSeeRegisteredTeamClick = () => {
    console.log(id); // Debug: Log the ID
    navigate(`/followed-tournament/${id}/teams`); // Ensure this matches the route
  };

  const handleFollowClick = () => {
    const formData = new FormData();
    formData.append("tournament_id", id);

    if (!isFollowed) {
      sendDataPrivate(`/api/v1/tournaments-followed/create`, formData)
        .then((resp) => {
          if (resp?.message === "Follow Successfully") {
            setIsFollowed(true);
            alert("Tournament followed successfully!");
          } else {
            alert("Failed to follow tournament!");
          }
        })
        .catch((err) => {
          console.error("Error following tournament:", err);
          alert("Failed to follow tournament!");
        });
    } else {
      deleteDataPrivate(`/api/v1/tournaments-followed/delete`, formData)
        .then((resp) => {
          if (resp?.message === "Unfollow Successfully") {
            setIsFollowed(false);
            alert("Tournament unfollowed successfully!");
          } else {
            alert("Failed to unfollow tournament!");
          }
        })
        .catch((err) => {
          console.error("Error unfollowing tournament:", err);
          alert("Failed to unfollow tournament!");
        });
    }
  };

  if (!detailTournaments) {
    return (
      <div className="detail-container">
        <h1 className="detail-title">Turnamen tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <img
          src={getImage(detailTournaments.tournament_banner_path)}
          alt={detailTournaments.tournament_name}
          className="detail-image"
        />
        <div className="detail-info">
          <h1 className="detail-title">{detailTournaments.tournament_name}</h1>
          <div className="detail-location-time">
            <p className="detail-location">
              <strong>Lokasi:</strong> {detailTournaments.location}
            </p>
            <p className="detail-date-time">
              <strong>Tanggal:</strong> {detailTournaments.date_start}
            </p>
            <p className="detail-date-time">
              <strong>Waktu:</strong> {detailTournaments.time_start}
            </p>
          </div>
          {/* Registration Button */}
          <button
            className={`register-button ${isRegistered ? "disabled-button" : ""}`}
            onClick={handleRegisterClick}
            disabled={isRegistered}
          >
            {isRegistered ? "Sudah Terdaftar" : "Daftar Sekarang"}
          </button>
          {/* Follow Button */}
          <button className="follow-button button-container" onClick={handleFollowClick}>
            {isFollowed ? "Tournament Followed" : "Follow Tournament"}
          </button>

          <button
              className="see-registered-team-button button-container"
              onClick={handleSeeRegisteredTeamClick}
            >
              See Registered Team
          </button>
        </div>
      </div>
      <p className="detail-description">{detailTournaments.description}</p>
    </div>
  );
};

export default DetailTournament;
