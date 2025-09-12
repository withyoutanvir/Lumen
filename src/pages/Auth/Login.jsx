import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Staff");

  const handle = (e) => {
    e.preventDefault();
    if (!username) return alert("Enter username");
    login(username, role);
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handle} className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Lumen — Login</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select className="w-full p-2 mb-3 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Admin</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
