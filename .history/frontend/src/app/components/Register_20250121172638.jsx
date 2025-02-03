'use client';
import React, { useState } from 'react';

// Register component definition
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

  // State for error messages
  const [errors, setErrors] = useState({
    user_name: '',
    email: '',
    passwordMatch: '',
    passwordLength: '',
    emptyField: '',
    serverError: ''
  });

  // Handle form data change
  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });

    // Check for password length and match dynamically
    if (name === 'password' || name === 'confirmPassword') {
      if (formData.password.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร'
        }));
      } else if (formData.password === formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: '',
          passwordMatch: ''
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordLength: '',
          passwordMatch: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน'
        }));
      }
    }

    // Check for duplicate user_name and email dynamically as the user types
    if (name === 'user_name' || name === 'email') {
      try {
        const response = await fetch(`http://localhost:5000/register/check-duplicate?field=${name}&value=${value}`);
        const data = await response.json();
        if (data.isDuplicate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `${name === 'user_name' ? 'ชื่อผู้ใช้นี'{name} : 'อีเมลนี้'} ถูกใช้แล้ว`
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
      } catch (error) {
        console.error('Error checking duplicates:', error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset password match and length error before validating
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordMatch: '',
      passwordLength: '',
      emptyField: ''
    }));

    // Check if all fields are filled
    for (let field in formData) {
      if (formData[field] === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emptyField: 'กรุณากรอกข้อมูลทุกช่อง'
        }));
        return;
      }
    }

    // Check if password is at least 10 characters long
    if (formData.password.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordLength: 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร'
      }));
      return;
    }

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน'
      }));
      return;
    }

    // Prevent submission if there are duplicate errors
    if (errors.user_name || errors.email || errors.passwordMatch || errors.passwordLength) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        setErrors((prevErrors) => ({ ...prevErrors, serverError: errorData.message || 'การลงทะเบียนล้มเหลว' }));
      } else {
        const data = await response.json();
        console.log('Success:', data);
        alert('ลงทะเบียนผู้ใช้สำเร็จ');
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
      setErrors((prevErrors) => ({ ...prevErrors, serverError: 'เกิดข้อผิดพลาดระหว่างการลงทะเบียน' }));
    }
  };

  return (
    <div>
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        {/* User Name Input */}
        <div>
          <label htmlFor="user_name">ชื่อผู้ใช้:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          <p>{errors.user_name}</p>
        </div>

        {/* First Name Input */}
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

        {/* Last Name Input */}
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

        {/* Email Input */}
        <div>
          <label htmlFor="email">อีเมล:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p>{errors.email}</p>
        </div>

        {/* Password Input */}
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

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p>{errors.passwordMatch}</p>
        </div>

        {/* Password Length Error */}
        <p>{errors.passwordLength}</p>

        {/* Role Input */}
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

        {/* Submit Button */}
        <button type="submit">Register</button>
        <p>{errors.emptyField}</p>
        <p>{errors.serverError}</p>
      </form>
    </div>
  );
}
