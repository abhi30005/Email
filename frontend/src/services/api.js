const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export async function generateEmailDraft(payload) {
  const res = await fetch(`${API_BASE}/email/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to generate email");
  }

  return res.json();
}

export async function getEmailHistory() {
  const res = await fetch(`${API_BASE}/email/history`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
}

export async function clearEmailHistory() {
  const res = await fetch(`${API_BASE}/email/history`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to clear history");
  }

  return res.json();
}
