const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();
const registerRoute = require("./routers/register");
const usersRoute = require("./routers/users");
const loginRoute = require("./routers/login");


const port = 5000;
app.use(cors());
app.use(bodyParser.json());


// เพิ่ม route สำหรับ root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// ใช้ routes ที่แยกออกมา
app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});