import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <motion.h1
        className="home-title"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        DIGITAL TEMPLE
      </motion.h1>

      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/login">Login</Link>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/register">Register</Link>
        </motion.button>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>TVARES © 2025. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
