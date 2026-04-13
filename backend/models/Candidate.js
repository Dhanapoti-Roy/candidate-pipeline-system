const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String
  },
  roleAppliedFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentStage: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interviewing', 'In Assessment', 'Accepted', 'Rejected'],
    default: 'Applied'
  },
  history: [{
    stage: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
