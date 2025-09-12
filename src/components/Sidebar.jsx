import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/suppliers", label: "Suppliers" },
    { to: "/orders", label: "Orders" },
    { to: "/stock", label: "Stock" },
    { to: "/notifications", label: "Notifications" }
  ];

  return (
    <aside className="w-60 bg-white border-r min-h-screen p-4">
      <div className="font-bold mb-4">Lumen</div>
      <nav className="flex flex-col gap-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-50 font-semibold" : "text-gray-700"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 text-sm text-gray-500">Role: {user?.role}</div>
    </aside>
  );
}
