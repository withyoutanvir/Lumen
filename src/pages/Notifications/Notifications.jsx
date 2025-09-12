import React from "react";
import { useData } from "../../context/DataContext";

export default function Notifications() {
  const { notifications, clearNotification, lowStockProducts } = useData();

  const low = lowStockProducts();

  return (
    <div>
      <h1 className="text-xl font-bold">Notifications</h1>

      <div className="mt-4">
        <h2 className="font-semibold">Low stock</h2>
        {low.length === 0 ? <div className="text-gray-500">No low stock</div> :
          <ul className="mt-2">
            {low.map(p => <li key={p.id} className="p-2 border-b text-red-600">{p.name} — {p.stock} (reorder at {p.reorderPoint})</li>)}
          </ul>
        }
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Other notifications</h2>
        <ul className="mt-2">
          {notifications.map(n => (
            <li key={n.id} className="p-2 border-b flex justify-between">
              <div>
                <div className="text-sm">{n.text}</div>
                <div className="text-xs text-gray-500">{new Date(n.timestamp).toLocaleString()}</div>
              </div>
              <div>
                <button onClick={() => clearNotification(n.id)} className="text-red-600">Clear</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
