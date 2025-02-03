import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 10) {
      alert('รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    try {
      console.log('Sending data:', formData); // เพิ่ม log ข้อมูลที่จะส่ง

      const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: formData.user_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      console.log('Response status:', response.status); // เพิ่ม log สถานะการตอบกลับ

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert(`ข้อผิดพลาด: ${errorData.message || 'การลงทะเบียนล้มเหลว'}`);
      } else {
        const data = await response.json();
        console.log('Success:', data); // เพิ่ม log ข้อมูลที่ได้รับ
        alert('ลงทะเบียนผู้ใช้สำเร็จ');
        // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
        setFormData({
          user_name: '',
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดระหว่างการลงทะเบียน');
    }
  };

  return (
    <div>
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_name">ชื่อผู้ใช้:</label>
          <input type="text" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="first_name">ชื่อจริง:</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="last_name">นามสกุล:</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">อีเมล:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="role">บทบาท:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">ผู้ใช้</option>
            <option value="field_owner">เจ้าของสนาม</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}