const express = require("express");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = 4200;

var conn = mongoose.createConnection("mongodb://localhost/upperlowers");
var conn2 = mongoose.createConnection("mongodb://localhost/users");
var conn3 = mongoose.createConnection("mongodb://localhost/allexercises");
var conn4 = mongoose.createConnection("mongodb://localhost/fivedaysadvancebbs");

var UPPERLOWERS = conn.model(
  "upperlowers",
  new mongoose.Schema({
    day: { type: Number },
    typesOfExercises: [{ name: String, sets: Number, reps: Number }],
  })
);

var USERS = conn2.model(
  "users",
  new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: String },
  })
);

var ALLEXERCISES = conn3.model(
  "allexercises",
  new mongoose.Schema({
    name: { type: String }
  })
);

var FIVEDAYSADVANCEBBS = conn4.model(
  "fivedaysadvancebbs",
  new mongoose.Schema({
    day: { type: Number },
    typesOfExercises: [{ name: String, sets: Number, reps: Number }],
  })
);

const db = conn.useDb("upperlowers");
const db2 = conn2.useDb("users");
const db3 = conn3.useDb("allexercises");
const db4 = conn3.useDb("fivedaysadvancebbs");

db.once("open", () => console.log("Connection successful"));

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));

//get all upperlowers
router.get("/upperlowers", async (req, res) => {
  try {
    const upperlowers = await UPPERLOWERS.find().sort({ day: 1 });
    res.json(upperlowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await USERS.find().sort({ firstName: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all exercises
router.get("/allexercises", async (req, res) => {
  try {
    const allexercises = await ALLEXERCISES.find().sort({ name: 1 });
    res.json(allexercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all 5-day advance bb workout
router.get("/fivedaysadvancebbs", async (req, res) => {
  try {
    const fivedaysadvancebbs = await FIVEDAYSADVANCEBBS.find().sort({ day: 1 });
    res.json(fivedaysadvancebbs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//add
router.post("/upperlowers", async (req, res) => {
  db.collection("upperlowers")
    .updateOne(
      { day: req.body.day },
      { $push: { typesOfExercises: req.body["info"] } }
    )
    .then(() => {
      return UPPERLOWERS.findOne({day: req.body.day}).then((result) => {
        res.send(result.typesOfExercises);
      });
    });
});

//delete
router.post("/upperlowers/delete", async (req, res) => {
  db.collection("upperlowers")
    .findOneAndUpdate(
      { day: req.body.day },
      { $pull: { typesOfExercises: { name: req.body.name } } }
    )
    .then(res.send("success"));
});

// add into users
router.post("/users", async (req, res) => {
  db2
    .collection("users")
    .insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
    })
    .then(res.send(req.body));
});
