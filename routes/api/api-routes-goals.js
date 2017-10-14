const mongoose = require('mongoose');
const Goals = require('../../models/goals.js');
const Progress = require('../../models/progress.js');

module.exports = function(app) {

app.post('/api/newGoal', function(request, response) {
  new Goals({
    userID: request.body.userID,
    goalTitle: request.body.goalTitle,
    goalBody: request.body.goalBody,
    progress: +request.body.progress
  }).save()
  .then(data => response.json(data))
  .catch(error => console.error(error));
});

app.post('/api/getUserGoals', function(request, response) {
  Goals.find({ userID: request.body.id })
  .then(data => {
    response.send({ tasks: data});
  })
  .catch(error => console.error(error));
});

app.post('/api/updateGoal', function(request, response) {

  Goals.update(
    { _id: request.body.goalID },
    { $set:
      {
        goalTitle: request.body.goalTitle,
        goalBody: request.body.goalBody,
        progress: request.body.progress }
      })
      .then(data => {
        response.send(true);
      })
      .catch(error => console.error(error));
});

app.post('/api/addProgress', function(request, response) {
  new Progress({
    mainGoalId: request.body.goalID,
    progressTitle: request.body.progressTitle,
    progressBody: request.body.progressBody
  }).save()
  .then(data => response.json(data))
  .catch(error => console.error(error));
});

app.post('/api/getProgs', function(request, response) {
  Progress.find({ mainGoalId: request.body.goalID })
  .then(data => {
    response.send({ progs: data});
  })
  .catch(error => console.error(error));
});


};
