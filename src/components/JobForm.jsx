import { useState } from "react";

const JobForm = ({ setJobs, setToast }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!company || !role) return;

    setLoading(true);

    setTimeout(() => {
      const newJob = {
        id: Date.now(),
        company,
        role,
        status,
        appliedDate: new Date().toLocaleDateString(),
      };

      setJobs((prev) => [...prev, newJob]);

      setCompany("");
      setRole("");
      setStatus("Applied");

      setToast("Job added successfully ✅");

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-4">
      <h2 className="text-lg font-semibold mb-3">Add Job</h2>

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
          {loading ? "Adding..." : "Add Job"}
        </button>
      </div>
    </div>
  );
};

export default JobForm;
