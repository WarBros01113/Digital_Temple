import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ReligionSelectionPage.css"; // Ensure this CSS file exists

const ReligionSelectionPage = () => {
  return (
    <div className="religion-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <motion.h1
        className="religion-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Select Your Divine Path ✨
      </motion.h1>

      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/ask-wisdom">Hinduism 🕉️</Link> {/* ✅ Fixed Route */}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/muslim">Islam ☪️</Link>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/christian">Christianity ✝️</Link>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          <Link to="/buddhism">Buddhism ☸️</Link>
        </motion.button>
      </div>

      {/* ✅ Footer Section */}
      <footer className="footer">
        <p>© 2025 TVARES. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ReligionSelectionPage;
