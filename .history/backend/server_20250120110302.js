const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// สร้างเซิร์ฟเวอร์ Express
const app = express();
const port = 5000;

// ตั้งค่าการเชื่อมต่อกับ PostgreSQL
const pool = new Pool({
  user: 'your_username', // ชื่อผู้ใช้ PostgreSQL
  host: 'localhost', // ที่อยู่ของเซิร์ฟเวอร์
  database: 'your_database', // ชื่อฐานข้อมูล
  password: 'your_password', // รหัสผ่าน
  port: 5432, // พอร์ต (ค่าเริ่มต้นคือ 5432)
});

// ใช้ Middleware
app.use(cors()); // อนุญาตให้เชื่อมต่อจากโดเมนอื่น
app.use(bodyParser.json()); // ใช้จัดการ JSON ใน Request

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
