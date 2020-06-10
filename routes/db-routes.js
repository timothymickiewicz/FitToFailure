const express = require('express')
const Workout = require('../models/workout.js')
const router = express.Router()
const moment = require('moment')

// Adds a new workout
// Runs immediately on page load to set an empty id in the database
router.post('/api/workouts', function ({ body }, res) {
  Workout.create(body)
    .then(dbFitness => {
      res.json(dbFitness)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

// Updates an exercise
router.put('/api/workouts/:id', function (req, res) {
  var query = Workout.where({ _id: req.params.id })
  Workout.updateOne(
    query,
    {
      $set: {
        day: new Date().setDate(new Date().getDate())
      },
      $push: {
        exercises: { type: req.body.type, name: req.body.name, duration: req.body.duration, weight: req.body.weight, sets: req.body.sets, reps: req.body.reps, distance: req.body.distance }
      }
    })
    .then(dbFitness => {
      res.json(dbFitness)
    })
    .catch(err => {
      res.status(400).json(err)
      console.log(err)
    })
})

// Returns all workouts in the current week's range
router.get('/api/workouts/range', function (req, res) {
// Gets all workouts from the beginning to the end of the week
  var startOfWeek = moment().startOf('week').toDate()
  var endOfWeek = moment().endOf('week').toDate()
  Workout.find({
    day: {
      $gte: startOfWeek,
      $lt: endOfWeek
    }
  }).then(dbFitness => {
    res.json(dbFitness)
  }).catch(err => {
    console.log(err)
  })
})

// Gets the last workout
router.get('/api/workouts', function (req, res) {
  Workout.find({})
    .then(dbFitness => {
      res.json(dbFitness)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

module.exports = router
