import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("token"); 

    if (!token) {
      router.push("/login"); 
    }
  }, []);

  return <div>ยินดีต้อนรับสู่หน้าป้องกัน</div>;
}
