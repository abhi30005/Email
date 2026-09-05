import { X } from "lucide-react";

export default function ProfileModal({ user, setUser, onClose, hitCount }) {
  function update(field, value) {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <button className="closeBtn" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Edit Profile</h2>
        <p className="muted">These details are used in your email signature.</p>

        <div className="profileGrid">
          <input value={user.name} onChange={(e) => update("name", e.target.value)} placeholder="Name" />
          <input value={user.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" />
          <input value={user.employeeId || ""} onChange={(e) => update("employeeId", e.target.value)} placeholder="Employee ID" />
          <input value={user.role} onChange={(e) => update("role", e.target.value)} placeholder="Role" />
          <input value={user.company} onChange={(e) => update("company", e.target.value)} placeholder="Company" />
        </div>

        <div className="hitBox">
          OpenAI Hit Count: <strong>{hitCount}</strong>
        </div>

        <button className="primaryBtn" onClick={onClose}>Save Profile</button>
      </div>
    </div>
  );
}
