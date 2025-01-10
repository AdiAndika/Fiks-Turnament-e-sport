import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/widgets/layout";
import { getDataPrivate, getImage } from "@/utils/api";
import "./Home.css";

export function Home() {
  const [heroImage, setHeroImage] = useState();
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  // Mengubah hero image secara berkala
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

  // Fetch data turnamen menggunakan API
  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      try {
        const response = await getDataPrivate("/api/v1/tournaments/read");
        if (response?.datas) {
          setTournaments(response.datas);
        } else {
          setErrMsg("Cannot fetch tournament data");
        }
      } catch (error) {
        console.error(error);
        setErrMsg("Data fetch failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/tournament/${id}`);
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
          </div>
        </div>
      </div>

      {/* Tournament Section */}
      <section className="tournament-section">
        <Typography variant="h3" className="tournament-title">
          Tournament and Event
        </Typography>
        {isLoading ? (
          <p>Loading tournaments...</p>
        ) : errMsg ? (
          <p className="error-message">{errMsg}</p>
        ) : (
          <div className="tournament-cards">
            {tournaments.slice(0, 3).map((event) => (
              <div
                key={event.tournament_id}
                className="tournament-card"
                onClick={() => handleCardClick(event.tournament_id)}
              >
                <img
                  src={getImage(event.tournament_banner_path)}
                  alt={event.tournament_name}
                  className="tournament-image"
                />
                <div className="tournament-name">
                  <Typography variant="h5">{event.tournament_name}</Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
