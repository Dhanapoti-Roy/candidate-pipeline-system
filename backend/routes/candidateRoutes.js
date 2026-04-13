const express = require('express');
const { 
  updateCandidateStage, 
  getCandidateById, 
  getRejectedCandidates,
  createCandidate
} = require('../controllers/candidateController');

const router = express.Router();

router.post('/', createCandidate);
router.get('/rejected', getRejectedCandidates);
router.patch('/:candidateId/stage', updateCandidateStage);
router.get('/:id', getCandidateById);

module.exports = router;
