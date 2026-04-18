"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Namaste! I am your Purohit Baaje assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply || "Please try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please call us!" }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 99999 }}>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: "absolute", bottom: "70px", right: "0",
          width: "320px", height: "450px", background: "white",
          borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: "1px solid rgba(255,153,51,0.3)",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1a0f00, #3d2200)",
            padding: "14px 16px", display: "flex",
            alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>🙏</span>
              <div>
                <div style={{ color: "white", fontWeight: 600, fontSize: "13px" }}>Purohit Assistant</div>
                <div style={{ color: "#4ade80", fontSize: "10px" }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", color: "white",
              cursor: "pointer", fontSize: "18px", lineHeight: 1,
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "8px",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%", padding: "8px 12px",
                  borderRadius: "12px", fontSize: "13px", lineHeight: 1.5,
                  background: msg.role === "user" ? "#ff9933" : "#f5f0ea",
                  color: msg.role === "user" ? "white" : "#1a0f00",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ background: "#f5f0ea", padding: "8px 12px", borderRadius: "12px", width: "fit-content", fontSize: "13px", color: "#1a0f00" }}>
                typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["Book a Puja", "Find a Priest", "Pricing", "Astrology"].map((r) => (
                <button key={r} onClick={() => sendMessage(r)} style={{
                  padding: "4px 10px", borderRadius: "999px", fontSize: "11px",
                  border: "1px solid #ff9933", background: "rgba(255,153,51,0.1)",
                  color: "#ff9933", cursor: "pointer",
                }}>{r}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "10px 12px", borderTop: "1px solid #f0e8dc",
            display: "flex", gap: "8px",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: "8px 12px", borderRadius: "999px",
                border: "1px solid #ffd4a0", fontSize: "12px",
                outline: "none", background: "#fdf6ec",
              }}
            />
            <button onClick={() => sendMessage(input)} style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "#ff9933", border: "none",
              cursor: "pointer", color: "white", fontSize: "14px",
            }}>➤</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "linear-gradient(135deg, #ff9933, #e8b923)",
          border: "none", cursor: "pointer",
          fontSize: "24px", display: "flex",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(255,153,51,0.6)",
        }}
      >
        {open ? "×" : "🙏"}
      </button>
    </div>
  );
}