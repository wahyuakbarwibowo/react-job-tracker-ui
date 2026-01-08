import api from "../services/api";
import type { Job } from "../types/job";

interface Props {
  jobs: Job[];
  onChange: () => void;
}

const statusStyle: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-700",
  Interview: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function JobList({ jobs, onChange }: Props) {
  const updateStatus = async (id: number, status: string) => {
    await api.put(`/jobs/${id}`, { status });
    onChange();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus job ini?")) return;
    await api.delete(`/jobs/${id}`);
    onChange();
  };

  return (
    <ul className="mt-6 space-y-4">
      {jobs.map((job) => (
        <li
          key={job.ID}
          className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">{job.company_name}</p>
              <p className="text-sm text-gray-600">{job.position}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={job.status}
                onChange={(e) => updateStatus(job.ID, e.target.value)}
                className={`rounded-lg border px-3 py-1 text-sm font-medium focus:outline-none ${statusStyle[job.status]
                  }`}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>

              <button
                onClick={() => remove(job.ID)}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
