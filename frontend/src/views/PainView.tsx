import { useEffect, useState } from "react";
import axios from "axios";

interface PainEntry {
  id?: number;
  note: string;
  created_at?: string;
}

export default function PainView() {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [note, setNote] = useState("");
  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async function fetchEntries() {
    const res = await axios.get(`${API}/pain`);
    setEntries(res.data);
  }

  useEffect(() => { fetchEntries(); }, []);

  async function addEntry() {
    if (!note.trim()) return;
    await axios.post(`${API}/pain`, { note });
    setNote("");
    fetchEntries();
  }

  return (
    <>
      <h2>Pain Log</h2>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe your pain..."
          rows={2}
          style={{ flex: 1 }}
        />
        <button onClick={addEntry}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {entries.map((e) => (
          <li
            key={e.id}
            style={{
              border: "1px solid #ddd",
              padding: "0.5rem",
              borderRadius: "6px",
              marginBottom: "0.5rem",
              background: "#fafafa",
            }}
          >
            <div>{e.note}</div>
            <small>{new Date(e.created_at ?? "").toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
