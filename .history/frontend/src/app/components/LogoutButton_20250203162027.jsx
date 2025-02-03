"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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

      // ลบข้อมูล session ที่ client (หากมี)
      localStorage.removeItem("user");
      sessionStorage.clear();

      setMessage("ออกจากระบบสำเร็จ");
      setTimeout(() => {
        router.push("/"); // Redirect หลังจาก 2 วินาที
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("เกิดข้อผิดพลาดระหว่างออกจากระบบ");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
