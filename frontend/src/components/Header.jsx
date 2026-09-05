import { LogOut, MailPlus, UserRound, Clock } from "lucide-react";

export default function Header({ user, onLogout, openProfile, openHistory }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">
          <MailPlus size={24} />
        </div>
        <div>
          <h1>AI Email Drafting Assistant</h1>
          <p>Professional email generator for daily work</p>
        </div>
      </div>

      <div className="headerActions">
        <button onClick={openHistory}>
          <Clock size={16} />
          History
        </button>
        <button onClick={openProfile}>
          <UserRound size={16} />
          {user.name}
        </button>
        <button onClick={onLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
