import React from "react";
import { Bell } from "lucide-react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
  const { notifications, lowStockProducts } = useData();
  const nav = useNavigate();

  const lowCount = lowStockProducts().length;
  const otherCount = notifications.length;
  const total = lowCount + otherCount;

  return (
    <div className="relative cursor-pointer" onClick={() => nav("/notifications")}>
      <Bell className="w-6 h-6 text-gray-700" />
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
          {total}
        </span>
      )}
    </div>
  );
}
