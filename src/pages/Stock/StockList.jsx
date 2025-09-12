import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function StockList() {
  const { products } = useData();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Stock</h1>
        <Link to="/stock/transaction" className="bg-blue-600 text-white px-3 py-1 rounded">New Transaction</Link>
      </div>
      <table className="w-full mt-4 border">
        <thead className="bg-gray-100"><tr><th className="p-2">Product</th><th className="p-2">Stock</th><th className="p-2">Reorder</th></tr></thead>
        <tbody>
          {products.map(p => <tr key={p.id} className="border-t"><td className="p-2">{p.name}</td><td className="p-2">{p.stock}</td><td className="p-2">{p.reorderPoint}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
