import React from "react";

const JobCard = ({ job, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-green-100 text-green-600";
      case "Interview":
        return "bg-yellow-100 text-yellow-600";
      case "Offer":
        return "bg-blue-100 text-blue-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition hover:cursor-pointer">
      <div>
        <h3 className="font-semibold">{job.company}</h3>
        <p className="text-sm text-gray-500">{job.role}</p>
        <p className="text-xs text-gray-400">
          Applied on: {job.appliedDate || "N/A"}
        </p>
      </div>
      <div>
        <span
          className={`text-sm px-2 py-1 rounded  hover:cursor-pointer ${getStatusColor(job.status)}`}
        >
          {job.status}
        </span>

        <button
          onClick={onDelete}
          className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded hover:cursor-pointer ml-3"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
