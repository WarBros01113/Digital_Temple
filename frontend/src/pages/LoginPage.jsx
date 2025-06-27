import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import "./RegisterPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        alert(data.message || "Login successful!");
        navigate("/select-religion");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="register-box"
      >
        <h1 className="register-title">🌌 Divine Login ✨</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="register-button"
          >
            Login
          </motion.button>
        </form>

        {/* ✅ Google Login Button - No Provider here */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google Sign-in Success:", credentialResponse);
            navigate("/select-religion");
          }}
          onError={() => console.log("Google Sign-in Failed")}
        />
      </motion.div>

      <footer className="footer">
        &copy; 2025 TVARES. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
