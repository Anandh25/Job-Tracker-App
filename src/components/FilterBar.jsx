import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 mt-4 flex-wrap place-content-center">
      <button
        className={`px-3 py-1 rounded hover:cursor-pointer  ${
          filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("All")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded hover:cursor-pointer  ${
          filter === "Applied" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("Applied")}
      >
        Applied
      </button>
      <button
        className={`px-3 py-1 rounded  hover:cursor-pointer ${
          filter === "Interview" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("Interview")}
      >
        Interview
      </button>
      <button
        className={`px-3 py-1 rounded hover:cursor-pointer  ${
          filter === "Offer" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("Offer")}
      >
        Offer
      </button>
      <button
        className={`px-3 py-1 rounded hover:cursor-pointer ${
          filter === "Rejected" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("Rejected")}
      >
        Rejected
      </button>
    </div>
  );
};

export default FilterBar;
