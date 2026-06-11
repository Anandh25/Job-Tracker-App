import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../api/jobApi";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await getJobById(id, token);

        setJob(response.job);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
              {job.company.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{job.company}</h1>
              <p className="text-gray-600">{job.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <p>
              <strong>Location:</strong> {job.location || "Not Provided"}
            </p>

            <p>
              <strong>Applied Date:</strong>{" "}
              {new Date(job.appliedDate).toLocaleDateString()}
            </p>

            <div>
              <strong>Notes:</strong>
              <p className="mt-2 text-gray-600">
                {job.notes || "No Notes Added"}
              </p>
            </div>

            {job.jobUrl && (
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:underline"
              >
                🔗 Open Job Posting
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
