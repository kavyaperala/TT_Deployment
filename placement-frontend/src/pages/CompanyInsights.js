import React, { useState } from "react";
import "../App.css";

const CompanyInsights = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    {
      id: "google",
      name: "Google",
      description: "A global leader in search, cloud computing, and AI.",
      culture: "Innovation-driven, flat hierarchy, and 'Googley' environment.",
      interview: "Heavy focus on DS/Algo, System Design, and Behavioral (Googliness) rounds.",
      salary: "High (₹15L - ₹60L+ for freshers)",
      hiring: "Year-round, primarily through TCS/CodeAgon or direct referrals.",
      icon: "🌐"
    },
    {
      id: "amazon",
      name: "Amazon",
      description: "The world's largest e-commerce and cloud provider.",
      culture: "Customer obsession, ownership, and high-performance bar.",
      interview: "Rigorous focus on 16 Leadership Principles and coding proficiency.",
      salary: "High (₹12L - ₹45L+ for freshers)",
      hiring: "Heavy intake during campus placements and Amazon WOW sessions.",
      icon: "📦"
    },
    {
      id: "microsoft",
      name: "Microsoft",
      description: "Global tech giant known for Windows, Azure, and Productivity tools.",
      culture: "Integrity, growth mindset, and collaborative development.",
      interview: "Emphasis on fundamental concepts, OS, and problem-solving skills.",
      salary: "High (₹12L - ₹40L+ for freshers)",
      hiring: "Microsoft Engage, Microsoft Mars, and nationwide hiring events.",
      icon: "💻"
    },
    {
      id: "tcs",
      name: "TCS",
      description: "Leading global IT services and consulting company.",
      culture: "Stability, vast learning resources, and global presence.",
      interview: "NQT based hiring followed by Technical and Managerial rounds.",
      salary: "Competitive (₹3.5L - ₹7L for Digital/Ninja roles)",
      hiring: "Mass hiring through National Qualifier Test (NQT).",
      icon: "👔"
    }
  ];

  return (
    <div className="main-content" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="hero-section" style={{ padding: "40px 20px" }}>
        <h1 className="hero-title">Company <span className="gradient-text">Insights</span></h1>
        <p className="hero-subtitle">
          Get in-depth awareness about the hiring process and culture of top recruiters.
        </p>
      </section>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "16px",
        width: "100%",
        maxWidth: "1000px",
        marginBottom: "40px"
      }}>
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className="form-card"
            style={{ 
              padding: "20px", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              border: selectedCompany?.id === company.id ? "1.5px solid var(--accent-blue)" : "1px solid var(--border-subtle)",
              background: selectedCompany?.id === company.id ? "rgba(59, 130, 246, 0.1)" : "var(--bg-card)",
              transition: "all 0.3s ease"
            }}
          >
            <span style={{ fontSize: "24px" }}>{company.icon}</span>
            <span style={{ fontWeight: "600", color: "white" }}>{company.name}</span>
          </button>
        ))}
      </div>

      {selectedCompany ? (
        <div className="form-card" style={{ 
          width: "100%", 
          maxWidth: "1000px", 
          padding: "40px",
          animation: "fadeInUp 0.5s ease-out"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "28px", color: "white" }}>{selectedCompany.name}</h2>
              <p style={{ color: "var(--text-secondary)" }}>{selectedCompany.description}</p>
            </div>
            <span style={{ fontSize: "40px" }}>{selectedCompany.icon}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <InsightItem title="Work Culture" icon="🤝" content={selectedCompany.culture} />
            <InsightItem title="Interview Process" icon="🎯" content={selectedCompany.interview} />
            <InsightItem title="Salary Expectations" icon="💰" content={selectedCompany.salary} />
            <InsightItem title="How They Hire" icon="🚀" content={selectedCompany.hiring} />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
          <p>Select a company to view detailed insights.</p>
        </div>
      )}
    </div>
  );
};

const InsightItem = ({ title, icon, content }) => (
  <div style={{ 
    padding: "20px", 
    backgroundColor: "rgba(255,255,255,0.03)", 
    borderRadius: "12px", 
    border: "1px solid var(--border-subtle)" 
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
      <span style={{ fontSize: "20px" }}>{icon}</span>
      <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>{title}</h3>
    </div>
    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{content}</p>
  </div>
);

export default CompanyInsights;
