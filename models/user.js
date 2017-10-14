const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
