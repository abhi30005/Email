import { Loader2, Sparkles } from "lucide-react";
import Select from "./Select.jsx";

export default function EmailForm({ form, setForm, onGenerate, loading }) {
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const designations = ["Manager", "HR", "Client", "Team Lead", "Colleague"];
  const emailTypes = ["General", "Work Update", "Leave Request", "Issue Report", "Client Follow-up", "Feedback Request", "Project Submission"];
  const tones = ["Professional", "Simple", "Polite", "Formal", "Industry Standard"];
  const lengths = ["Short & Clear", "Medium", "Detailed"];

  return (
    <section className="panel formPanel">
      <div className="sectionTitle">
        <Sparkles size={18} />
        <span>Email Input</span>
      </div>

      <div className="formGrid">
        <div className="inputGroup">
          <label>To *</label>
          <input
            placeholder="Enter recipient name or email"
            value={form.recipient}
            onChange={(e) => update("recipient", e.target.value)}
          />
        </div>

        <div className="gridCol2">
          <div className="inputGroup">
            <label>Designation *</label>
            <Select 
              value={form.designation} 
              onChange={(val) => update("designation", val)}
              options={designations}
            />
          </div>
          <div className="inputGroup">
            <label>Type *</label>
            <Select 
              value={form.emailType} 
              onChange={(val) => update("emailType", val)}
              options={emailTypes}
            />
          </div>
        </div>

        <div className="gridCol2">
          <div className="inputGroup">
            <label>Tone *</label>
            <Select 
              value={form.tone} 
              onChange={(val) => update("tone", val)}
              options={tones}
            />
          </div>
          <div className="inputGroup">
            <label>Length *</label>
            <Select 
              value={form.length} 
              onChange={(val) => update("length", val)}
              options={lengths}
            />
          </div>
        </div>

        <div className="inputGroup">
          <label>Key Details *</label>
          <textarea
            placeholder="Write the main points you want to include..."
            value={form.keyDetails}
            onChange={(e) => update("keyDetails", e.target.value)}
            style={{ height: "100px" }}
          />
        </div>

        <div className="inputGroup">
          <label>Additional Instructions</label>
          <textarea
            placeholder="Optional instructions..."
            value={form.additionalInstructions}
            onChange={(e) => update("additionalInstructions", e.target.value)}
            style={{ height: "60px" }}
          />
        </div>

        <div className="inputGroup">
          <label>Attachment</label>
          <div className="attachmentBtn">
            <span className="muted">optional</span>
            <label className="attachLabel">
              + Add Attachment
              <input type="file" style={{ display: "none" }} />
            </label>
          </div>
        </div>
      </div>

      <button className="generateBtn" onClick={onGenerate} disabled={loading}>
        {loading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
        {loading ? "Generating..." : "Generate Email"}
      </button>
    </section>
  );
}
