import API from "./index";

export const getJobs = async (token) => {
  const response = await API.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createJob = async (jobData, token) => {
  const response = await API.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteJob = async (id, token) => {
  const response = await API.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateJob = async (id, jobData, token) => {
  const response = await API.put(`/jobs/${id}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getJobById = async (id, token) => {
  const response = await API.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
