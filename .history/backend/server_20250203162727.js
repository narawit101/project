const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // อนุญาตให้ Next.js (Frontend) เรียก API
    credentials: true, // อนุญาตให้ส่ง cookies
  })
);




const app = express();
const registerRoute = require("./routers/register");
const loginRoute = require("./routers/login");
const usersRoute = require("./routers/users");
const logoutRoute = require("./routers/logout");
const protectedRoute = require("./routers/protected");




const port = 5000;
app.use(cors());
app.use(bodyParser.json());


// เพิ่ม route สำหรับ root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// ใช้ routes ที่แยกออกมา
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/users", usersRoute);
app.use("/logout", logoutRoute);
app.use("/protected", protectedRoute);


require('dotenv').config();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});