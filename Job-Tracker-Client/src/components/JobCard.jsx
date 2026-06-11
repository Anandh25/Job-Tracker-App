import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete, onEdit }) => {
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

  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-start hover:shadow-lg hover:-translate-y-1 transition-all hover:cursor-pointer duration-300">
      <div
        className="flex gap-4 items-start flex-1 cursor-pointer"
        onClick={() => navigate(`/job/${job._id}`)}
      >
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{job.company}</h3>
          <p className="text-sm text-gray-500">{job.role}</p>
          {job.location && (
            <p className="text-xs text-gray-500 mt-1">📍 {job.location}</p>
          )}
          {job.notes && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2 truncate">
              📝 {job.notes}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Applied on: {job.appliedDate || "N/A"}
          </p>
          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 font-medium hover:underline block mt-1"
            >
              🔗 Open Job
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(job.status)}`}
        >
          {job.status}
        </span>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="bg-blue-100
text-blue-600
p-2
rounded-xl
hover:bg-blue-200
hover:scale-110
transition
cursor-pointer"
            title="Edit Job"
          >
            <FaEdit />
          </button>

          <button
            onClick={onDelete}
            className="bg-red-100
text-red-600
p-2
rounded-xl
hover:bg-red-200
hover:scale-110
transition
cursor-pointer"
            title="Delete Job"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
