import { useState, useEffect } from "react";
import { X, Clock, Mail, Copy, Trash2 } from "lucide-react";
import { getEmailHistory, clearEmailHistory } from "../services/api.js";

export default function HistoryModal({ user, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getEmailHistory();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  async function handleCopy(item) {
    const plainText = `Subject: ${item.subject}\n\n${item.generatedEmail}\n\nBest regards,\n${user.name}\n${user.role}\nEmployee ID: ${user.employeeId}`;
    try {
      await navigator.clipboard.writeText(plainText);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }

  async function handleClearHistory() {
    if (!window.confirm("Are you sure you want to delete all email history?")) return;
    
    try {
      await clearEmailHistory();
      setHistory([]);
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  }

  return (
    <div className="modalOverlay">
      <div className="modalBox historyModal">
        <button className="closeBtn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
          <div>
            <div className="draftHeader" style={{ marginBottom: "8px" }}>
              <Clock size={24} color="#8b5cf6" />
              <h2>Email History</h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Recently generated emails
            </p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={handleClearHistory}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5", padding: "8px 14px", borderRadius: "12px",
                cursor: "pointer", fontSize: "13px", fontWeight: "600"
              }}
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {loading ? (
          <div className="skeletonWrap">
            <div className="skeletonLine long"></div>
            <div className="skeletonLine"></div>
            <div className="skeletonLine mid"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="emptyPreview">
            <Mail size={32} />
            <p>No emails generated yet.</p>
          </div>
        ) : (
          <div className="historyList">
            {history.map((item) => (
              <div key={item._id} className="historyCard">
                <div 
                  className="historyHeader" 
                  onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                >
                  <div className="historyInfo">
                    <strong>{item.subject}</strong>
                    <span>{new Date(item.createdAt).toLocaleDateString()} • {item.emailType}</span>
                  </div>
                </div>
                {expandedId === item._id && (
                  <div className="historyBody">
                    <pre>{item.generatedEmail}</pre>
                    <div className="signatureBox" style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <p style={{ margin: 0 }}>Best regards,</p>
                      <p style={{ margin: 0, fontWeight: "bold" }}>{user?.name}</p>
                      <p style={{ margin: 0 }}>{user?.role}</p>
                      <p style={{ margin: 0 }}>Employee ID: {user?.employeeId}</p>
                    </div>
                    <button className="copyBtn" onClick={() => handleCopy(item)}>
                      <Copy size={16} /> Copy
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
