const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getApplications,
  createApplication,
  getApplicationById,
  updateApplicationStage,
  deleteApplication,
  getRejectedApplications
} = require('../controllers/applicationController');

const router = express.Router();

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplicationById)
  .patch(protect, updateApplicationStage)
  .delete(protect, deleteApplication);

router.get('/rejected', getRejectedApplications);

module.exports = router;
