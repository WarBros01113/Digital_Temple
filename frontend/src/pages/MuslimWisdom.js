import { useState, useEffect } from "react";
import axios from "axios";
import "./AskWisdom.css"; // Reusing the same CSS file

const MuslimWisdom = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [animatedResponse, setAnimatedResponse] = useState("");

  useEffect(() => {
    let index = 0;
    setAnimatedResponse(""); // Reset animation on new response

    if (response) {
      const interval = setInterval(() => {
        setAnimatedResponse((prev) => prev + response.split(" ")[index] + " ");
        index++;
        if (index >= response.split(" ").length) clearInterval(interval);
      }, 100); // Adjust speed here (100ms per word)

      return () => clearInterval(interval);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert("Please enter a question.");

    setLoading(true);
    setResponse(""); // Clear previous response
    setAnimatedResponse("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:5002/get_response_islam", // ✅ Flask API for Islam
        { question },
        { headers: { "Content-Type": "application/json" } }
      );

      setResponse(res.data.response || "No wisdom found.");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, an error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        color: "white",
        background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
        minHeight: "100vh",
        position: "relative",
        zIndex: "1",
      }}
    >
      {/* 🎥 Background Video */}
      <video autoPlay loop muted className="background-video">
        <source
          src="http://127.0.0.1:5002/static/videos/background.mp4" // ✅ Use an Islamic-themed video
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <h1>Ask Muslim AI ☪️</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          style={{
            padding: "10px",
            width: "60%",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
          }}
          required
        />
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#009688", // ✅ Green color theme
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get Wisdom"}
        </button>
      </form>

      {/* 🎤 Animated Word-by-Word Response */}
      {response && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.2rem",
            maxWidth: "80%",
            margin: "auto",
          }}
        >
          <h2>Your Wisdom:</h2>
          <p>{animatedResponse}</p>
        </div>
      )}
    </div>
  );
};

export default MuslimWisdom;
