import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrimePortalPage from "./pages/CrimePortalPage";
import ViewComplaintsPage from "./pages/ViewComplaintsPage";
import LoginPage from "./pages/LoginPage";   // ✅ FIXED: Capitalized

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* ✅ Login Page */}
        <Route path="/complaint" element={<CrimePortalPage />} />
        <Route path="/view-complaints" element={<ViewComplaintsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
