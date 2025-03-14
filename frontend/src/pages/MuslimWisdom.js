import { useState, useEffect } from "react";
import axios from "axios";
import "./AskWisdom.css";

const MuslimWisdom = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [animatedResponse, setAnimatedResponse] = useState("");
  const [videoSrc, setVideoSrc] = useState(
    "http://127.0.0.1:5002/static/videos/m_answer.mp4" //instead of background
  );
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let index = 0;
    setAnimatedResponse("");
    setShowButton(false);

    if (response) {
      setVideoSrc("http://127.0.0.1:5002/static/videos/m_answer.mp4");

      const interval = setInterval(() => {
        setAnimatedResponse((prev) => prev + response.split(" ")[index] + " ");
        index++;
        if (index >= response.split(" ").length) {
          clearInterval(interval);
          setTimeout(() => setShowButton(true), 500);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert("Please enter a question.");

    setLoading(true);
    setResponse("");
    setAnimatedResponse("");
    setShowButton(false);
    setVideoSrc("http://127.0.0.1:5002/static/videos/m_search.mp4");

    try {
      const res = await axios.post(
        "http://127.0.0.1:5002/get_response_muslim",
        { question },
        { headers: { "Content-Type": "application/json" } }
      );

      setTimeout(() => {
        setResponse(res.data.response || "No wisdom found.");
        setVideoSrc("http://127.0.0.1:5002/static/videos/m_answer.mp4");
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        setResponse("Sorry, an error occurred. Please try again.");
        setLoading(false);
      }, 5000);
    }
  };

  const resetWisdom = () => {
    setQuestion("");
    setResponse("");
    setAnimatedResponse("");
    setShowButton(false);
    setVideoSrc("http://127.0.0.1:5002/static/videos/m_answer.mp4");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        color: "black",
        background: "rgba(0, 0, 0, 0.6)",
        minHeight: "100vh",
        position: "relative",
        zIndex: "1",
      }}
    >
      {/* 🔥 Background Video */}
      <video autoPlay loop muted key={videoSrc} className="background-video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {response ? (
        <>
          <h1>☪️</h1>
          <div
            style={{
              background: "rgba(56, 126, 218, 0.5)",
              padding: "20px",
              borderRadius: "10px",
              display: "inline-block",
              maxWidth: "80%",
              margin: "20px auto",
              fontSize: "1.5rem",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
            }}
          >
            <p>{animatedResponse}</p>
          </div>
          <br />
          {showButton && (
            <button
              onClick={resetWisdom}
              style={{
                marginTop: "20px",
                padding: "12px 25px",
                background: "#ffcc00",
                border: "none",
                color: "black",
                fontWeight: "bold",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Get Wisdomized Again
            </button>
          )}
        </>
      ) : (
        <>
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
                background: "#ff6600",
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
        </>
      )}
    </div>
  );
};

export default MuslimWisdom;
