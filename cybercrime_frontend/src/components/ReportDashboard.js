import React, { useEffect, useState } from "react";
import { fetchReports } from "../api";
import { useNavigate } from "react-router-dom";
import "./ReportDashboard.css";

function ReportDashboard() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const loadReports = async () => {
    const data = await fetchReports();
    setReports(data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Submitted Cybercrime Reports</h2>
        <div>
          <button className="refresh-btn" onClick={loadReports}>
            🔄 Refresh
          </button>
          <button className="form-btn" onClick={() => navigate("/")}>
            ← Back to Form
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <p className="no-reports">No reports submitted yet.</p>
      ) : (
        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Crime Type</th>
                <th>Description</th>
                <th>Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, index) => (
                <tr key={r.id || index}>
                  <td>{r.id || index + 1}</td>
                  <td>{r.crimeType || "N/A"}</td>
                  <td>{r.text || "No description provided"}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReportDashboard;
