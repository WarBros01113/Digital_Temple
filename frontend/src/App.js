import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReligionSelectionPage from "./pages/ReligionSelectionPage";
import AskWisdom from "./pages/AskWisdom"; // ✅ Import AskWisdom Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/select-religion" element={<ReligionSelectionPage />} />
        <Route path="/ask-wisdom" element={<AskWisdom />} />{" "}
        {/* ✅ Added this route */}
      </Routes>
    </Router>
  );
}

export default App;
