import React from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './signup.css';

export function SignUp() {
  const navigate = useNavigate();

  // Fungsi untuk registrasi
  const handleRegister = (e) => {
    e.preventDefault();
    const isRegistered = true; // Simulasi registrasi berhasil
    if (isRegistered) {
      navigate("/sign-in");
    } else {
      alert("Registration failed!");
    }
  };

  // Fungsi untuk login dengan Google
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
                placeholder="Enter your email"
                className="signup-input"
                labelProps={{ className: "signup-label-props" }}
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
            <Button type="submit" className="signup-button" fullWidth>
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
