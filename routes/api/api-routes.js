const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

module.exports = function(app) {

app.get('/api/getUser', function(request, response) {
  User.findOne({username: request.session.passport.user})
  .then(data => response.json(data))
  .catch(error => console.error(error));
});

app.get('/api/checkLogin', function(request, response) {
  if (request.session.passport.user) {
    response.json({ story: true });
  } else {
    response.status(404).end();
  }
});

app.get('/api/logout', function(request, response){
  console.log('PASSPORT: ', request.session.passport);
  request.logout();
  console.log('PASSPORT: ', request.session.passport);
  response.redirect('/');
});

app.post('/api/login', function(request, response, next) {

  User.authenticate()(request.body.username, request.body.password,
    function(error, user, options) {
      if (error) return next(error);
      if (user === false) {
        response.status(404).send({
          message: options.message,
          success: false
        });
      } else {
        console.log(user);
        request.login(user, function(error) {
          response.json({
            success: true,
            user: user
          });
        });
      }
    });
});

app.post('/api/register', function(request, response) {

  console.log('registering: ', request.body.username);
  User.register(new User({
    username: request.body.username,
    firstName: request.body.firstName,
    lastName: request.body.lastName
  }), request.body.password, function(error, user) {
    if (error) {
      console.log(error);
      return response.send(error);
    } else {
      response.send({success: true, user: user});
    }
  });

});

};
