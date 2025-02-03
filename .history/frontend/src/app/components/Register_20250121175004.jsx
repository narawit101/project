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

  const [errors, setErrors] = useState({
    user_name: '',
    email: '',
    passwordMatch: '',
    passwordLength: '',
    emptyField: '',
    serverError: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle password and confirmPassword checks dynamically
    if (name === 'password' || name === 'confirmPassword') {
      const updatedPassword = name === 'password' ? value : formData.password;
      const updatedConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;

      if (updatedPassword.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร',
        }));
      } else if (updatedPassword === updatedConfirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: '',
          passwordMatch: '', // Clear password match error when valid
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: '',
          passwordMatch: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน',
        }));
      }
    }

    // Check for duplicate user_name or email dynamically
    if (name === 'user_name' || name === 'email') {
      try {
        const response = await fetch(
          `http://localhost:5000/register/check-duplicate?field=${name}&value=${value}`
        );
        const data = await response.json();
        if (data.isDuplicate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `${name === 'user_name' ? 'ชื่อผู้ใช้' : 'อีเมล'} ซ้ำ`,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
      } catch (error) {
        console.error('Error checking duplicates:', error);
      }
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
          <p className="error-text">{errors.user_name}</p>
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
          <p className="error-text">{errors.email}</p>
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
          <p className="error-text">{errors.passwordMatch}</p>
        </div>
        <p className="error-text">{errors.passwordLength}</p>
        <div>
          <label htmlFor="role">บทบาท:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">ผู้ใช้</option>
            <option value="field_owner">เจ้าของสนาม</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <p className="error-text">{errors.emptyField}</p>
        <p className="error-text">{errors.serverError}</p>
      </form>
      <style jsx>{`
        .error-text {
          color: red;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}
