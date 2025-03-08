import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReligionSelectionPage from "./pages/ReligionSelectionPage";
import AskWisdom from "./pages/AskWisdom"; // ✅ Hinduism Page
import ChristianWisdom from "./pages/ChristianWisdom"; // ✅ Christian AI
import MuslimWisdom from "./pages/MuslimWisdom"; // ✅ Muslim AI
import BuddhistWisdom from "./pages/BuddhistWisdom"; // ✅ Buddhist AI

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/select-religion" element={<ReligionSelectionPage />} />
        <Route path="/ask-wisdom" element={<AskWisdom />} />{" "}
        {/* Hinduism Page */}
        <Route path="/christian" element={<ChristianWisdom />} />{" "}
        {/* ✅ Christian AI */}
        <Route path="/muslim" element={<MuslimWisdom />} /> {/* ✅ Muslim AI */}
        <Route path="/buddhist" element={<BuddhistWisdom />} />{" "}
        {/* ✅ Buddhist AI */}
      </Routes>
    </Router>
  );
}

export default App;
