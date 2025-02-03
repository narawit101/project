const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config(); // โหลดตัวแปรจากไฟล์ .env

// สร้างเซิร์ฟเวอร์ Express
const app = express();
const port = process.env.PORT || 5000; // ใช้ PORT จาก .env

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
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route ตัวอย่าง: เพิ่มข้อมูล
app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
