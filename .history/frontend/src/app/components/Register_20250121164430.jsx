'use client';
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'user_name':
        if (!value) error = 'ชื่อผู้ใช้ห้ามเว้นว่าง';
        break;
      case 'first_name':
        if (!value) error = 'ชื่อจริงห้ามเว้นว่าง';
        break;
      case 'last_name':
        if (!value) error = 'นามสกุลห้ามเว้นว่าง';
        break;
      case 'email':
        if (!value) error = 'อีเมลห้ามเว้นว่าง';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'รูปแบบอีเมลไม่ถูกต้อง';
        break;
      case 'password':
        if (!value) error = 'รหัสผ่านห้ามเว้นว่าง';
        else if (value.length < 10) error = 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ตรวจสอบว่ามีข้อผิดพลาดในฟอร์มหรือไม่
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('กรุณาแก้ไขข้อผิดพลาดในฟอร์ม');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`ข้อผิดพลาด: ${errorData.message || 'การลงทะเบียนล้มเหลว'}`);
      } else {
        alert('ลงทะเบียนผู้ใช้สำเร็จ');
        setFormData({
          user_name: '',
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer',
        });
        setErrors({});
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
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          {errors.user_name && <p style={{ color: 'red' }}>{errors.user_name}</p>}
        </div>
        <div>
          <label htmlFor="first_name">ชื่อจริง:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
        </div>
        <div>
          <label htmlFor="last_name">นามสกุล:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
        </div>
        <div>
          <label htmlFor="email">อีเมล:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="role">บทบาท:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">ผู้ใช้</option>
            <option value="field_owner">เจ้าของสนาม</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
