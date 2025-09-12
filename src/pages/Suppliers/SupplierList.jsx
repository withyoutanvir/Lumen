import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function SupplierList() {
  const { suppliers } = useData();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Suppliers</h1>
        <Link to="/suppliers/add" className="bg-green-600 text-white px-3 py-1 rounded">Add Supplier</Link>
      </div>
      <table className="w-full mt-4 border">
        <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Contact</th><th className="p-2">Phone</th></tr></thead>
        <tbody>
          {suppliers.map(s => <tr key={s.id} className="border-t"><td className="p-2">{s.name}</td><td className="p-2">{s.contact}</td><td className="p-2">{s.phone}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
