import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthPage from "./components/AuthPage.jsx";
import Header from "./components/Header.jsx";
import ProfileModal from "./components/ProfileModal.jsx";
import EmailForm from "./components/EmailForm.jsx";
import EmailPreview from "./components/EmailPreview.jsx";
import DraftModal from "./components/DraftModal.jsx";
import HistoryModal from "./components/HistoryModal.jsx";
import { generateEmailDraft } from "./services/api.js";

const defaultForm = {
  recipient: "",
  designation: "Manager",
  emailType: "Work Update",
  tone: "Professional",
  length: "Short & Clear",
  keyDetails: "",
  additionalInstructions: ""
};

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("email_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.employeeId) parsed.employeeId = "VE-12345";
        return parsed;
      }
      return null;
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      return null;
    }
  });

  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState({ subject: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hitCount, setHitCount] = useState(() => Number(localStorage.getItem("openai_hit_count") || "0"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("email_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("email_user");
    }
  }, [user]);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(""), 1800);
  }

  function handleLogin(userData) {
    setUser(userData);
    navigate("/dashboard");
  }

  function handleLogout() {
    setUser(null);
    navigate("/");
  }

  async function handleGenerate() {
    if (!form.recipient.trim() || !form.keyDetails.trim()) {
      showToast("Recipient and Key Details are required");
      return;
    }

    setLoading(true);
    setResult({ subject: "", email: "" });

    try {
      const data = await generateEmailDraft({
        ...form,
        senderName: user.name,
        senderRole: user.role,
        companyName: user.company,
        senderEmail: user.email,
        senderEmployeeId: user.employeeId
      });

      setResult(data);

      const nextCount = hitCount + 1;
      setHitCount(nextCount);
      localStorage.setItem("openai_hit_count", String(nextCount));

      showToast("Email generated");
    } catch {
      showToast("Backend error. Please check server.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result.email) return;
    
    const plainText = `Subject: ${result.subject}\n\n${result.email}\n\nBest regards,\n${user.name}\n${user.role}\nEmployee ID: ${user.employeeId}`;
    const htmlText = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <p><b>Subject:</b> ${result.subject}</p>
        <div style="white-space: pre-wrap;">${result.email}</div>
        <br><br>
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 0; font-weight: bold;">${user.name}</p>
        <p style="margin: 0;">${user.role}</p>
        <p style="margin: 0;">Employee ID: ${user.employeeId}</p>
        <br>
        <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/519758c8000064000533c13d/0x0.png" alt="Virtual Employee Logo" height="50" />
      </div>
    `;

    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([plainText], { type: "text/plain" }),
        "text/html": new Blob([htmlText], { type: "text/html" })
      });
      await navigator.clipboard.write([clipboardItem]);
      showToast("Copied with signature!");
    } catch (err) {
      await navigator.clipboard.writeText(plainText);
      showToast("Copied as plain text!");
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage onLogin={handleLogin} initialMode={null} />} />
        <Route path="/login" element={<AuthPage onLogin={handleLogin} initialMode="login" />} />
        <Route path="/register" element={<AuthPage onLogin={handleLogin} initialMode="register" />} />
        
        <Route path="/dashboard" element={
          user ? (
            <div className="app">
              <div className="glow glowOne"></div>
              <div className="glow glowTwo"></div>

              <Header 
                user={user} 
                onLogout={handleLogout} 
                openProfile={() => setShowProfile(true)} 
                openHistory={() => setShowHistory(true)} 
              />

              <main className="mainLayout">
                <EmailForm form={form} setForm={setForm} onGenerate={handleGenerate} loading={loading} />
                <EmailPreview
                  result={result}
                  loading={loading}
                  user={user}
                  onCopy={handleCopy}
                  onOpenDraft={() => setShowDraft(true)}
                />
              </main>

              {showProfile && (
                <ProfileModal
                  user={user}
                  setUser={setUser}
                  hitCount={hitCount}
                  onClose={() => setShowProfile(false)}
                />
              )}

              {showHistory && <HistoryModal user={user} onClose={() => setShowHistory(false)} />}

              {showDraft && <DraftModal result={result} user={user} onClose={() => setShowDraft(false)} />}
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {toast && <div className="toast" style={{ zIndex: 9999 }}>{toast}</div>}
    </>
  );
}
