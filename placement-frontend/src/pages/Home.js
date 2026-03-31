import React, { useState, useEffect } from "react";
import "../App.css";

const Home = ({ checksCount, setChecksCount }) => {
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  // Real-time validation
  const errors = {};
  if (touched.name && !name.trim()) errors.name = "Name is required";
  if (touched.cgpa) {
    const val = parseFloat(cgpa);
    if (!cgpa) errors.cgpa = "CGPA is required";
    else if (isNaN(val) || val < 0 || val > 10)
      errors.cgpa = "Enter a valid CGPA (0-10)";
  }
  if (touched.skills && !skills.trim())
    errors.skills = "At least one skill is required";
  if (touched.companyName && !companyName.trim())
    errors.companyName = "Company name is required";

  const isFormValid =
    name.trim() &&
    cgpa &&
    !isNaN(parseFloat(cgpa)) &&
    parseFloat(cgpa) >= 0 &&
    parseFloat(cgpa) <= 10 &&
    skills.trim() &&
    companyName.trim();

  const skillTags = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const checkEligibility = async () => {
    setTouched({ name: true, cgpa: true, skills: true, companyName: true });

    if (!isFormValid) {
      setResult({
        type: "error",
        title: "Missing Information",
        message: "Please fill all fields correctly before checking.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    const student = {
      name: name.trim(),
      cgpa: parseFloat(cgpa),
      backlogs: 0,
      skills: skills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch(
        `https://ttdeployment-4pmp.onrender.com/placement/eligibility?companyName=${encodeURIComponent(
          companyName.trim()
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        }
      );

      const data = await response.text();
      const isEligible =
        data.toLowerCase().includes("eligible") &&
        !data.toLowerCase().includes("not eligible");

      setResult({
        type: isEligible ? "eligible" : "not-eligible",
        title: isEligible ? "🎉 Congratulations!" : "Keep Working Hard!",
        message: data,
      });

      const newCount = checksCount + 1;
      setChecksCount(newCount);
      localStorage.setItem("placementChecks", newCount.toString());
    } catch (error) {
      setResult({
        type: "error",
        title: "Connection Failed",
        message:
          "Unable to reach the backend server. Make sure the Spring Boot server is running on port 8080.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isFormValid && !loading) {
      checkEligibility();
    }
  };

  const resetForm = () => {
    setName("");
    setCgpa("");
    setSkills("");
    setCompanyName("");
    setResult(null);
    setTouched({});
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Real-time Eligibility Checker
        </div>
        <h1 className="hero-title">
          Placement <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="hero-subtitle">
          Instantly check your eligibility for top companies. Enter your details
          and get real-time results powered by our smart backend engine.
        </p>
      </section>

      <main className="main-content">
        <div className="form-card">
          <div className="form-header">
            <h2>Check Your Eligibility</h2>
            <p>Fill in your details and select a company to check</p>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👤</span> Full Name
            </label>
            <input
              id="input-name"
              className={`form-input ${
                errors.name ? "error" : touched.name && name ? "valid" : ""
              }`}
              type="text"
              placeholder="e.g. Shivani Parsi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              onKeyDown={handleKeyPress}
            />
            {errors.name && <div className="field-error">⚠ {errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📊</span> CGPA
            </label>
            <input
              id="input-cgpa"
              className={`form-input ${
                errors.cgpa
                  ? "error"
                  : touched.cgpa && cgpa && !errors.cgpa
                  ? "valid"
                  : ""
              }`}
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g. 8.5"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              onBlur={() => handleBlur("cgpa")}
              onKeyDown={handleKeyPress}
            />
            {errors.cgpa ? (
              <div className="field-error">⚠ {errors.cgpa}</div>
            ) : (
              <div className="field-hint">Scale: 0 to 10</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">💡</span> Skills
            </label>
            <input
              id="input-skills"
              className={`form-input ${
                errors.skills
                  ? "error"
                  : touched.skills && skills
                  ? "valid"
                  : ""
              }`}
              type="text"
              placeholder="e.g. java, python, sql, react"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onBlur={() => handleBlur("skills")}
              onKeyDown={handleKeyPress}
            />
            {errors.skills ? (
              <div className="field-error">⚠ {errors.skills}</div>
            ) : (
              <div className="field-hint">Separate skills with commas</div>
            )}
            {skillTags.length > 0 && (
              <div className="skills-preview">
                {skillTags.map((tag, i) => (
                  <span key={i} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏢</span> Company Name
            </label>
            <input
              id="input-company"
              className={`form-input ${
                errors.companyName
                  ? "error"
                  : touched.companyName && companyName
                  ? "valid"
                  : ""
              }`}
              type="text"
              placeholder="e.g. Google, Amazon, Infosys"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onBlur={() => handleBlur("companyName")}
              onKeyDown={handleKeyPress}
            />
            {errors.companyName && (
              <div className="field-error">⚠ {errors.companyName}</div>
            )}
          </div>

          <button
            id="btn-check-eligibility"
            className="submit-btn"
            onClick={checkEligibility}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                Check Eligibility
                <span className="btn-icon">→</span>
              </>
            )}
          </button>

          {result && (
            <div className="result-container">
              <div className={`result-card ${result.type}`}>
                <span className="result-icon">
                  {result.type === "eligible"
                    ? "🎯"
                    : result.type === "not-eligible"
                    ? "📋"
                    : "⚠️"}
                </span>
                <div className="result-body">
                  <h3>{result.title}</h3>
                  <p>{result.message}</p>
                </div>
              </div>
              {(result.type === "eligible" ||
                result.type === "not-eligible") && (
                <button
                  className="submit-btn"
                  onClick={resetForm}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border-subtle)",
                    marginTop: "12px",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                >
                  Check Another Company
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
