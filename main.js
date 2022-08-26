const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3500;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected successfully");
    },
    (err) => {
      console.log("Error when connecting to the database" + " " + err);
    }
  );

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
