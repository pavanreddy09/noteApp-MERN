const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const notesroute = require("./routes/notesroutes");
const cors = require("cors");
const userroute = require("./routes/userroutes");

const app = express();
env.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

app.use("/api/notes", notesroute);
app.use("/api/user", userroute);
