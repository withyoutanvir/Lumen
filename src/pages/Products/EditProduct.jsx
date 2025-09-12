import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct, categories, suppliers } = useData();
  const nav = useNavigate();
  const product = products.find(p => p.id === id);

  const [form, setForm] = useState(product || {});

  useEffect(()=> {
    if (!product) nav("/products");
    else setForm(product);
  }, [product]);

  const submit = (e) => {
    e.preventDefault();
    updateProduct(id, form);
    nav("/products");
  };

  if (!product) return null;

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Product</h1>
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
        <div className="col-span-2 flex gap-2">
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Save</button>
          <button type="button" onClick={()=>nav("/products")} className="px-3 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  );
}
