import { MailCheck, X } from "lucide-react";

export default function DraftModal({ result, user, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox draftModal">
        <button className="closeBtn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="draftHeader">
          <MailCheck size={24} />
          <div>
            <h2>Email Draft</h2>
            <p className="muted">Review your generated email draft</p>
          </div>
        </div>

        <div className="subjectBox">
          <strong>Subject:</strong> {result.subject}
        </div>

        <div className="draftBody">
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>{result.email}</pre>
          <div className="signatureBox" style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ margin: 0 }}>Best regards,</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{user?.name}</p>
            <p style={{ margin: 0 }}>{user?.role}</p>
            <p style={{ margin: 0 }}>Employee ID: {user?.employeeId}</p>
            <img 
              src="https://s3-eu-west-1.amazonaws.com/tpd/logos/519758c8000064000533c13d/0x0.png" 
              alt="Virtual Employee Logo" 
              className="signatureLogo"
              style={{ height: "50px", objectFit: "contain", alignSelf: "flex-start" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
