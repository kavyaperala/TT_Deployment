import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Improvements from "./pages/Improvements";
import CompanyInsights from "./pages/CompanyInsights";
import AiAssistant from "./pages/AiAssistant";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [checksCount, setChecksCount] = useState(0);

  const checkBackend = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      await fetch("https://ttdeployment-4pmp.onrender.com/placement/eligibility", {
        method: "OPTIONS",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      setBackendStatus("online");
    } catch {
      setBackendStatus("offline");
    }
  }, []);

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, [checkBackend]);

  useEffect(() => {
    const saved = localStorage.getItem("placementChecks");
    if (saved) setChecksCount(parseInt(saved, 10));
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        <Navbar backendStatus={backendStatus} />

        <Routes>
          <Route path="/" element={<Home checksCount={checksCount} setChecksCount={setChecksCount} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/improvements" element={<Improvements />} />
          <Route path="/insights" element={<CompanyInsights />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ChatBot />

        <footer className="footer">
          <p>
            Built with <span>♥</span> — Placement Analyzer © 2026
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;