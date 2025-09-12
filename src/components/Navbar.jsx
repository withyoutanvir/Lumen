import React from "react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white border-b p-3">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")} className="font-bold">Lumen</button>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <div className="text-sm">
          <div>{user?.username}</div>
          <div className="text-xs text-gray-500">{user?.role}</div>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
