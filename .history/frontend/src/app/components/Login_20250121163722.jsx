"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "", // รองรับทั้ง username และ email
    password: "", // รหัสผ่าน
  });

  const [message, setMessage] = useState(""); // ข้อความแจ้งเตือน
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target; // ดึงชื่อฟิลด์และค่าจาก input
    setFormData({ ...formData, [name]: value }); // อัปเดตข้อมูลใน state
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการ refresh หน้าเว็บ

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST", // ใช้ HTTP POST สำหรับส่งข้อมูล
        headers: {
          "Content-Type": "application/json", // ระบุว่าเราส่งข้อมูลแบบ JSON
        },
        body: JSON.stringify(formData), // ส่งข้อมูล formData ไปยังเซิร์ฟเวอร์
      });

      if (!response.ok) {
        const errorData = await response.json(); // รับข้อมูลข้อผิดพลาดจากเซิร์ฟเวอร์
        alert(errorData.message || "เกิดข้อผิดพลาด"); // แสดงข้อความข้อผิดพลาด
        setMessage(errorData.message || "เกิดข้อผิดพลาด"); // แสดงข้อความข้อผิดพลาด
        return;
      }

      const data = await response.json(); // รับข้อมูลจากเซิร์ฟเวอร์
      alert(`ยินดีต้อนรับ, ${data.user.first_name}`); // แสดงข้อความต้อนรับ
      router.push("./landing");
      console.log("User data:", data); // แสดงข้อมูลผู้ใช้ใน console
    } catch (error) {
      console.error("Error:", error); // แสดงข้อผิดพลาดใน console
      setMessage("เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ"); // แสดงข้อความข้อผิดพลาดทั่วไป
    }
  };

  return (
    <div>
      <h2>เข้าสู่ระบบ</h2>
      {message && <p>{message}</p>} {/* แสดงข้อความแจ้งเตือน */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">ชื่อผู้ใช้หรืออีเมล:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onClick={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onClick={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
