import React, { useEffect, useState } from "react";
import { Footer } from "@/widgets/layout";
import { getDataPrivate } from "@/utils/api"; // Use your API call method
import "./Chat-forum.css";

const ChatForum = () => {
  const [chatRooms, setChatRooms] = useState([]); // State to store fetched forums
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch data from the backend API
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await getDataPrivate("/api/v1/forums/admin/read"); // Adjust endpoint if necessary
        if (response.datas) {
          // Update the state with data from the API
          const formattedRooms = response.datas.map((forum) => ({
            id: forum.forum_id, // Ensure this matches your API structure
            name: forum.title,
            image: forum.forum_image_path
              ? `http://127.0.0.1:5000/static/${forum.forum_image_path}`
              : "/path/to/default-image.png", // Handle missing images
            discordLink: forum.forum_url,
          }));
          setChatRooms(formattedRooms);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="title">Forum Chat</h1>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
      ) : (
        // Chat Rooms List
        <div className="tournament-list">
          {chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <div
              key={room.id}
              className="tournament-card"
              onClick={() => {
                const validUrl = room.discordLink.startsWith("http://") || room.discordLink.startsWith("https://")
                  ? room.discordLink
                  : `https://${room.discordLink}`;
                window.open(validUrl, "_blank");
              }}
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
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatForum;
