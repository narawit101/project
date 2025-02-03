"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSave = async () => {
    if (!userName || !passWord) {
      setErrorMessage("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email }),
      });

      if (!res.ok) {
        throw new Error("การเชื่อมต่อกับเซิร์ฟเวอร์ล้มเหลว");
      }

      const resData = await res.json();

      if (resData.data && resData.data.dataStatus === 1) {
        router.push("/landing");
      } else {
        setErrorMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      setErrorMessage(error.message || "เกิดข้อผิดพลาดไม่คาดคิด");
    }
  };

  return (
    <div>
      <h2>เข้าสู่ระบบ</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      <button onClick={onSave}>Login</button>
    </div>
  );
}
