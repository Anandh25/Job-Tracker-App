const Job = require("../models/jobModel");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { company, role, status, jobUrl, location, notes, appliedDate } =
      req.body;

    const job = await Job.create({
      company,
      role,
      status,
      jobUrl,
      location,
      notes,
      appliedDate,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      job,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to access this job",
      });
    }

    res.status(200).json({
      status: "success",
      job,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete Job
exports.deleteJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this job",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
