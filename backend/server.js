const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const notesroute = require("./routes/notesroutes");
const cors = require("cors");
const userroute = require("./routes/userroutes");

const app = express();
env.config();
app.use(express.json());
app.use(cors({
  origin:'https://note-app-mern-kvo1.vercel.app',
  methods:["GET","POST","PUT","DELETE"]
  ));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

app.use("/api/notes", notesroute);
app.use("/api/user", userroute);
