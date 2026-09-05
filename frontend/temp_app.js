import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=cadfd7f4"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import AuthPage from "/src/components/AuthPage.jsx";
import Header from "/src/components/Header.jsx";
import ProfileModal from "/src/components/ProfileModal.jsx";
import EmailForm from "/src/components/EmailForm.jsx";
import EmailPreview from "/src/components/EmailPreview.jsx";
import DraftModal from "/src/components/DraftModal.jsx";
import { generateEmailDraft } from "/src/services/api.js";
const defaultUser = {
  name: "Abhijit Bhunia",
  email: "abhijit@example.com",
  role: "Trainee",
  company: "TechValley India Pvt. Ltd."
};
const defaultForm = {
  recipient: "Sandip Ghosh Sir",
  emailType: "Work Update",
  tone: "Professional",
  purpose: "",
  details: ""
};
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("email_user");
      return saved ? JSON.parse(saved) : null;
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
  const [hitCount, setHitCount] = useState(() => Number(localStorage.getItem("openai_hit_count") || "0"));
  useEffect(() => {
    if (user) localStorage.setItem("email_user", JSON.stringify(user));
  }, [user]);
  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(""), 1800);
  }
  async function handleGenerate() {
    if (!form.purpose.trim() || !form.details.trim()) {
      showToast("Please add purpose and details");
      return;
    }
    setLoading(true);
    setResult({ subject: "", email: "" });
    try {
      const data = await generateEmailDraft({
        ...form,
        senderName: user.name,
        senderRole: user.role,
        companyName: user.company
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
    await navigator.clipboard.writeText(`Subject: ${result.subject}

${result.email}`);
    showToast("Copied!!");
  }
  if (!user) {
    return /* @__PURE__ */ React.createElement(AuthPage, { onLogin: setUser });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "app" }, /* @__PURE__ */ React.createElement("div", { className: "glow glowOne" }), /* @__PURE__ */ React.createElement("div", { className: "glow glowTwo" }), /* @__PURE__ */ React.createElement(Header, { user, onLogout: () => setUser(null), openProfile: () => setShowProfile(true) }), /* @__PURE__ */ React.createElement("main", { className: "mainLayout" }, /* @__PURE__ */ React.createElement(EmailForm, { form, setForm, onGenerate: handleGenerate, loading }), /* @__PURE__ */ React.createElement(
    EmailPreview,
    {
      result,
      loading,
      onCopy: handleCopy,
      onOpenDraft: () => setShowDraft(true)
    }
  )), showProfile && /* @__PURE__ */ React.createElement(
    ProfileModal,
    {
      user,
      setUser,
      hitCount,
      onClose: () => setShowProfile(false)
    }
  ), showDraft && /* @__PURE__ */ React.createElement(DraftModal, { result, onClose: () => setShowDraft(false) }), toast && /* @__PURE__ */ React.createElement("div", { className: "toast" }, toast));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEF1dGhQYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQXV0aFBhZ2UuanN4XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2NvbXBvbmVudHMvSGVhZGVyLmpzeFwiO1xuaW1wb3J0IFByb2ZpbGVNb2RhbCBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2ZpbGVNb2RhbC5qc3hcIjtcbmltcG9ydCBFbWFpbEZvcm0gZnJvbSBcIi4vY29tcG9uZW50cy9FbWFpbEZvcm0uanN4XCI7XG5pbXBvcnQgRW1haWxQcmV2aWV3IGZyb20gXCIuL2NvbXBvbmVudHMvRW1haWxQcmV2aWV3LmpzeFwiO1xuaW1wb3J0IERyYWZ0TW9kYWwgZnJvbSBcIi4vY29tcG9uZW50cy9EcmFmdE1vZGFsLmpzeFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVFbWFpbERyYWZ0IH0gZnJvbSBcIi4vc2VydmljZXMvYXBpLmpzXCI7XG5cbmNvbnN0IGRlZmF1bHRVc2VyID0ge1xuICBuYW1lOiBcIkFiaGlqaXQgQmh1bmlhXCIsXG4gIGVtYWlsOiBcImFiaGlqaXRAZXhhbXBsZS5jb21cIixcbiAgcm9sZTogXCJUcmFpbmVlXCIsXG4gIGNvbXBhbnk6IFwiVGVjaFZhbGxleSBJbmRpYSBQdnQuIEx0ZC5cIlxufTtcblxuY29uc3QgZGVmYXVsdEZvcm0gPSB7XG4gIHJlY2lwaWVudDogXCJTYW5kaXAgR2hvc2ggU2lyXCIsXG4gIGVtYWlsVHlwZTogXCJXb3JrIFVwZGF0ZVwiLFxuICB0b25lOiBcIlByb2Zlc3Npb25hbFwiLFxuICBwdXJwb3NlOiBcIlwiLFxuICBkZXRhaWxzOiBcIlwiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVtYWlsX3VzZXJcIik7XG4gICAgICByZXR1cm4gc2F2ZWQgPyBKU09OLnBhcnNlKHNhdmVkKSA6IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHVzZXIgZnJvbSBsb2NhbFN0b3JhZ2VcIiwgZXJyKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgW2Zvcm0sIHNldEZvcm1dID0gdXNlU3RhdGUoZGVmYXVsdEZvcm0pO1xuICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gdXNlU3RhdGUoeyBzdWJqZWN0OiBcIlwiLCBlbWFpbDogXCJcIiB9KTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdG9hc3QsIHNldFRvYXN0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd1Byb2ZpbGUsIHNldFNob3dQcm9maWxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dEcmFmdCwgc2V0U2hvd0RyYWZ0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2hpdENvdW50LCBzZXRIaXRDb3VudF0gPSB1c2VTdGF0ZSgoKSA9PiBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJvcGVuYWlfaGl0X2NvdW50XCIpIHx8IFwiMFwiKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodXNlcikgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbWFpbF91c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgfSwgW3VzZXJdKTtcblxuICBmdW5jdGlvbiBzaG93VG9hc3QodGV4dCkge1xuICAgIHNldFRvYXN0KHRleHQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0VG9hc3QoXCJcIiksIDE4MDApO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlR2VuZXJhdGUoKSB7XG4gICAgaWYgKCFmb3JtLnB1cnBvc2UudHJpbSgpIHx8ICFmb3JtLmRldGFpbHMudHJpbSgpKSB7XG4gICAgICBzaG93VG9hc3QoXCJQbGVhc2UgYWRkIHB1cnBvc2UgYW5kIGRldGFpbHNcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICBzZXRSZXN1bHQoeyBzdWJqZWN0OiBcIlwiLCBlbWFpbDogXCJcIiB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2VuZXJhdGVFbWFpbERyYWZ0KHtcbiAgICAgICAgLi4uZm9ybSxcbiAgICAgICAgc2VuZGVyTmFtZTogdXNlci5uYW1lLFxuICAgICAgICBzZW5kZXJSb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIGNvbXBhbnlOYW1lOiB1c2VyLmNvbXBhbnlcbiAgICAgIH0pO1xuXG4gICAgICBzZXRSZXN1bHQoZGF0YSk7XG5cbiAgICAgIGNvbnN0IG5leHRDb3VudCA9IGhpdENvdW50ICsgMTtcbiAgICAgIHNldEhpdENvdW50KG5leHRDb3VudCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm9wZW5haV9oaXRfY291bnRcIiwgU3RyaW5nKG5leHRDb3VudCkpO1xuXG4gICAgICBzaG93VG9hc3QoXCJFbWFpbCBnZW5lcmF0ZWRcIik7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzaG93VG9hc3QoXCJCYWNrZW5kIGVycm9yLiBQbGVhc2UgY2hlY2sgc2VydmVyLlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29weSgpIHtcbiAgICBpZiAoIXJlc3VsdC5lbWFpbCkgcmV0dXJuO1xuICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGBTdWJqZWN0OiAke3Jlc3VsdC5zdWJqZWN0fVxcblxcbiR7cmVzdWx0LmVtYWlsfWApO1xuICAgIHNob3dUb2FzdChcIkNvcGllZCEhXCIpO1xuICB9XG5cbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIDxBdXRoUGFnZSBvbkxvZ2luPXtzZXRVc2VyfSAvPjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xvdyBnbG93T25lXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsb3cgZ2xvd1R3b1wiPjwvZGl2PlxuXG4gICAgICA8SGVhZGVyIHVzZXI9e3VzZXJ9IG9uTG9nb3V0PXsoKSA9PiBzZXRVc2VyKG51bGwpfSBvcGVuUHJvZmlsZT17KCkgPT4gc2V0U2hvd1Byb2ZpbGUodHJ1ZSl9IC8+XG5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cIm1haW5MYXlvdXRcIj5cbiAgICAgICAgPEVtYWlsRm9ybSBmb3JtPXtmb3JtfSBzZXRGb3JtPXtzZXRGb3JtfSBvbkdlbmVyYXRlPXtoYW5kbGVHZW5lcmF0ZX0gbG9hZGluZz17bG9hZGluZ30gLz5cbiAgICAgICAgPEVtYWlsUHJldmlld1xuICAgICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgb25Db3B5PXtoYW5kbGVDb3B5fVxuICAgICAgICAgIG9uT3BlbkRyYWZ0PXsoKSA9PiBzZXRTaG93RHJhZnQodHJ1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L21haW4+XG5cbiAgICAgIHtzaG93UHJvZmlsZSAmJiAoXG4gICAgICAgIDxQcm9maWxlTW9kYWxcbiAgICAgICAgICB1c2VyPXt1c2VyfVxuICAgICAgICAgIHNldFVzZXI9e3NldFVzZXJ9XG4gICAgICAgICAgaGl0Q291bnQ9e2hpdENvdW50fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dQcm9maWxlKGZhbHNlKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHtzaG93RHJhZnQgJiYgPERyYWZ0TW9kYWwgcmVzdWx0PXtyZXN1bHR9IG9uQ2xvc2U9eygpID0+IHNldFNob3dEcmFmdChmYWxzZSl9IC8+fVxuXG4gICAgICB7dG9hc3QgJiYgPGRpdiBjbGFzc05hbWU9XCJ0b2FzdFwiPnt0b2FzdH08L2Rpdj59XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsV0FBVyxnQkFBZ0I7QUFDcEMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywwQkFBMEI7QUFFbkMsTUFBTSxjQUFjO0FBQUEsRUFDbEIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUNYO0FBRUEsTUFBTSxjQUFjO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsU0FBUztBQUNYO0FBRUEsd0JBQXdCLE1BQU07QUFDNUIsUUFBTSxDQUFDLE1BQU0sT0FBTyxJQUFJLFNBQVMsTUFBTTtBQUNyQyxRQUFJO0FBQ0YsWUFBTSxRQUFRLGFBQWEsUUFBUSxZQUFZO0FBQy9DLGFBQU8sUUFBUSxLQUFLLE1BQU0sS0FBSyxJQUFJO0FBQUEsSUFDckMsU0FBUyxLQUFLO0FBQ1osY0FBUSxNQUFNLDBDQUEwQyxHQUFHO0FBQzNELGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxDQUFDLE1BQU0sT0FBTyxJQUFJLFNBQVMsV0FBVztBQUM1QyxRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBUyxFQUFFLFNBQVMsSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUMvRCxRQUFNLENBQUMsU0FBUyxVQUFVLElBQUksU0FBUyxLQUFLO0FBQzVDLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFB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