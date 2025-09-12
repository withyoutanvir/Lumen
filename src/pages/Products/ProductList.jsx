import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function ProductList() {
  const { products, deleteProduct, categories } = useData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = products.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === "low") return Number(p.stock) <= Number(p.reorderPoint);
    if (filter === "out") return Number(p.stock) === 0;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Link to="/products/add" className="bg-green-600 text-white px-3 py-1 rounded">Add Product</Link>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="border p-2 rounded w-1/3" placeholder="Search by name..." />
        <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <table className="w-full mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Reorder</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className={`p-2 ${Number(p.stock) <= Number(p.reorderPoint) ? "text-red-600 font-semibold" : ""}`}>{p.stock}</td>
              <td className="p-2">{p.reorderPoint}</td>
              <td className="p-2 flex gap-2">
                <Link to={`/products/edit/${p.id}`} className="text-blue-600">Edit</Link>
                <button onClick={()=> {
                  if (confirm("Delete product?")) deleteProduct(p.id);
                }} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
