import React, { useContext, useState} from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './signup.css';

import { sendData } from "@/utils/api";
// import { useContext, useState } from "react";

export function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi untuk registrasi
  const handleRegister = async (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    console.log(formData);
    console.log(username);

    sendData("/api/v1/auth/register", formData)
    .then((resp) => {
      if (resp.message === "OK") {
        alert("Akun berhasil dibuat, silakan login terlebih dahulu");
        navigate("/sign-in");
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

  // Fungsi untuk login dengan Google
  const handleGoogleSuccess = (response) => {
    console.log("Google login success:", response);
    navigate("/sign-in"); // Navigasi ke halaman Home setelah login berhasil
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    alert("Login with Google failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <section className="signup-section">
        <div className="signup-image-container">
          <img
            src="/img/pattern.png"
            className="signup-image"
            alt="Sign up illustration"
          />
        </div>
        <div className="signup-form-container">
          <div className="signup-heading">
            <Typography variant="h2" className="signup-title">Join Us Today</Typography>
            <Typography variant="paragraph" color="blue-gray" className="signup-subtitle">Enter your email and password to register.</Typography>
          </div>
          <form className="signup-form" onSubmit={handleRegister}>
            <div className="signup-input-group">
              <Typography variant="small" color="blue-gray" className="signup-label">Your email</Typography>
              <Input
                size="lg"
                placeholder="Enter your name"
                className="signup-input"
                labelProps={{ className: "signup-label-props" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              />
            </div>
            <div className="signup-input-group">
              <Typography variant="small" color="blue-gray" className="signup-label">Your email</Typography>
              <Input
                size="lg"
                placeholder="Enter your username"
                className="signup-input"
                labelProps={{ className: "signup-label-props" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              />
            </div>
            <div className="signup-input-group">
              <Typography variant="small" color="blue-gray" className="signup-label">Password</Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter your password"
                className="signup-input"
                labelProps={{ className: "signup-label-props" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="signup-checkbox-label"
                >
                  I agree to the&nbsp;
                  <a
                    href="#"
                    className="signup-terms-link"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "signup-checkbox-container" }}
            />
            <Button 
              type="submit" 
              className="signup-button" 
              fullWidth
              disabled={!username || !password}
            >
              Register Now
            </Button>
            <div className="signup-third-party">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                size="large"
                text="signup_with"
                theme="filled_blue"
              />
            </div>
            <Typography variant="paragraph" className="signup-footer">
              Already have an account?{" "}
              <Link to="/dashboard" className="signup-create-account">Sign in</Link>
            </Typography>
          </form>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}

export default SignUp;
