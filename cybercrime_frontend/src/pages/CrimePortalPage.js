import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrimePortalPage.css";
import ReportForm from "../components/ReportForm";

const CrimePortalPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("form");

  return (
    <div className="portal-container">
      <header className="portal-header">
        <h1>🛡️ National Cyber Crime Reporting Portal</h1>
        <p>Report cyber incidents quickly and securely.</p>
      </header>

      <nav className="portal-buttons">
        <button
          className={activeSection === "form" ? "active" : ""}
          onClick={() => setActiveSection("form")}
        >
          📝 Register Complaint
        </button>
        <button
          className={activeSection === "dashboard" ? "active" : ""}
          onClick={() => navigate("/view-complaints")}
        >
          📊 View Complaints
        </button>
      </nav>

      <main className="portal-content">
        {activeSection === "form" && <ReportForm />}
      </main>

      {/* 🌐 Learning Corner Section */}
      <section className="learning-corner">
        <h2>📘 Learning Corner</h2>
        <div className="learning-grid">
          <div className="learning-card">
            <img src="/images/manual-icon.png" alt="Citizen Manual" />
            <h3>CITIZEN MANUAL</h3>
            <p>
              It is a document to describe the functionalities and workflow that is
              provided to citizens on the cybercrime portal for reporting cybercrimes.
            </p>
            <a href="https://cybercrime.gov.in/Webform/Citizen_Manual.aspx" className="read-more">Read More →</a>
          </div>

          <div className="learning-card">
            <img src="/images/safety-icon.png" alt="Cyber Safety Tips" />
            <h3>CYBER SAFETY TIPS</h3>
            <p>
              To stay safe online, it is important to follow cyber safety practices
              which may help protect us and our families from threats to our data and devices.
            </p>
            <a href="https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx" className="read-more">Read More →</a>
          </div>

          <div className="learning-card">
            <img src="/images/awareness-icon.png" alt="Cyber Awareness" />
            <h3>CYBER AWARENESS</h3>
            <p>
              Cyber awareness is the ongoing process of educating employees and citizens
              about cyber threats and how to act responsibly.
            </p>
            <a href="https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx" className="read-more">Read More →</a>
          </div>

          <div className="learning-card">
            <img src="/images/daily-icon.png" alt="Daily Digest" />
            <h3>DAILY DIGEST</h3>
            <p>
              Comprehensive document prepared by the Indian Cybercrime Coordination Centre (I4C)
              to raise awareness about cyber fraud modus operandi.
            </p>
            <a href="https://cybercrime.gov.in/Webform/dailyDigest.aspx" className="read-more">Read More →</a>
          </div>
        </div>
      </section>

      <footer className="portal-footer">
        <p>© 2025 National Cyber Crime Reporting System | Ministry of Home Affairs</p>
      </footer>
    </div>
  );
};

export default CrimePortalPage;
