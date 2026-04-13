const express = require('express');
const { getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { getCandidatesByJob } = require('../controllers/candidateController');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.get('/:jobId/candidates', getCandidatesByJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
