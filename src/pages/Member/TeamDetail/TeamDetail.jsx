import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamData from "../../../data/DummyData/MemberData"; // Updated import
import './TeamDetail.css'; // New CSS file for this component
import { getDataPrivate, getImage } from "@/utils/api";

const TeamDetail = () => {
  const { id, teamId } = useParams();
  // const tournamentTeams = TeamData.find((data) => data.tournamentId === parseInt(id));
  // const team = tournamentTeams?.teams.find((t) => t.id === parseInt(teamId));
  const [teamDetail, setTeamDetail] = useState([]); // Store the fetched team list
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errMsg, setErrMsg] = useState(""); // Track error messages

  useEffect(() => {
    getTeamDetail();
  }, []);

const getTeamDetail = () => {
  setIsLoading(true);
  getDataPrivate(`/api/v1/teams/read/detail/${teamId}`)
      .then((resp) => {
          setIsLoading(false);
          if (resp?.datas) {
              setTeamDetail(resp?.datas);
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

  let logo_url = getImage(teamDetail.logo_url);

  if (!teamDetail) {
    return <h1>Team not found</h1>;
  }

  return (
    <div className="team-detail-container">
      <div className="team-detail-header">
        <img src={logo_url} alt={teamDetail.team_name} className="team-detail-image" />
        <div className="team-detail-info">
          <h1 className="team-name-detail">{teamDetail.team_name}</h1>
          <p className="team-origin"><strong>Origin:</strong> {teamDetail.origin}</p>
        </div>
      </div>
      <div className="team-members">
        <h2 className="members-title">Team Members</h2>
        <ul className="members-list">
          {teamDetail.members && teamDetail.members.length > 0 ? (
            teamDetail.members.map((member, index) => (
              <li key={member.member_id} className="member-card">
                <img
                  src={getImage(member.member_avatar)} // Fallback for image
                  alt={member.special_nickname || member.user.username}
                  className="member-image"
                />
                <div className="member-info">
                  <p className="member-name">
                    {member.special_nickname || member.user.username}
                  </p>
                  <p className="member-id">ID: {member.member_id}</p>
                </div>
              </li>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No members found for this team!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetail;
