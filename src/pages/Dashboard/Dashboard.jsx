import React from "react";
import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const { products, suppliers, orders, lowStockProducts } = useData();
  const low = lowStockProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Suppliers</div>
          <div className="text-2xl font-bold">{suppliers.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-2xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Low Stock</div>
          <div className="text-2xl font-bold text-red-600">{low.length}</div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold">Recent activity</h2>
        <div className="mt-2 text-gray-500">Transactions and notifications appear in Notifications.</div>
      </div>
    </div>
  );
}
