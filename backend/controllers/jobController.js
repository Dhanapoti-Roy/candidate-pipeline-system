const Job = require('../models/Job');
const Application = require('../models/Application');
const Candidate = require('../models/Candidate');

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
      const activeCandidateCount = await Candidate.countDocuments({
        roleAppliedFor: job._id,
        currentStage: { $ne: 'Rejected' }
      });
      return {
        ...job.toObject(),
        activeCandidateCount: activeCandidateCount
      };
    }));

    res.json(jobsWithCounts);
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const { title, department } = req.body;
    const job = await Job.create({ title, department });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob
};
