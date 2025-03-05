import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import "./RegisterPage.css"; // Reusing the same CSS for consistency

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Check if response is valid JSON before parsing
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        alert(data.message || "Login successful!");
        navigate("/select-religion"); // Redirect after successful login
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

        {/* ✅ Wrapped inputs in a <form> */}
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

        <GoogleOAuthProvider clientId="971448906126-khini0p1f8jrd62b5c8s39sednkvtmsj.apps.googleusercontent.com">
          <GoogleLogin
            useOneTap
            onSuccess={(credentialResponse) => {
              console.log("Google Sign-in Success:", credentialResponse);
              navigate("/select-religion");
            }}
            onError={() => console.log("Google Sign-in Failed")}
          />
        </GoogleOAuthProvider>
      </motion.div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 TVARES. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
