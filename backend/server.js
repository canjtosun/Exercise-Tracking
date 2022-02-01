const express = require("express");
const cors = require("cors");
const EXERCISES = require("./model");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();


app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = 4200;
const mongoDB = "mongodb://localhost/exercises";
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () =>  console.log("Connection successful"));

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));

//get all
router.get("/exercises", async (req, res) => {
  try {
    const exercises = await EXERCISES.find().sort({ day: 1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/exercises", async (req, res) => {
  db.collection("exercises").findOneAndUpdate(
    { day: req.body.day },
    { $push: { typesOfExercises: req.body["info"] } }
  ).then(res.send('success'));
});

router.post("/exercises/delete", async(req, res) => {
    db.collection("exercises").findOneAndUpdate(
        {day: req.body.day},
        {$pull: {typesOfExercises: {name: req.body.name}}}
    ).then(res.send('success'));
});
