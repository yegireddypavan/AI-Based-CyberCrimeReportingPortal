import React, { useState } from "react";
import { submitReport } from "../api";
import "./ReportForm.css";

function ReportForm() {
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const response = await submitReport(description);
    alert(`✅ Report submitted successfully!`);
    setDescription("");
    setAiResult(null);
  };

  const handlePreview = async () => {
    const res = await fetch("http://localhost:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: description }),
    });
    const data = await res.json();
    setAiResult(data);
  };

  return (
    <div className="report-form-container">
      <h2>🛡️ Report a Cybercrime Incident</h2>

      <form onSubmit={handleSubmit} className="report-form">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your cybercrime incident in detail..."
          rows="6"
        />

        <div className="button-group">
          <button type="button" className="preview-btn" onClick={handlePreview}>
            🤖 Analyze with AI
          </button>
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </div>
      </form>

      {aiResult && (
        <div className="ai-output">
          <h3>🔍 Detected Crime Type: <span>{aiResult.crime_type}</span></h3>
          <pre>{aiResult.complaint}</pre>
        </div>
      )}
    </div>
  );
}

export default ReportForm;
