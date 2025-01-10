import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataPrivate, sendDataPrivate } from "@/utils/api";

const TournamentRegistration = () => {
  const { id } = useParams(); // Get Tournament ID from URL params
  const navigate = useNavigate();

  // States for form inputs
  const [teamName, setTeamName] = useState("");
  const [origin, setOrigin] = useState("");
  const [members, setMembers] = useState([]); // Members will be generated based on number_of_member_team
  const [numMembers, setNumMembers] = useState(0); // Store the number of members (fetched from API)
  const [tournament, setTournament] = useState(null);
  const [teamImage, setTeamImage] = useState(null); // State for team image

  // Fetch tournament data to get number_of_member_team
  useEffect(() => {
    // Fetch tournament details to get number_of_member_team
    getDataPrivate(`/api/v1/tournaments/read/${id}`)
      .then((data) => {
        if (data && data.datas && data.datas.length > 0) {
          const tournamentData = data.datas[0];
          setTournament(tournamentData);
          setNumMembers(tournamentData.number_of_member_team); // Set number of members from API
          setMembers(new Array(tournamentData.number_of_member_team).fill({ user_id: "", nickname: "" }));
        }
      })
      .catch((error) => console.error("Failed to fetch tournament data:", error));
  }, [id]);

  // Handle input changes for member information (user_id and nickname)
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members]; // Create a shallow copy of members array
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }; // Update only the changed field
    setMembers(updatedMembers); // Update the state with the new array
  };

  // Handle file input change for team image
  const handleImageChange = (e) => {
    setTeamImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("team_name", teamName);
    formData.append("origin", origin);
    formData.append("tournament_id", id); // Tournament ID

    // Append the image file if selected
    if (teamImage) {
      formData.append("logo_url", teamImage);
    }

    // Append member data (user_id and nickname) to FormData
    members.forEach((member) => {
      if (member.user_id && member.nickname) {
        formData.append("members", `${member.user_id},${member.nickname}`);
      }
    });

    // Send the data to the backend using sendDataPrivate
    sendDataPrivate("/api/v1/teams/create_with_members", formData)
      .then((data) => {
        if (data.message === "Team and members created successfully") {
          alert("Team and members registered successfully!");
          navigate(`/tournament/${id}`); // Redirect after successful registration
        } else {
          console.error("Response data:", data.message);
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error creating the team.");
      });
  };

  // If the tournament is not found, display an error message
  if (!tournament) {
    return <h1>Turnamen tidak ditemukan</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-8 text-black">
        Pendaftaran Turnamen - {tournament.tournament_name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Nama Team:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Team Origin */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Asal:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Team Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload Team Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Members input fields */}
        <div className="grid grid-cols-2 gap-4">
          {members.map((member, index) => (
            <div key={index}>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {index === 0 ? "Anggota 1 (Captain):" : `Anggota ${index + 1}:`}
              </label>

              {/* User ID input */}
              <input
                type="text"
                placeholder="User ID"
                value={member.user_id}
                onChange={(e) => handleMemberChange(index, "user_id", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />

              {/* Special Nickname input */}
              <input
                type="text"
                placeholder="Special Nickname"
                value={member.nickname}
                onChange={(e) => handleMemberChange(index, "nickname", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-black"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Daftar
        </button>
      </form>
    </div>
  );
};

export default TournamentRegistration;
