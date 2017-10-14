const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Progress = new Schema({
  mainGoalId: String,
  progressTitle: String,
  progressBody: String,
  dateCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', Progress);
