import React from "react";
import "../App.css";

const Improvements = () => {
  const recommendations = [
    {
      title: "Master Data Structures & Algorithms",
      category: "Fundamental",
      impact: "High",
      icon: "🧠",
      description: "Top product companies emphasize algorithmic problem solving. Focus on Trees, Graphs, and Dynamic Programming.",
      action: "Solve 2 problems daily on LeetCode",
      color: "var(--accent-blue)"
    },
    {
      title: "Build a Full-Stack Project",
      category: "Practical",
      impact: "High",
      icon: "💻",
      description: "Demonstrate your ability to build complete applications. Include authentication, database integration, and a clean UI.",
      action: "Create a clone of a popular app (e.g., E-commerce)",
      color: "var(--accent-emerald)"
    },
    {
      title: "System Design Basics",
      category: "Advanced",
      impact: "Medium",
      icon: "🏗️",
      description: "For highly competitive roles, understanding how systems scale, load balancers, and caching works is crucial.",
      action: "Read 'Designing Data-Intensive Applications'",
      color: "var(--accent-purple)"
    },
    {
      title: "Mock Interviews",
      category: "Soft Skills",
      impact: "High",
      icon: "🗣️",
      description: "Communication is just as important as coding. Practice explaining your thought process clearly.",
      action: "Schedule 1 peer interview per week",
      color: "var(--accent-amber)"
    }
  ];

  return (
    <div className="improvements-container main-content" style={{ animation: "fadeInUp 0.6s ease-out", flexDirection: "column", alignItems: "center" }}>
      
      <div className="hero-section" style={{ padding: "40px 20px", textAlign: "center", maxWidth: "800px" }}>
        <h1 className="hero-title">Level Up Your <span className="gradient-text">Profile</span></h1>
        <p className="hero-subtitle">
          Based on our analysis of top placement trends, here are tailored recommendations to boost your eligibility and hireability.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
        gap: "24px",
        width: "100%",
        maxWidth: "1000px",
        padding: "0 20px 40px"
      }}>
        {recommendations.map((rec, idx) => (
          <div key={idx} className="form-card" style={{ 
            padding: "30px", 
            display: "flex", 
            flexDirection: "column",
            height: "100%",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = `0 10px 40px ${rec.color}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg), var(--shadow-glow)";
          }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ 
                width: "48px", height: "48px", 
                borderRadius: "12px", 
                background: `linear-gradient(135deg, ${rec.color}30, transparent)`,
                border: `1px solid ${rec.color}50`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px"
              }}>
                {rec.icon}
              </div>
              <span style={{ 
                padding: "4px 12px", 
                borderRadius: "100px", 
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)"
              }}>
                Impact: <span style={{ color: rec.impact === "High" ? "var(--accent-emerald)" : "var(--accent-blue)" }}>{rec.impact}</span>
              </span>
            </div>
            
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "white" }}>{rec.title}</h3>
            <span style={{ fontSize: "13px", color: rec.color, fontWeight: "600", marginBottom: "16px", display: "inline-block" }}>{rec.category}</span>
            
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px", flexGrow: "1" }}>
              {rec.description}
            </p>
            
            <div style={{ 
              padding: "16px", 
              borderRadius: "8px", 
              backgroundColor: "rgba(255,255,255,0.03)", 
              border: "1px dashed var(--border-subtle)"
            }}>
              <span style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>Action Item</span>
              <span style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{rec.action}</span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Improvements;
