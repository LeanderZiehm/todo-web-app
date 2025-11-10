import { useEffect, useState } from "react";
import axios from "axios";

interface MoneyEntry {
  id?: number;
  account_type: string;
  amount: number;
  notes?: string;
  created_at?: string;
}

export default function MoneyView() {
  const [entries, setEntries] = useState<MoneyEntry[]>([]);
  const [form, setForm] = useState<MoneyEntry>({
    account_type: "bar",
    amount: 0,
  });

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async function fetchEntries() {
    const res = await axios.get(`${API}/money`);
    setEntries(res.data);
  }

  useEffect(() => { fetchEntries(); }, []);

  async function addEntry() {
    await axios.post(`${API}/money`, form);
    setForm({ account_type: "bar", amount: 0 });
    fetchEntries();
  }

  return (
    <>
      <h2>Money Tracker</h2>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select
          value={form.account_type}
          onChange={(e) => setForm({ ...form, account_type: e.target.value })}
        >
          <option value="bar">Bar</option>
          <option value="company_card">Company Card</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: parseFloat(e.target.value) })
          }
        />
        <button onClick={addEntry}>Add</button>
      </div>

      <table width="100%">
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.account_type}</td>
              <td>{e.amount}</td>
              <td>{new Date(e.created_at ?? "").toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
