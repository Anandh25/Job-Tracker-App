import JobForm from "../components/JobForm";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../api/jobApi";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getJobs(token);

        setJobs(data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    setVisibleCount(5);
  }, [filter, search]);

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === "All" || job.status === filter;

    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // 👉 ADD THIS SORT
  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
  );

  const handleDelete = async (idToDelete) => {
    try {
      const token = localStorage.getItem("token");

      await deleteJob(idToDelete, token);

      setJobs((prev) => prev.filter((job) => job._id !== idToDelete));
      setToast("Job deleted successfully 🗑️");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    if (toast) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false); // fade out
      }, 1500);

      const removeTimer = setTimeout(() => {
        setToast(""); // remove completely
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        {toast && (
          <div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow transition-all duration-500 ${
              showToast
                ? "opacity-100 translate-y-0 bg-black text-white"
                : "opacity-0 translate-y-5 bg-black text-white"
            }`}
          >
            {toast}
          </div>
        )}
        {deleteJobId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
              <h2 className="text-lg font-semibold mb-2">Delete Job</h2>

              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this job?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteJobId(null)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await handleDelete(deleteJobId);
                    setDeleteJobId(null);
                  }}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Job Tracker</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <JobForm
          setJobs={setJobs}
          setToast={setToast}
          editingJob={editingJob}
          setEditingJob={setEditingJob}
        />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 text-center">
          <div className="bg-white p-3 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold">{jobs.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-2xl">
            <p className="text-sm">Applied</p>
            <p className="font-bold">
              {jobs.filter((job) => job.status === "Applied").length}
            </p>
          </div>

          <div className="bg-yellow-100 p-3 rounded-2xl">
            <p className="text-sm">Interview</p>
            <p className="font-bold">
              {jobs.filter((job) => job.status === "Interview").length}
            </p>
          </div>

          <div className="bg-green-100 p-3 rounded-2xl">
            <p className="text-sm">Offer</p>
            <p className="font-bold">
              {jobs.filter((job) => job.status === "Offer").length}
            </p>
          </div>

          <div className="bg-red-100 p-3 rounded-2xl">
            <p className="text-sm">Rejected</p>
            <p className="font-bold">
              {jobs.filter((job) => job.status === "Rejected").length}
            </p>
          </div>
        </div>

        <FilterBar filter={filter} setFilter={setFilter} />

        {sortedJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid gap-4 mt-6">
              {sortedJobs.slice(0, visibleCount).map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDelete={() => setDeleteJobId(job._id)}
                  onEdit={() => setEditingJob(job)}
                />
              ))}
            </div>

            {visibleCount < sortedJobs.length && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="mt-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-300 hover:cursor-pointer"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
