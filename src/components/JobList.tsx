import api from "../services/api";
import type { Job } from "../types/job";

interface Props {
  jobs: Job[];
  onChange: () => void;
}

export default function JobList({ jobs, onChange }: Props) {
  const updateStatus = async (id: number, status: string) => {
    await api.put(`/jobs/${id}`, { status });
    onChange();
  };

  const remove = async (id: number) => {
    await api.delete(`/jobs/${id}`);
    onChange();
  };

  return (
    <ul className="space-y-2">
      {jobs.map((job) => (
        <li key={job.ID} className="border p-3 flex justify-between">
          <div>
            <p className="font-bold">{job.company_name}</p>
            <p>{job.position}</p>
            <select
              className="border mt-2"
              value={job.status}
              onChange={(e) => updateStatus(job.ID, e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>
          <button className="text-red-500" onClick={() => remove(job.ID)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
