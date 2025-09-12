import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function CategoryList() {
  const { categories } = useData();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Categories</h1>
        <Link to="/categories/add" className="bg-green-600 text-white px-3 py-1 rounded">Add Category</Link>
      </div>
      <ul className="mt-4">
        {categories.map(c => (
          <li key={c.id} className="p-2 border-b">{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
