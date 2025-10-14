import React from "react";
import ReportDashboard from "../components/ReportDashboard";
import "../styles/CrimePortalPage.css";

const ViewComplaintsPage = () => {
  return (
    <div className="portal-container">
      <header className="portal-header">
        <h1>📊 View Submitted Cybercrime Complaints</h1>
        <p>Here you can review all the reported cyber incidents.</p>
      </header>

      <main className="portal-content">
        <ReportDashboard />
      </main>

      <footer className="portal-footer">
        <p>© 2025 National Cyber Crime Reporting System | Ministry of Home Affairs</p>
      </footer>
    </div>
  );
};

export default ViewComplaintsPage;
