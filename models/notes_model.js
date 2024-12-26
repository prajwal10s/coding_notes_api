const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  included_topics: String,
  content: { type: String, required: true },
});

module.exports = notesSchema;
