import React, { useState } from "react";
import "../App.css";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = () => {
    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate Extraction & Analysis
    setTimeout(() => {
      setResult({
        atsScore: 82,
        strengths: ["Strong technical core in React/Node.js", "Consistent project history", "Clean formatting"],
        weaknesses: ["Vague metrics for achievements", "Missing contact details (LinkedIn)", "Soft skills underdeveloped"],
        missingKeywords: ["Cloud Computing", "Infrastructure as Code", "Unit Testing", "CI/CD Pipeline"],
        suggestions: [
          "Include quantitative results (e.g., 'Reduced load time by 30%').",
          "Add a dedicated Skills section with proficiency levels.",
          "Ensure your resume is single-page for better impact."
        ]
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="main-content" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="hero-section" style={{ padding: "40px 20px" }}>
        <h1 className="hero-title">AI Resume <span className="gradient-text">Analyzer</span></h1>
        <p className="hero-subtitle">Optimize your resume for applicant tracking systems (ATS).</p>
      </section>

      <div className="form-card" style={{ width: "100%", maxWidth: "800px", padding: "40px", textAlign: "center" }}>
        <div style={{ border: "2px dashed var(--border-subtle)", borderRadius: "12px", padding: "40px", cursor: "pointer", marginBottom: "20px" }} onClick={() => document.getElementById('resume-upload').click()}>
          <span style={{ fontSize: "50px", display: "block", marginBottom: "15px" }}>📄</span>
          {file ? <p style={{ color: "var(--accent-emerald)" }}>{file.name} selected</p> : <p>Click to upload or drag & drop (PDF/DOCX)</p>}
          <input id="resume-upload" type="file" hidden onChange={handleFileChange} accept=".pdf,.docx" />
        </div>

        <button className="submit-btn" onClick={analyzeResume} disabled={loading}>
          {loading ? "AI Parsing Resume..." : "Analyze My Resume"}
        </button>

        {result && (
          <div style={{ marginTop: "40px", textAlign: "left", animation: "fadeInUp 0.5s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: `conic-gradient(var(--accent-emerald) ${result.atsScore}%, rgba(255,255,255,0.1) 0)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "800" }}>
                  {result.atsScore}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "24px" }}>ATS Score</h3>
                <p style={{ color: "var(--text-secondary)" }}>Great score! Your resume is highly readable by automated systems.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-card" style={{ padding: "20px", background: "rgba(16, 185, 129, 0.05)" }}>
                <h4 style={{ color: "var(--accent-emerald)", marginBottom: "10px" }}>Strengths</h4>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="form-card" style={{ padding: "20px", background: "rgba(244, 63, 94, 0.05)" }}>
                <h4 style={{ color: "var(--accent-rose)", marginBottom: "10px" }}>Weaknesses</h4>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>

            <div className="form-card" style={{ marginTop: "20px", padding: "20px" }}>
              <h4 style={{ color: "var(--accent-blue)", marginBottom: "10px" }}>Missing Keywords</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {result.missingKeywords.map((k, i) => <span key={i} className="skill-tag" style={{ background: "rgba(255,255,255,0.05)" }}>{k}</span>)}
              </div>
            </div>

            <div className="form-card" style={{ marginTop: "20px", padding: "20px" }}>
              <h4 style={{ color: "var(--accent-amber)", marginBottom: "10px" }}>Suggestions for Improvement</h4>
              <ul style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
