import { useState } from "react";
import api from "../services/api";

interface Props {
  onSuccess: () => void;
}

export default function JobForm({ onSuccess }: Props) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await api.post("/jobs", {
      company_name: company,
      position,
      status,
    });

    setCompany("");
    setPosition("");
    setStatus("Applied");
    setLoading(false);
    onSuccess();
  };

  return (
    <form
      onSubmit={submit}
      className="mb-6 rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Frontend Engineer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Job"}
        </button>
      </div>
    </form>
  );
}
