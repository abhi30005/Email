import { Mail, Sparkles, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ onLogin, initialMode }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(initialMode === "register");
  const [showAuthModal, setShowAuthModal] = useState(!!initialMode);
  
  useEffect(() => {
    if (initialMode) {
      setShowAuthModal(true);
      setIsSignup(initialMode === "register");
    } else {
      setShowAuthModal(false);
    }
  }, [initialMode]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    setError("");
    
    // Retrieve mock DB
    const usersDb = JSON.parse(localStorage.getItem("email_users_db") || "[]");

    if (isSignup) {
      // Check if user already exists
      const exists = usersDb.find(u => u.email === email);
      if (exists) {
        setError("User with this email already exists.");
        return;
      }
      
      const newUser = {
        name,
        email,
        password,
        role,
        employeeId,
        company: "TechValley India Pvt. Ltd."
      };
      
      usersDb.push(newUser);
      localStorage.setItem("email_users_db", JSON.stringify(usersDb));
      
      // Log them in without the password
      const { password: _, ...userSession } = newUser;
      onLogin(userSession);
    } else {
      // Login mode
      const user = usersDb.find(u => u.email === email && u.password === password);
      if (!user) {
        setError("Invalid email or password.");
        return;
      }
      
      const { password: _, ...userSession } = user;
      onLogin(userSession);
    }
  }

  return (
    <div className="landingPage">
      <div className="glow glowOne" style={{ width: '600px', height: '600px', top: '-20%', left: '-10%' }}></div>
      <div className="glow glowTwo" style={{ width: '500px', height: '500px', bottom: '-20%', right: '-10%' }}></div>
      
      <div className="landingContent">
        <div className="landingHero">
          <div className="heroBadge">
            <Sparkles size={16} color="#8b5cf6" />
            <span>AI-Powered Drafting</span>
          </div>
          <h1>
            Craft the Perfect Email in <span>Seconds</span>
          </h1>
          <p>
            Generate professional, clear, and industry-standard emails for any scenario. 
            Stop staring at a blank screen and let AI handle the heavy lifting for you.
          </p>
          <div className="heroActions">
            <button className="primaryBtn ctaBtn" onClick={() => navigate("/register")}>
              Get Started — It's Free <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="modalOverlay" style={{ zIndex: 100 }}>
          <div className="authModalWrapper">
            <button className="closeBtn authCloseBtn" onClick={() => navigate("/")}>
              <X size={20} />
            </button>
            <div className={`authFlip ${isSignup ? "signupMode" : ""}`}>
              <div className="authBox">
                <div className="authIcon">
                  <Mail size={26} />
                </div>
                <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
                <p>{isSignup ? "Sign up to save your email drafting profile." : "Sign in to continue drafting emails."}</p>

                {error && <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "14px", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px" }}>{error}</div>}

                <form onSubmit={submit}>
                  {isSignup && (
                    <>
                      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                      <input required value={role} onChange={(e) => setRole(e.target.value)} placeholder="Designation" />
                      <input required value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Employee ID" />
                    </>
                  )}
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  
                  <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
                </form>

                <button className="switchBtn" type="button" onClick={() => { setError(""); navigate(isSignup ? "/login" : "/register"); }}>
                  {isSignup ? "Already have an account? Sign In" : "New user? Create account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
