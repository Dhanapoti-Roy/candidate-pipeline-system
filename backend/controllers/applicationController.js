const Application = require('../models/Application');
const Candidate = require('../models/Candidate');
const StageHistory = require('../models/StageHistory');

// Allowed Stage Transitions Map
const allowedTransitions = {
  'Applied': ['Shortlisted', 'Rejected'],
  'Shortlisted': ['Interviewing', 'Rejected'],
  'Interviewing': ['In Assessment', 'Accepted', 'Rejected'],
  'In Assessment': ['Accepted', 'Rejected'],
  'Accepted': [],
  'Rejected': [] // Cannot move out of rejected
};

const getApplicationsByJob = async (req, res, next) => {
  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('candidate');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('candidate')
      .populate('job');
    
    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    const history = await StageHistory.find({ application: application._id }).sort({ timestamp: 1 });

    res.json({
      ...application.toObject(),
      history
    });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStage = async (req, res, next) => {
  try {
    const { newStage } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    const currentStage = application.currentStage;
    const validNextStages = allowedTransitions[currentStage] || [];

    if (!validNextStages.includes(newStage)) {
      res.status(400);
      throw new Error(`Invalid stage transition. Cannot move from ${currentStage} to ${newStage}. Allowed: ${validNextStages.join(', ')}`);
    }

    application.currentStage = newStage;
    await application.save();

    await StageHistory.create({
      application: application._id,
      stage: newStage
    });

    res.json(application);
  } catch (error) {
    next(error);
  }
};

const getRejectedApplications = async (req, res, next) => {
  try {
    const rejectedApps = await Application.find({ currentStage: 'Rejected' })
      .populate('candidate', 'name email')
      .populate('job', 'title department');

    const result = await Promise.all(rejectedApps.map(async (app) => {
      const history = await StageHistory.find({ application: app._id }).sort({ timestamp: 1 });
      const historyLength = history.length;
      
      const rejectionEntry = history[historyLength - 1];
      const previousEntry = historyLength > 1 ? history[historyLength - 2] : null;

      return {
        _id: app._id,
        candidate: app.candidate,
        job: app.job,
        rejectedAtStage: previousEntry ? previousEntry.stage : 'Applied',
        rejectionTimestamp: rejectionEntry ? rejectionEntry.timestamp : app.updatedAt
      };
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find().populate('candidate job');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const { candidate, job, currentStage } = req.body;
    const application = await Application.create({ candidate, job, currentStage });
    await StageHistory.create({ application: application._id, stage: currentStage || 'Applied' });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }
    await StageHistory.deleteMany({ application: req.params.id });
    res.json({ message: 'Application and stage history deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplicationsByJob,
  getApplicationById,
  updateApplicationStage,
  getRejectedApplications,
  getApplications,
  createApplication,
  deleteApplication
};
