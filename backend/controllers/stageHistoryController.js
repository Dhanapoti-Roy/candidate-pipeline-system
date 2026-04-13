const StageHistory = require('../models/StageHistory');

// Get all stage history entries
const getStageHistories = async (req, res, next) => {
  try {
    const histories = await StageHistory.find().populate('application');
    res.json(histories);
  } catch (error) {
    next(error);
  }
};

// Create a new stage history entry
const createStageHistory = async (req, res, next) => {
  try {
    const { application, stage, timestamp } = req.body;
    const history = await StageHistory.create({ application, stage, timestamp });
    res.status(201).json(history);
  } catch (error) {
    next(error);
  }
};

// Get a single stage history entry by ID
const getStageHistoryById = async (req, res, next) => {
  try {
    const history = await StageHistory.findById(req.params.id).populate('application');
    if (!history) {
      res.status(404);
      throw new Error('Stage history entry not found');
    }
    res.json(history);
  } catch (error) {
    next(error);
  }
};

// Update a stage history entry
const updateStageHistory = async (req, res, next) => {
  try {
    const history = await StageHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!history) {
      res.status(404);
      throw new Error('Stage history entry not found');
    }
    res.json(history);
  } catch (error) {
    next(error);
  }
};

// Delete a stage history entry
const deleteStageHistory = async (req, res, next) => {
  try {
    const history = await StageHistory.findByIdAndDelete(req.params.id);
    if (!history) {
      res.status(404);
      throw new Error('Stage history entry not found');
    }
    res.json({ message: 'Stage history entry deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStageHistories,
  createStageHistory,
  getStageHistoryById,
  updateStageHistory,
  deleteStageHistory
};
