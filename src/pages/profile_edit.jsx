import React, { useState, useEffect, useContext } from "react";
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { AuthContext } from "@/providers/AuthProvider";
import { getImage, sendDataPrivate } from "@/utils/api";
import "./Profile.css";

export function ProfileEdit() {
  const { userProfile } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState(null); // Image file selected for upload
  const [previewUrl, setPreviewUrl] = useState(""); // Preview image for UI display
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const username = userProfile?.user_logged;

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const formPayload = new FormData();
      formPayload.append("username", username);

      const resp = await sendDataPrivate("/api/v1/users/read/byUsername", formPayload);
      if (resp?.datas) {
        const fetchedUser = resp.datas;
        setUser(fetchedUser);
        setFormData({
          name: fetchedUser.name || "",
          username: fetchedUser.username || "",
          image_url: fetchedUser.image_url || "",
        });
        setPreviewUrl(""); // Reset preview when loading from the server
      } else {
        setErrMsg("Unable to fetch user data.");
      }
    } catch (error) {
      setErrMsg("Failed to fetch user data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show a local preview of the new file
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const updatePayload = new FormData();
      updatePayload.append("user_id", user?.user_id || "");
      updatePayload.append("name", formData.name);
      updatePayload.append("username", formData.username);
      if (imageFile) {
        updatePayload.append("image_url", imageFile); // Only send the image if a file is selected
      }

      const resp = await sendDataPrivate("/api/v1/users/profile/update", updatePayload);
      if (resp.message === "user updated") {
        alert("Profile updated successfully!");
        getUser(); // Refresh user details after updating
      } else {
        setErrMsg("Failed to update profile.");
      }
    } catch (error) {
      setErrMsg("Error saving profile data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userAvatar = previewUrl || getImage(formData.image_url) || "/img/default-avatar.png";

  return (
    <div className="profile-edit-container">
      <section className="profile-banner"></section>
      <section className="profile-content">
        <div className="profile-card">
          <Typography variant="h2" className="profile-title text-center">
            Edit Your Profile
          </Typography>

          {/* Profile Avatar */}
          <div className="profile-header">
            <Avatar
              src={userAvatar}
              alt="Profile Avatar"
              variant="circular"
              className="profile-avatar"
            />
          </div>

          {/* Form Inputs */}
          <div className="edit-profile-form">
            <div className="form-group">
              <Typography variant="small" className="form-label">
                Name
              </Typography>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <Typography variant="small" className="form-label">
                Username
              </Typography>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <Typography variant="small" className="form-label">
                Profile Picture
              </Typography>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            <Button
              variant="gradient"
              onClick={handleSave}
              className="profile-btn"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Error Message */}
          {errMsg && (
            <Typography variant="small" color="red" className="error-message">
              {errMsg}
            </Typography>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ProfileEdit;
