const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const StageHistory = require('../models/StageHistory');
// Get all candidates for a specific job
const getCandidatesByJob = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ roleAppliedFor: req.params.jobId });
    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

const updateCandidateStage = async (req, res, next) => {
  try {
    const { stage } = req.body;
    const allowedStages = ['Applied', 'Shortlisted', 'Interviewing', 'In Assessment', 'Accepted', 'Rejected'];

    if (!allowedStages.includes(stage)) {
      res.status(400);
      throw new Error(`Invalid stage. Allowed stages are: ${allowedStages.join(', ')}`);
    }

    const candidate = await Candidate.findById(req.params.candidateId);

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }

    if (candidate.currentStage === 'Rejected') {
      res.status(400);
      throw new Error('Cannot move a rejected candidate back into the pipeline');
    }

    // Update stage and explicitly push to history
    candidate.currentStage = stage;
    candidate.history = candidate.history || [];
    candidate.history.push({ stage: stage, timestamp: new Date() });

    await candidate.save();

    // Also keep the related Application in sync if it exists
    try {
      const application = await Application.findOne({ candidate: candidate._id, job: candidate.roleAppliedFor });
      if (application) {
        application.currentStage = stage;
        await application.save();
      }
    } catch (err) {
      // non-fatal: log and continue
      console.error('Failed to sync application stage:', err);
    }

    res.json(candidate);
  } catch (error) {
    next(error);
  }
};

const getCandidateById = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate('roleAppliedFor');

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }
    console.log(candidate._id, candidate.roleAppliedFor._id);
    const application = await Application.findOne({
      candidate: candidate._id, job: candidate.roleAppliedFor._id
    }).limit(1).exec();

    if (application) {
      const histories = await StageHistory.where({
        application: application._id
      });

      res.json({
        ...candidate.toObject(),
        history: histories.map(h => ({ stage: h.stage, timestamp: h.updatedAt })),
        application: application
      });
      return;
    }
    else {
      res.json({
        ...candidate.toObject(),
        history: [],
        application: null
      });
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getRejectedCandidates = async (req, res, next) => {
  try {
    const rejectedCandidates = await Candidate.find({ currentStage: 'Rejected' })
      .populate('roleAppliedFor', 'title department');

      console.log('Rejected Candidates:', +rejectedCandidates);

    const result = await Promise.all(rejectedCandidates.map(async (candidate) => {
      // History is chronological. Last entry is 'Rejected'. Second to last is the stage they were rejected at.
      const history = await StageHistory.find({ candidate: candidate._id }).sort({ updatedAt: 1 });
      const historyLength = history.length;
      const rejectionEntry = history[historyLength - 1];
      const previousEntry = historyLength > 1 ? history[historyLength - 2] : null;

      return {
        _id: candidate._id,
        name: candidate.name,
        job: candidate.roleAppliedFor,
        rejectedAtStage: previousEntry ? previousEntry.stage : 'Applied',
        rejectionTimestamp: rejectionEntry ? rejectionEntry.timestamp : candidate.updatedAt
      };
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

const createCandidate = async (req, res, next) => {
  try {
    const { name, email, photoUrl, roleAppliedFor } = req.body;

    if (!name || !email || !roleAppliedFor) {
      res.status(400);
      throw new Error('Please provide name, email, and roleAppliedFor');
    }

    const candidate = await Candidate.create({
      name,
      email,
      photoUrl,
      roleAppliedFor,
      currentStage: 'Applied',
      history: [{ stage: 'Applied', timestamp: new Date() }]
    });

    // Create associated Application record automatically
    try {
      await Application.create({
        candidate: candidate._id,
        job: roleAppliedFor,
        currentStage: 'Applied'
      });
    } catch (err) {
      // non-fatal: log and continue
      console.error('Failed to create application for candidate:', err);
    }

    res.status(201).json(candidate);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCandidatesByJob,
  updateCandidateStage,
  getCandidateById,
  getRejectedCandidates,
  createCandidate,
  getCandidates,
};
