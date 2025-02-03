"use client";
import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.user_id}-{user.user_name}-{user.first_name} {user.last_name} -{" "}
            {user.email}-{user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
