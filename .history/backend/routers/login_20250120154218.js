    const express = require("express"); // นำเข้า Express เพื่อใช้สร้าง API
    const { Pool } = require("pg"); // นำเข้า Pool จาก pg เพื่อเชื่อมต่อกับ PostgreSQL
    const bcrypt = require("bcrypt"); // นำเข้า bcrypt เพื่อใช้สำหรับตรวจสอบรหัสผ่านที่เข้ารหัส
    require("dotenv").config(); // โหลดตัวแปรสิ่งแวดล้อมจากไฟล์ .env

    const router = express.Router(); // สร้าง router สำหรับจัดการ route API

    // ตั้งค่าการเชื่อมต่อกับฐานข้อมูล PostgreSQL
    const pool = new Pool({
    user: process.env.DB_USER, // ชื่อผู้ใช้ฐานข้อมูล
    host: process.env.DB_HOST, // ที่อยู่ของเซิร์ฟเวอร์ฐานข้อมูล
    database: process.env.DB_DATABASE, // ชื่อฐานข้อมูล
    password: process.env.DB_PASSWORD, // รหัสผ่านฐานข้อมูล
    port: process.env.DB_PORT, // พอร์ตของฐานข้อมูล
    });

    // Route สำหรับตรวจสอบการเข้าสู่ระบบ
    router.post("/", async (req, res) => {
    const { identifier, password } = req.body; // รับข้อมูล identifier (username หรือ email) และ password จากคำขอ

    try {
        // ค้นหาผู้ใช้ในฐานข้อมูลโดยตรวจสอบทั้ง username และ email
        const userQuery = `
        SELECT * FROM users WHERE user_name = $1 OR email = $1
        `;
        const userResult = await pool.query(userQuery, [identifier]); // ใช้ query เพื่อดึงข้อมูลผู้ใช้จากฐานข้อมูล

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (userResult.rows.length === 0) {
        // ถ้าไม่พบผู้ใช้ ให้ส่งข้อผิดพลาดกลับไป
        return res.status(400).json({ message: "ชื่อผู้ใช้หรืออีเมล หรือรหัสผ่านไม่ถูกต้อง" });
        }

        const user = userResult.rows[0]; // ดึงข้อมูลผู้ใช้ที่พบ

        // ตรวจสอบว่ารหัสผ่านตรงกับรหัสผ่านในฐานข้อมูลหรือไม่
        const isPasswordValid = await bcrypt.compare(password, user.password); // เปรียบเทียบรหัสผ่านกับรหัสผ่านที่เข้ารหัส
        if (!isPasswordValid) {
        // ถ้ารหัสผ่านไม่ถูกต้อง ให้ส่งข้อผิดพลาดกลับไป
        return res.status(400).json({ message: "ชื่อผู้ใช้หรืออีเมล หรือรหัสผ่านไม่ถูกต้อง" });
        }

        // ส่งข้อมูลผู้ใช้กลับไปยังฝั่งไคลเอนต์ (ไม่ควรส่งรหัสผ่าน)
        res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        user: {
            user_name: user.user_name, // ชื่อผู้ใช้
            first_name: user.first_name, // ชื่อจริง
            last_name: user.last_name, // นามสกุล
            email: user.email, // อีเมล
            role: user.role, // บทบาทของผู้ใช้
        },
        });
    } catch (error) {
        // ถ้ามีข้อผิดพลาดในระหว่างการดำเนินการ
        console.error("Error:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message }); // ส่งข้อผิดพลาดกลับไปยังฝั่งไคลเอนต์
    }
    });

    module.exports = router; // ส่งออก router เพื่อนำไปใช้ในไฟล์อื่น
