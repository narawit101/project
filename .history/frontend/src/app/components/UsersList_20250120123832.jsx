'use client'
import React, { useEffect, useState } from 'react';

export default function UserList() {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.user_name}-{user.first_name} {user.last_name} - {user.email}-{user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}