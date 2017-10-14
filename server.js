const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')({
  secret: 'some random string',
  resave: false,
  saveUninitialized: false
});

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/todo', {useMongoClient: true });
const db = mongoose.connection;
//models
const User = require('./models/user');

app.use(express.static(path.join(__dirname, './public')));
//app.use(express.cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
require('./routes/api/api-routes.js')(app);
require('./routes/api/api-routes-goals.js')(app);

db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

app.listen(PORT, 'localhost', function() {
  console.log('App running on port 3000');
});
