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
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดระหว่างออกจากระบบ");
      }
  
      // ✅ ลบ Token ใน LocalStorage และ Refresh หน้า
      localStorage.removeItem("token");
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error:", error);
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
