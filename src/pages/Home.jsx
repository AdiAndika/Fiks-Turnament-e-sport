import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import Tournament from "./Tournament/GameData";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './Home.css';
import { Footer } from "@/widgets/layout";

export function Home() {
  const [heroImage, setHeroImage] = useState(
  );

  const navigate = useNavigate(); // Deklarasi useNavigate

  useEffect(() => {
    const images = [
      "https://mmorpgturkiye.com/wp-content/uploads/2019/07/mmorpg-turkiye-tanitim-pubg-2.jpg",
      "https://cdn.eraspace.com/pub/media/mageplaza/blog/post/e/z/ezgif-4-37d3658dbf.jpg",
      "https://example.com/another-image.jpg",
      "https://asset.kompas.com/crops/hn148MyDct8HysLP8HnCh8JYGMU=/181x0:1796x1077/1200x800/data/photo/2022/06/20/62b03c6559ae8.jpg",
      "https://images7.alphacoders.com/120/thumb-1920-1203245.jpg",
    ];

    const changeHeroImage = () => {
      const nextImage = images[Math.floor(Math.random() * images.length)];
      setHeroImage(nextImage);
    };

    changeHeroImage();
    const interval = setInterval(changeHeroImage, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/tournament/${id}`);  // Navigasi ke halaman detail turnamen sesuai ID
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-text">
            <Typography variant="h1">Welcome to the Game World</Typography>
            <Typography variant="lead" className="lead-text">
              Explore epic tournaments and events.
            </Typography>
            {/* Tombol "Join Now" dihapus */}
          </div>
        </div>
      </div>

      {/* Tournament Section */}
      <section className="tournament-section">
        <Typography variant="h3" className="tournament-title">
          Tournament and Event
        </Typography>
        <div className="tournament-cards">
          {Tournament.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="tournament-card"
              onClick={() => handleCardClick(event.id)}  // Menambahkan event click
            >
              <img
                src={event.image}
                alt={event.name}
                className="tournament-image"
              />
              <div className="tournament-name">
                <Typography variant="h5">{event.name}</Typography>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
