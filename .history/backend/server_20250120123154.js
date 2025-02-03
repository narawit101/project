const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const registerRoute = require("./routes/register");
const usersRoute = require("./routes/users");

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// เพิ่ม route สำหรับ root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// ใช้ routes ที่แยกออกมา
app.use("/register", registerRoute);
app.use("/users", usersRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});