// src/services/reportService.js

// Send the report description to Spring Boot backend
export async function classifyCrime(description) {
  const response = await fetch("http://localhost:8000/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: description }),
  });
  if (!response.ok) throw new Error("Classification failed");
  return await response.json();
}

export async function submitReport(description) {
  // Step 1: Ask AI backend to classify
  const classification = await classifyCrime(description);

  // Step 2: Save it to your existing backend (Spring Boot)
  const reportData = {
    text: classification.complaint,
    crimeType: classification.crime_type,
  };

  const response = await fetch("http://localhost:8080/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) throw new Error("Failed to submit report");
  return await response.json();
}

export async function fetchReports() {
  const response = await fetch("http://localhost:8080/api/reports");
  if (!response.ok) throw new Error("Failed to fetch reports");
  return await response.json();
}

