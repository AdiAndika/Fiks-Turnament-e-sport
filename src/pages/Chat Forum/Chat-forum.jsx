import React from "react";
import chatRooms from "./Chat-forum-data"; // Import data untuk chat rooms
import { Footer } from "@/widgets/layout";
import "./Chat-forum.css"; // Gaya baru mengikuti desain Followers Tournament

const ChatForum = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="title">Forum Chat</h1>
      </div>

      {/* Daftar Chat Rooms */}
      <div className="tournament-list">
        {chatRooms.length > 0 ? (
          chatRooms.map((room) => (
            <div
              key={room.id}
              className="tournament-card"
              onClick={() => window.open(room.discordLink, "_blank")}
            >
              <img
                src={room.image}
                alt={room.name}
                className="tournament-image"
              />
              <div className="tournament-content">
                <p className="tournament-name">{room.name}</p>
              </div>
              {/* Animasi Gabung */}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No chat rooms available!
          </p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatForum;