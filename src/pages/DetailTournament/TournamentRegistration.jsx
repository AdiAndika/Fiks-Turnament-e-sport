import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tournament from "../Tournament/GameData"; // Pastikan jalur data benar

const TournamentRegistration = () => {
  const { id } = useParams(); // Mendapatkan ID turnamen dari URL
  const tournament = Tournament.find(
    (tournament) => tournament.id === parseInt(id)
  );
  const navigate = useNavigate();

  // State untuk formulir pendaftaran
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", "", "", ""]);
  const [playerIds, setPlayerIds] = useState(["", "", "", "", ""]);
  const [origin, setOrigin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tindakan setelah submit (misalnya menyimpan data atau mengirim ke API)
    alert("Pendaftaran berhasil!");
    // Arahkan kembali ke halaman daftar turnamen setelah pendaftaran berhasil
    navigate("/tournament");
  };

  if (!tournament) {
    return <h1>Turnamen tidak ditemukan</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Pendaftaran Turnamen {tournament.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Nama Team:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Menambahkan kolom nama anggota */}
        <div className="grid grid-cols-2 gap-4">
          {members.map((member, index) => (
            <div key={index}>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Nama Anggota {index + 1}:
              </label>
              <input
                type="text"
                value={member}
                onChange={(e) => {
                  const newMembers = [...members];
                  newMembers[index] = e.target.value;
                  setMembers(newMembers);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Menambahkan kolom ID Pemain */}
        <div className="grid grid-cols-2 gap-4">
          {playerIds.map((playerId, index) => (
            <div key={index}>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                ID Pemain {index + 1}:
              </label>
              <input
                type="text"
                value={playerId}
                onChange={(e) => {
                  const newPlayerIds = [...playerIds];
                  newPlayerIds[index] = e.target.value;
                  setPlayerIds(newPlayerIds);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Asal:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
