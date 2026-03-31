import React from "react";
import "../App.css";

const Dashboard = () => {
  // Mock data for the dashboard
  const recentActivity = [
    { company: "Google", status: "eligible", date: "Today", score: "92%" },
    { company: "Microsoft", status: "eligible", date: "Yesterday", score: "88%" },
    { company: "Amazon", status: "not-eligible", date: "3 days ago", score: "65%" },
    { company: "Meta", status: "eligible", date: "Last week", score: "90%" }
  ];

  const skillMatch = [
    { skill: "React", match: "High", color: "var(--accent-emerald)" },
    { skill: "Java", match: "Medium", color: "var(--accent-blue)" },
    { skill: "SQL", match: "High", color: "var(--accent-emerald)" },
    { skill: "System Design", match: "Low", color: "var(--accent-rose)" }
  ];

  return (
    <div className="dashboard-container main-content" style={{ animation: "fadeInUp 0.6s ease-out" }}>
      <div className="dashboard-header" style={{ width: "100%", maxWidth: "1000px", marginBottom: "30px" }}>
        <h1 className="hero-title" style={{ fontSize: "36px", textAlign: "left" }}>Welcome to your <span className="gradient-text">Dashboard</span></h1>
        <p className="hero-subtitle" style={{ textAlign: "left", margin: "0" }}>Track your placement readiness and recent analysis.</p>
      </div>

      <div className="dashboard-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "24px",
        width: "100%",
        maxWidth: "1000px"
      }}>
        {/* Readiness Score Card */}
        <div className="form-card" style={{ padding: "30px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "18px", color: "var(--text-secondary)" }}>Overall Readiness Score</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ 
              position: "relative",
              width: "120px", height: "120px", 
              borderRadius: "50%", 
              background: "conic-gradient(var(--accent-blue) 84%, rgba(255,255,255,0.1) 0)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ 
                width: "90px", height: "90px", 
                backgroundColor: "var(--bg-card)", 
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column"
              }}>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "white" }}>84%</span>
              </div>
            </div>
            <div>
              <p style={{ color: "var(--text-primary)", fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}>Strong Candidate</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: "1.5" }}>Your profile matches 84% of criteria for top tier tech companies.</p>
            </div>
          </div>
        </div>

        {/* Skill Analysis Card */}
        <div className="form-card" style={{ padding: "30px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "18px", color: "var(--text-secondary)" }}>Skill Analysis</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {skillMatch.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "500", fontSize: "15px" }}>{item.skill}</span>
                <span style={{ 
                  padding: "4px 12px", 
                  borderRadius: "100px", 
                  fontSize: "12px",
                  fontWeight: "600",
                  backgroundColor: `rgba(255,255,255,0.05)`,
                  color: item.color,
                  border: `1px solid ${item.color}30`
                }}>
                  {item.match} Match
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="form-card" style={{ padding: "30px", gridColumn: "1 / -1" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "18px", color: "var(--text-secondary)" }}>Recent Checks</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "13px" }}>Company</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "13px" }}>Date</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "13px" }}>Match Score</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "13px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "16px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                        🏢
                      </div>
                      {activity.company}
                    </td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "14px" }}>{activity.date}</td>
                    <td style={{ padding: "16px", fontWeight: "500", fontSize: "14px" }}>{activity.score}</td>
                    <td style={{ padding: "16px" }}>
                      <span className={`result-card ${activity.status}`} style={{ padding: "6px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", display: "inline-block", border: "none" }}>
                        {activity.status === "eligible" ? "Eligible" : "Not Eligible"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
