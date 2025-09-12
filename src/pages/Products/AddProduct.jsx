import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function AddProduct() {
  const { addProduct, categories, suppliers } = useData();
  const [form, setForm] = useState({
    name: "",
    category: categories[0]?.name || "",
    supplierId: suppliers[0]?.id || "",
    stock: 0,
    reorderPoint: 5,
    sku: "",
    description: ""
  });
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    addProduct(form);
    nav("/products");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Add Product</h1>
      <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-4 max-w-2xl">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="p-2 border rounded" />
        <input placeholder="SKU" value={form.sku} onChange={(e)=>setForm({...form,sku:e.target.value})} className="p-2 border rounded" />
        <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="p-2 border rounded">
          {categories.map(c => <option key={c.id}>{c.name}</option>)}
        </select>
        <select value={form.supplierId} onChange={(e)=>setForm({...form,supplierId:e.target.value})} className="p-2 border rounded">
          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="number" value={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})} className="p-2 border rounded" />
        <input type="number" value={form.reorderPoint} onChange={(e)=>setForm({...form,reorderPoint:e.target.value})} className="p-2 border rounded" />
        <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="col-span-2 p-2 border rounded" />
        <div className="col-span-2">
          <button className="bg-green-600 text-white px-3 py-2 rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
