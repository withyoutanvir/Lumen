import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StockTransaction() {
  const { products, addStockTransaction } = useData();
  const { user } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    productId: products[0]?.id || "",
    delta: 0,
    note: ""
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.productId) return alert("Select product");
    addStockTransaction({ ...form, user: user.username });
    nav("/stock");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Stock Transaction</h1>
      <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-4 max-w-2xl">
        <select value={form.productId} onChange={(e)=>setForm({...form,productId:e.target.value})} className="p-2 border rounded">
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input type="number" value={form.delta} onChange={(e)=>setForm({...form,delta:e.target.value})} className="p-2 border rounded" placeholder="Delta (use negative for out)" />
        <textarea value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})} className="col-span-2 p-2 border rounded" placeholder="Note" />
        <div className="col-span-2">
          <button className="bg-green-600 text-white px-3 py-2 rounded">Apply</button>
        </div>
      </form>
    </div>
  );
}
