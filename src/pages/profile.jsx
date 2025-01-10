import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import React, { useState, useEffect, useContext } from "react";
import { getImage, sendDataPrivate } from "@/utils/api";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { userProfile } = useContext(AuthContext); // Pastikan AuthContext diatur dengan benar
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile?.user_logged) {
      getUser(userProfile.user_logged);
    } else {
      setIsLoading(false); // Jika userProfile tidak tersedia, langsung set loading ke false
    }
  }, [userProfile]);

  const getUser = async (username) => {
    const formData = new FormData();
    formData.append("username", username);

    try {
      const resp = await sendDataPrivate("/api/v1/users/read/byUsername", formData);
      if (resp?.datas) {
        setUser(resp.datas);
      } else {
        setErrMsg("Data pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrMsg("Gagal mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    navigate(`/profile/edit`);
  };

  let userAvatar = user?.image_url ? getImage(user.image_url) : "/img/default-avatar.png";

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-message">
        <Typography variant="h4" color="red">
          {errMsg || "Data tidak tersedia."}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <section className="profile-banner"></section>

      <section className="profile-content">
        <div className="profile-card">
          <Typography
            variant="h2"
            className="profile-banner-title text-center text-white"
          >
            Welcome to Your Profile
          </Typography>

          <div className="profile-header">
            <Avatar
              src={userAvatar}
              alt="Profile picture"
              variant="circular"
              className="profile-avatar"
            />
            <div className="profile-info">
              <Typography variant="h3" className="profile-name">
                {user.name}
              </Typography>
              <Typography className="profile-email">{user.username}</Typography>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <Typography className="stat-value">22</Typography>
              <Typography className="stat-label">Friends</Typography>
            </div>
            <div className="stat-item">
              <Typography className="stat-value">10</Typography>
              <Typography className="stat-label">Photos</Typography>
            </div>
            <div className="stat-item">
              <Typography className="stat-value">89</Typography>
              <Typography className="stat-label">Comments</Typography>
            </div>
          </div>

          <div className="profile-bio">
            <Typography>
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure.
            </Typography>
          </div>

          <div className="edit-profile">
            <Button 
              variant="gradient" 
              className="edit-profile-btn"
              onClick={handleEditClick}
            >
              <PencilIcon className="h-5 w-5 inline-block mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
