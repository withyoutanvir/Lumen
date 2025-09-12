import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const { addCategory } = useData();
  const [name, setName] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!name) return alert("Provide name");
    addCategory({ name });
    nav("/categories");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Add Category</h1>
      <form onSubmit={submit} className="mt-4">
        <input placeholder="Category name" value={name} onChange={(e)=>setName(e.target.value)} className="p-2 border rounded w-1/3" />
        <div className="mt-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
