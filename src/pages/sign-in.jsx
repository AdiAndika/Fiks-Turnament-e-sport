import React from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './signin.css'; // Tambahkan import CSS

export function SignIn() {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk menangani Sign In
  const handleSignIn = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    const isAuthenticated = true; // Simulasi berhasil login

    if (isAuthenticated) {
      navigate("/home"); // Navigasi ke halaman Home
    } else {
      alert("Invalid credentials!"); // Contoh pesan error
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success:", response);
    navigate("/home"); // Navigasi ke halaman Home setelah login berhasil
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    alert("Login with Google failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <section className="signin-section">
        <div className="signin-form-container">
          <div className="signin-heading">
            <Typography variant="h2" className="signin-title">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="signin-subtitle">Enter your email and password to Sign In.</Typography>
          </div>
          <form className="signin-form" onSubmit={handleSignIn}>
            <div className="signin-input-group">
              <Typography variant="small" color="blue-gray" className="signin-label">Your email</Typography>
              <Input
                size="lg"
                placeholder="Enter your email"
                className="signin-input"
                labelProps={{ className: "signin-label-props" }}
              />
              <Typography variant="small" color="blue-gray" className="signin-label">Password</Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter your password"
                className="signin-input"
                labelProps={{ className: "signin-label-props" }}
              />
            </div>
            <Checkbox
              label={
                <Typography variant="small" color="gray" className="signin-checkbox-label">
                  I agree the&nbsp;
                  <a href="#" className="signin-terms-link">Terms and Conditions</a>
                </Typography>
              }
              containerProps={{ className: "signin-checkbox-container" }}
            />
            <Button type="submit" className="signin-button" fullWidth>
              Sign In
            </Button>
            <div className="signin-options">
              <Checkbox
                label={
                  <Typography variant="small" color="gray" className="signin-checkbox-label">
                    Subscribe me to newsletter
                  </Typography>
                }
                containerProps={{ className: "signin-checkbox-container" }}
              />
              <Typography variant="small" className="signin-forgot-password">
                <a href="#">Forgot Password</a>
              </Typography>
            </div>
            <div className="signin-third-party">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                size="large"
                text="signin_with"
                theme="filled_blue"
              />
            </div>
            <Typography variant="paragraph" className="signin-footer">
              Not registered?
              <Link to="/sign-up" className="signin-create-account">Create account</Link>
            </Typography>
          </form>
        </div>
        <div className="signin-image-container">
          <img
            src="/img/pattern.png"
            className="signin-image"
          />
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}

export default SignIn;
