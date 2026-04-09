import JobForm from "../components/JobForm";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs
      ? JSON.parse(savedJobs).map((job) => ({
          ...job,
          appliedDate: job.appliedDate || new Date().toLocaleDateString(),
        }))
      : [];
  });
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

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

  const handleDelete = (idToDelete) => {
    setJobs((prev) => prev.filter((job) => job.id !== idToDelete));
  };

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

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
        <h1 className="text-3xl font-bold mb-6 text-center">Job Tracker</h1>

        <JobForm setJobs={setJobs} setToast={setToast} />
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
                  key={job.id}
                  job={job}
                  onDelete={() => handleDelete(job.id)}
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
