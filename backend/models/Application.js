const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  currentStage: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interviewing', 'In Assessment', 'Accepted', 'Rejected'],
    default: 'Applied'
  }
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;