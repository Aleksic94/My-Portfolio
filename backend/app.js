 require("dotenv").config();;
const express = require("express");
var cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const babysRouter = require("./routes/routes");

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(express.json());
app.use(cors());
app.use(babysRouter);
app.use(express.static('public'));

app.listen(8000, () => {
  console.log("Port 8000");
});
