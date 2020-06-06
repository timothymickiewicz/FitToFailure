const express = require('express');
const Workout = require("../models/workout.js");
const router = express.Router();

// if (workoutType === "cardio") {
//   workoutData.type = "cardio";
//   workoutData.name = cardioNameInput.value.trim();
//   workoutData.distance = Number(distanceInput.value.trim());
//   workoutData.duration = Number(durationInput.value.trim());
// }
// else if (workoutType === "resistance") {
//   workoutData.type = "resistance";
//   workoutData.name = nameInput.value.trim();
//   workoutData.weight = Number(weightInput.value.trim());
//   workoutData.sets = Number(setsInput.value.trim());
//   workoutData.reps = Number(repsInput.value.trim());
//   workoutData.duration = Number(resistanceDurationInput.value.trim());
// }

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
  console.log(req.body);
  console.log(req.params.id);
    Workout.updateOne(
      query, 
      {
        $set: {
          day: new Date().setDate(new Date().getDate()),
        },
        $push: {
          exercises: [ { type: req.body.type, name: req.body.name, weight: req.body.weight, sets: req.body.sets, reps: req.body.reps, duration: req.body.duration } ]
      }})
      .then(dbFitness => {
        res.json(dbFitness);
        console.log("success: " + dbFitness);
      })
      .catch(err => {
        res.status(400).json(err);
        console.log(err);
      });
});

// Returns all workouts in range
router.get("/api/workouts/range", (req, res) => {
Workout.find({})
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      console.log(err);
    });
});

// Gets the last workout
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbFitness => {
    res.json(dbFitness);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;