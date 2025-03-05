import { useState } from "react";
import axios from "axios";

const AskWisdom = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert("Please enter a question.");

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/get_response", // Make sure Flask is running
        { question },
        { headers: { "Content-Type": "application/json" } }
      );

      setResponse(res.data.response || "No wisdom found."); // Ensure response exists
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
        background: "black",
        minHeight: "100vh",
      }}
    >
      <h1>Ask Hinduism AI 🕉️</h1>
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
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskWisdom;
