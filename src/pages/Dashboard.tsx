import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import type { Job } from "../types/job";

export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get<Job[]>("/jobs");
      setJobs(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        logout();
      } else {
        setError("Gagal mengambil data job");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen w-full bg-gray-50 py-10 flex justify-center">
      {/* CENTER WRAPPER */}
      <div className="w-full max-w-5xl px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job Tracker</h1>
          <button
            onClick={logout}
            className="text-sm font-medium text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <JobForm onSuccess={fetchJobs} />

        {jobs.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            Belum ada lamaran kerja. Tambahkan yang pertama 🚀
          </div>
        ) : (
          <JobList jobs={jobs} onChange={fetchJobs} />
        )}
      </div>
    </div>
  );
}
