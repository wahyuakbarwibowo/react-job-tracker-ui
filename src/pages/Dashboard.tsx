import { useEffect, useState } from "react";
import api from "../services/api";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import type { Job } from "../types/job";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await api.get<Job[]>("/jobs");
      setJobs(res.data);
    } catch (err) {
      // token invalid / expired
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Tracker</h1>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Create Job */}
      <JobForm onSuccess={fetchJobs} />

      {/* Job List */}
      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No job applications yet.</p>
      ) : (
        <JobList jobs={jobs} onChange={fetchJobs} />
      )}
    </div>
  );
}
