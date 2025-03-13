import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Logo Section */}
      <div className="logo-container">
        <img
          src="/tvares_logo.jpg"
          alt="TVARES Logo"
          className="company-logo"
        />
      </div>

      {/* Login and Register Buttons */}
      <div className="auth-buttons">
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

      {/* Home Title */}
      <motion.h1
        className="home-title"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        DIGITAL TEMPLE
      </motion.h1>

      {/* About Section with Translucent Box */}
      <section className="about">
        <div className="about-content">
          <h2>What is the Digital Temple?</h2>
          <p>
            The Digital Temple is a space where seekers of wisdom can connect
            with the divine teachings of Hinduism, Christianity, Islam, and
            Buddhism. Many people may not have had the opportunity to read the
            Bhagavad Gita, Bible, Quran, or Buddhist scriptures, but through our
            platform, you can easily access their profound wisdom. Our platform
            provides answers to life's challenges, offering insights from sacred
            texts and religious teachings. Whether you're seeking spiritual
            guidance, answers to personal dilemmas, or inspiration, the Digital
            Temple is here to offer you wisdom and clarity.
          </p>
          <p>
            A place where technology meets spirituality, bridging ancient
            knowledge with modern-day challenges.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>What We Offer</h2>
        <div className="feature">
          <h3>Instant Wisdom</h3>
          <p>
            Get answers from religious scriptures tailored to your questions.
          </p>
        </div>
        <div className="feature">
          <h3>Multifaith Support</h3>
          <p>
            Access wisdom from Hindu, Christian, Muslim, and Buddhist teachings.
          </p>
        </div>
        <div className="feature">
          <h3>Confidential and Secure</h3>
          <p>Your questions remain private, and no data is stored.</p>
        </div>
        <div className="feature">
          <h3>Accessible Anytime, Anywhere</h3>
          <p>Connect from any device at your convenience.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <p>&copy; 2025 TVARES. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
