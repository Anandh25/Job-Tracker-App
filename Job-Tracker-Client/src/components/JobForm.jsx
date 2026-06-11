import { useState, useEffect } from "react";
import { createJob, updateJob } from "../api/jobApi";

const JobForm = ({ setJobs, setToast, editingJob, setEditingJob }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!company.trim() || !role.trim()) return;

    setLoading(true);

    try {
      if (editingJob) {
        const token = localStorage.getItem("token");

        const response = await updateJob(
          editingJob._id,
          {
            company,
            role,
            status,
            jobUrl,
            location,
            notes,
          },
          token,
        );

        setJobs((prev) =>
          prev.map((job) => (job._id === editingJob._id ? response.job : job)),
        );

        setToast("Job updated successfully ✏️");
        setEditingJob(null);
      } else {
        const token = localStorage.getItem("token");

        const response = await createJob(
          {
            company,
            role,
            status,
            jobUrl,
            location,
            notes,
            appliedDate: new Date(),
          },
          token,
        );

        setJobs((prev) => [response.job, ...prev]);

        setToast("Job added successfully ✅");
      }

      setCompany("");
      setRole("");
      setStatus("Applied");
      setJobUrl("");
      setLocation("");
      setNotes("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.company);
      setRole(editingJob.role);
      setStatus(editingJob.status);
      setJobUrl(editingJob.jobUrl || "");
      setLocation(editingJob.location || "");
      setNotes(editingJob.notes || "");
    }
  }, [editingJob]);
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-4">
      <h2 className="text-lg font-semibold mb-3">
        {editingJob ? "Edit Job" : "Add Job"}
      </h2>

      <div className="grid gap-3 ">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="url"
          placeholder="Job URL (LinkedIn, Naukri, Company Site)"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Location (Banglore, Chennai, Remote)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Notes (HR discussion, Interview updates, Follow-up reminders)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full hover:cursor-pointer"
        >
          {loading
            ? editingJob
              ? "Updating..."
              : "Adding..."
            : editingJob
              ? "Update Job"
              : "Add Job"}
        </button>

        {editingJob && (
          <button
            onClick={() => {
              setEditingJob(null);
              setCompany("");
              setRole("");
              setStatus("Applied");
              setJobUrl("");
              setLocation("");
              setNotes("");
            }}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded w-full cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default JobForm;
