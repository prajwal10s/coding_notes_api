const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const notesSchema = require("../models/notes_model");
const dotenv = require("dotenv");
const config = dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";

try {
  mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB successfully");
} catch (error) {
  console.log(error);
}

const notes = mongoose.model("notes", notesSchema);

//READ all the coding notes

router.get("/", async (req, res, next) => {
  try {
    const result = await notes.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//READ coding note by ID

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await notes.findOne({ _id: id });
    if (!result) return next();
    else return res.json(result);
  } catch (error) {
    next(error);
  }
});

//CREATE a coding note

router.post("/", async (req, res, next) => {
  const note = req.body;
  console.log(note);
  try {
    const exists = await notes.find({ title: note.title });
    if (exists.length == 0) {
      try {
        const result = await notes.create(note);
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else {
      res.json("note already exists. Please try different title!");
    }
  } catch (error) {
    console.log(error);
  }
});

//DELETE a coding note

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await notes.findOne({ _id: id });
    if (!result) return next();
    try {
      const deletedNote = await notes.deleteOne({ _id: id });
      res.status(200).json("The note was deleted successfully");
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
