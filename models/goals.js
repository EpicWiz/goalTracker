const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Goals = new Schema({
  userID: String,
  goalTitle: String,
  goalBody: String,
  dateCreate: { type: Date, default: Date.now },
  progress: Number
});

module.exports = mongoose.model('Goals', Goals);
