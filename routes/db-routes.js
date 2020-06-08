const express = require('express');
const Workout = require("../models/workout.js");
const router = express.Router();
let moment = require("moment");

// Adds a new workout
// Runs immediately on page load
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then(dbFitness => {
      console.log("running api workouts call");
      res.json(dbFitness);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Updates an exercise
router.put('/api/workouts/:id', (req, res) => {
  console.log("running api/workouts/id call");
  var query  = Workout.where({ _id: req.params.id });
  console.log(req.body.duration);
  console.log(req.params.id);
    Workout.updateOne(
      query, 
      {
        $set: {
          day: new Date().setDate(new Date().getDate()),
        },
        $push: {
          exercises: { type: req.body.type, name: req.body.name, duration: req.body.duration, weight: req.body.weight, sets: req.body.sets, reps: req.body.reps, distance: req.body.distance }
      }})
      .then(dbFitness => {
        res.json(dbFitness);
      })
      .catch(err => {
        res.status(400).json(err);
        console.log(err);
      });
});

// Returns all workouts in range
router.get("/api/workouts/range", (req, res) => {
var startOfWeek = moment().startOf('week').toDate();
var endOfWeek   = moment().endOf('week').toDate();
Workout.find({ 
  day: {
        $gte: startOfWeek,
        $lt: endOfWeek
         }
  }).then(dbFitness => {
    console.log(dbFitness);
    res.json(dbFitness);
  }).catch(err => {
    console.log(err);
  });
});

// Gets the last workout
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;