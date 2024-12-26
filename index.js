const express = require("express");

const app = express();

const dotenv = require("dotenv");

const env = dotenv.config();

const port = process.env.PORT || 3000;

const notesRoutes = require("./routes/notes_routes");
app.use(express.json());
app.use("/notes", notesRoutes);

app.listen(port, () => {
  console.log("Servers is listening on port", port);
});
