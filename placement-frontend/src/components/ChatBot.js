import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Career Assistant. How can I help you with your placement prep today?", isAi: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isAi: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // AI Mock Response
    setTimeout(() => {
      const aiResponse = { text: generateAiResponse(input), isAi: true };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAiResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes("resume")) return "I recommend using our AI Resume Analyzer to get an ATS score and specific keyword suggestions!";
    if (text.includes("google") || text.includes("amazon") || text.includes("microsoft")) return "You should check out our Company Insights page for detailed hiring processes of top tech giants.";
    if (text.includes("skill") || text.includes("learn")) return "The Improvements page lists out specific courses and action items tailored to current placement trends.";
    return "That's a great question. For placement prep, it's best to keep practicing DS/Algo and refine your resume regularly. Can I help with anything specific?";
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Career Assistant</h4>
            <span>Online</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.isAi ? "ai" : "user"}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === "Enter" && handleSend()} 
              placeholder="Ask anything..." 
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      <style>{`
        .chatbot-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 1000; }
        .chat-toggle { width: 60px; height: 60px; border-radius: 50%; background: var(--gradient-primary); border: none; font-size: 24px; color: white; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: transform 0.3s ease; }
        .chat-toggle:hover { transform: scale(1.1); }
        .chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: var(--bg-card); backdrop-filter: blur(20px); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow-lg); }
        .chat-header { padding: 15px; background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; }
        .chat-header h4 { margin: 0; font-size: 16px; }
        .chat-header span { font-size: 12px; color: var(--accent-emerald); }
        .chat-messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .message { padding: 10px 15px; border-radius: 12px; max-width: 85%; font-size: 14px; line-height: 1.4; }
        .message.ai { background: rgba(255,255,255,0.05); color: var(--text-primary); align-self: flex-start; border-bottom-left-radius: 2px; }
        .message.user { background: var(--gradient-primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }
        .chat-input-area { padding: 15px; border-top: 1px solid var(--border-subtle); display: flex; gap: 10px; }
        .chat-input-area input { flex: 1; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 8px 15px; color: white; outline: none; }
        .chat-input-area button { background: none; border: none; color: var(--accent-blue); font-size: 20px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default ChatBot;
