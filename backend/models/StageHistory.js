const mongoose = require('mongoose');

const stageHistorySchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  stage: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const StageHistory = mongoose.model('StageHistory', stageHistorySchema);
module.exports = StageHistory;
