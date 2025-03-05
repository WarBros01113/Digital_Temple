import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import "./RegisterPage.css"; // Ensure this CSS file is created

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    alert(data.message);
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
        <h1 className="register-title">Divine Registration 🌟</h1>
        <input
          type="text"
          placeholder="Enter Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </motion.button>

        <GoogleOAuthProvider clientId="971448906126-khini0p1f8jrd62b5c8s39sednkvtmsj.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(response) =>
              console.log("Google Sign-in Success:", response)
            }
            onError={() => console.log("Google Sign-in Failed")}
          />
        </GoogleOAuthProvider>
      </motion.div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 TVARES. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
