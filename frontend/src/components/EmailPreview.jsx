import { Clipboard, FileText, Mail } from "lucide-react";

export default function EmailPreview({ result, loading, user, onCopy, onOpenDraft }) {
  return (
    <section className="panel previewPanel">
      <div className="previewTop">
        <div>
          <h2>Generated Email</h2>
          <p>Preview, copy, or open as draft popup</p>
        </div>
        <div className="previewActions">
          <button onClick={onCopy} disabled={!result.email}>
            <Clipboard size={16} />
            Copy
          </button>
          <button onClick={onOpenDraft} disabled={!result.email}>
            <Mail size={16} />
            Draft
          </button>
        </div>
      </div>

      {loading && (
        <div className="skeletonWrap">
          <div className="skeletonLine long"></div>
          <div className="skeletonLine"></div>
          <div className="skeletonLine mid"></div>
          <div className="skeletonBlock"></div>
        </div>
      )}

      {!loading && !result.email && (
        <div className="emptyPreview">
          <FileText size={42} />
          <h3>Your email will appear here</h3>
          <p>Select type, tone, purpose, and details, then generate.</p>
        </div>
      )}

      {!loading && result.email && (
        <div className="emailPaper">
          <div className="subjectBox">
            <strong>Subject:</strong> {result.subject}
          </div>
          <pre>{result.email}</pre>
          <div className="signatureBox">
            <p style={{ margin: 0 }}>Best regards,</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{user?.name}</p>
            <p style={{ margin: 0 }}>{user?.role}</p>
            <p style={{ margin: 0 }}>Employee ID: {user?.employeeId}</p>
            <img 
              src="https://s3-eu-west-1.amazonaws.com/tpd/logos/519758c8000064000533c13d/0x0.png" 
              alt="Virtual Employee Logo" 
              className="signatureLogo"
            />
          </div>
        </div>
      )}
    </section>
  );
}
