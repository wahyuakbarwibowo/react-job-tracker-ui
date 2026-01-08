import { useState } from "react";
import api from "../services/api";

interface Props {
  onSuccess: () => void;
}

export default function JobForm({ onSuccess }: Props) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/jobs", {
      company_name: company,
      position,
      status,
    });
    setCompany("");
    setPosition("");
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-2 mb-6">
      <input className="border p-2 w-full" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
      <select className="border p-2 w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Accepted</option>
        <option>Rejected</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2">Add Job</button>
    </form>
  );
}
