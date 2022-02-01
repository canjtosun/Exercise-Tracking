const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ExercisesSchema = new Schema( {
    day: {type: Number},
    typesOfExercises: [
        {name: String, sets:Number, reps:Number}
    ]
})

var Exercises = mongoose.model("Exercises", ExercisesSchema );
module.exports = Exercises