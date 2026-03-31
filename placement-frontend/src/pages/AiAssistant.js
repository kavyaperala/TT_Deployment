import React, { useState } from "react";
import "../App.css";

const AiAssistant = () => {
  const [formData, setFormData] = useState({
    name: "",
    cgpa: "",
    skills: "",
    branch: "",
    targetCompany: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeEligibility = async () => {
    if (!formData.name || !formData.cgpa || !formData.skills || !formData.targetCompany) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate AI Analysis Delay
    setTimeout(() => {
      const cgpa = parseFloat(formData.cgpa);
      const isEligible = cgpa >= 7.5; // Mock logic

      setResult({
        status: isEligible ? "Eligible" : "Not Eligible",
        reason: isEligible 
          ? `Your CGPA of ${cgpa} meets the technical threshold for ${formData.targetCompany}.`
          : `Your CGPA of ${cgpa} is below the typical cutoff (7.5) for ${formData.targetCompany}.`,
        missingSkills: isEligible 
          ? ["System Design (Advanced)", "Cloud Computing"]
          : ["Data Structures", "Algorithms", "Problem Solving"],
        improvementPlan: [
          "Focus on competitive programming for the next 2 months.",
          "Complete a major project in a relevant tech stack.",
          "Practice mock interviews focusing on behavioral rounds."
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="main-content" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="hero-section" style={{ padding: "40px 20px" }}>
        <h1 className="hero-title">AI Eligibility <span className="gradient-text">Assistant</span></h1>
        <p className="hero-subtitle">Get deep AI-driven insights into your placement readiness.</p>
      </section>

      <div className="form-card" style={{ width: "100%", maxWidth: "700px", padding: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Shivani Parsi" />
          </div>
          <div className="form-group">
            <label className="form-label">CGPA</label>
            <input name="cgpa" type="number" step="0.1" className="form-input" value={formData.cgpa} onChange={handleChange} placeholder="8.5" />
          </div>
          <div className="form-group">
            <label className="form-label">Branch</label>
            <input name="branch" className="form-input" value={formData.branch} onChange={handleChange} placeholder="CSE / ECE" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Company</label>
            <input name="targetCompany" className="form-input" value={formData.targetCompany} onChange={handleChange} placeholder="Google" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Skills (comma separated)</label>
          <input name="skills" className="form-input" value={formData.skills} onChange={handleChange} placeholder="Java, React, SQL" />
        </div>

        <button className="submit-btn" onClick={analyzeEligibility} disabled={loading}>
          {loading ? "AI Analyzing..." : "Run AI Eligibility Check"}
        </button>

        {result && (
          <div style={{ marginTop: "30px", animation: "fadeInUp 0.5s ease" }}>
            <div className={`result-card ${result.status === "Eligible" ? "eligible" : "not-eligible"}`}>
              <span style={{ fontSize: "30px" }}>{result.status === "Eligible" ? "✅" : "❌"}</span>
              <div className="result-body">
                <h3>{result.status}</h3>
                <p>{result.reason}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
              <div className="form-card" style={{ padding: "20px", background: "rgba(255,255,255,0.02)" }}>
                <h4 style={{ color: "var(--accent-rose)", marginBottom: "10px" }}>Missing Skills</h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
                  {result.missingSkills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="form-card" style={{ padding: "20px", background: "rgba(255,255,255,0.02)" }}>
                <h4 style={{ color: "var(--accent-emerald)", marginBottom: "10px" }}>AI Improvement Plan</h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
                  {result.improvementPlan.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
