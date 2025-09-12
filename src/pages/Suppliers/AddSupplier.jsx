import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function AddSupplier() {
  const { addSupplier } = useData();
  const [form, setForm] = useState({ name: "", contact: "", phone: "" });
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    addSupplier(form);
    nav("/suppliers");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Add Supplier</h1>
      <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-4 max-w-2xl">
        <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="p-2 border rounded" placeholder="Name" />
        <input value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} className="p-2 border rounded" placeholder="Contact email" />
        <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="p-2 border rounded" placeholder="Phone" />
        <div className="col-span-2">
          <button className="bg-green-600 text-white px-3 py-2 rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
