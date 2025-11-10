import { useEffect, useState } from "react";
import axios from "axios";

interface Medication {
  id?: number;
  name: string;
  dose_unit?: string;
  schedule_interval_days?: number | null;
  notes?: string;
}

interface Dose {
  medication_id: number;
  count: number;
  timestamp?: string;
}

export default function MedsView() {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [newMed, setNewMed] = useState<Medication>({
    name: "",
    dose_unit: "pills",
    schedule_interval_days: 1,
  });

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async function fetchMeds() {
    const res = await axios.get(`${API}/meds`);
    setMeds(res.data);
  }

  useEffect(() => { fetchMeds(); }, []);

  async function addMed() {
    if (!newMed.name.trim()) return;
    await axios.post(`${API}/meds`, newMed);
    setNewMed({ name: "", dose_unit: "pills", schedule_interval_days: 1 });
    fetchMeds();
  }

  async function recordDose(id: number) {
    await axios.post(`${API}/meds/${id}/dose`, { count: 1 });
    fetchMeds();
  }

  return (
    <>
      <h2>Medication Tracker</h2>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          placeholder="Medication name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
        />
        <input
          placeholder="Unit (e.g. pills)"
          value={newMed.dose_unit}
          onChange={(e) => setNewMed({ ...newMed, dose_unit: e.target.value })}
        />
        <input
          type="number"
          min="1"
          value={newMed.schedule_interval_days ?? 1}
          onChange={(e) =>
            setNewMed({
              ...newMed,
              schedule_interval_days: parseInt(e.target.value),
            })
          }
        />
        <button onClick={addMed}>Add</button>
      </div>

      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Interval (days)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meds.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.dose_unit}</td>
              <td>{m.schedule_interval_days}</td>
              <td>
                <button onClick={() => recordDose(m.id!)}>Took dose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
