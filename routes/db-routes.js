const express = require('express');
const Fitness = require("../models/fitness.js");
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
  Fitness.create(body)
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
  // var query  = Employee.where({ _id: req.params.employee_id });
  console.log(req.params.id);
    // Fitness.insertMany(body)
    //   .then(dbFitness => {
    //     console.log("running api/workouts/id call");
    //     res.json(dbFitness);
    //   })
    //   .catch(err => {
    //     res.status(400).json(err);
    //   });
});

// Returns all workouts in range
router.get("/api/workouts/range", ({ body }, res) => {
Fitness.insertMany(body)
    .then(dbFitness => {
    res.json(dbFitness);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

// Gets the last workout
router.get("/api/workouts", (req, res) => {
Fitness.find({})
    .sort({ date: -1 })
    .then(dbFitness => {
    res.json(dbFitness);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

module.exports = router;