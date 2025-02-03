"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("token") || localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // ✅ ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
    }
  }, []);

  return <div>{children}</div>; // ✅ แสดงเนื้อหาถ้ามี Token
}
