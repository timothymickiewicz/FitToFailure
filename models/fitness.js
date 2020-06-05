const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for user"
  },
  value: {
    type: Number,
    required: "Enter a time"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;