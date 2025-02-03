"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LogoutButton() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", // ส่ง cookies ไปกับ request
      });
  
      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดระหว่างออกจากระบบ");
      }
  
      setMessage("ออกจากระบบสำเร็จ");
      router.push("/"); // กลับไปหน้าแรกหลัง logout
    } catch (error) {
      console.error("Error:", error);
      setMessage("เกิดข้อผิดพลาดระหว่างออกจากระบบ");
    }
  };
  

  return (
    <div>
      {message && <p>{message}</p>}
      <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}
