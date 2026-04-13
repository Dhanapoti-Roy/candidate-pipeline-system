const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getStageHistories,
  createStageHistory,
  getStageHistoryById,
  updateStageHistory,
  deleteStageHistory
} = require('../controllers/stageHistoryController');

const router = express.Router();

router.route('/')
  .get(getStageHistories)
  .post(protect, createStageHistory);

router.route('/:id')
  .get(getStageHistoryById)
  .put(protect, updateStageHistory)
  .delete(protect, deleteStageHistory);

module.exports = router;
