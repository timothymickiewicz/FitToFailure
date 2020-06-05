const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day:{
    type: Date,
  },
  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;

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