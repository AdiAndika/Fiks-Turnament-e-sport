import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import "./Profile.css"; // Import file CSS terpisah

export function Profile() {
  return (
    <>
      {/* Banner section */}
      <section className="profile-banner">
        {/* Banner hanya menampilkan gambar latar belakang */}
      </section>

      {/* Profile content */}
      <section className="profile-content">
        <div className="profile-card">
          {/* Teks "Welcome to Your Profile" di dalam card */}
          <Typography
            variant="h2"
            className="profile-banner-title text-center text-white"
          >
            Welcome to Your Profile
          </Typography>

          <div className="profile-header">
            <Avatar
              src="/img/team-5.png"
              alt="Profile picture"
              variant="circular"
              className="profile-avatar"
            />
            <div className="profile-info">
              <Typography variant="h4" className="profile-name">
                Jenna Stones
              </Typography>
              <Typography className="profile-email">jena@mail.com</Typography>
            </div>
          </div>

          {/* Stats */}
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

          {/* Details */}
          <div className="profile-details">
            <div className="detail-item">
              <MapPinIcon className="detail-icon" />
              <Typography>Los Angeles, California</Typography>
            </div>
            <div className="detail-item">
              <BriefcaseIcon className="detail-icon" />
              <Typography>Solution Manager - Creative Tim Officer</Typography>
            </div>
            <div className="detail-item">
              <BuildingLibraryIcon className="detail-icon" />
              <Typography>University of Computer Science</Typography>
            </div>
          </div>

          {/* Bio */}
          <div className="profile-bio">
            <Typography>
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure.
            </Typography>
            <Button variant="gradient" className="profile-btn">
              Show More
            </Button>
          </div>

          {/* Edit Profile Button */}
          <div className="edit-profile">
            <Button variant="gradient" className="edit-profile-btn">
              <PencilIcon className="h-5 w-5 inline-block mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Profile;