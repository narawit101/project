const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config(); // โหลดตัวแปรจากไฟล์ .env

// สร้างเซิร์ฟเวอร์ Express
const app = express();
const port = 5000; // ใช้ PORT จาก .env

// ตั้งค่าการเชื่อมต่อกับ PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER, // ใช้ค่าจาก .env
  host: process.env.DB_HOST, // ใช้ค่าจาก .env
  database: process.env.DB_NAME, // ใช้ค่าจาก .env
  password: process.env.DB_PASSWORD, // ใช้ค่าจาก .env
  port: process.env.DB_PORT, // ใช้ค่าจาก .env
});

// ใช้ Middleware
app.use(cors());
app.use(bodyParser.json());

// Route ตัวอย่าง: ดึงข้อมูลทั้งหมด
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Route ตัวอย่าง: เพิ่มข้อมูล

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
