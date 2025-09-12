import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function UpdateOrder() {
  const { id } = useParams();
  const { orders, updateOrder } = useData();
  const order = orders.find(o => o.id === id);
  const [status, setStatus] = useState(order?.status || "");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    updateOrder(id, { status });
    nav("/orders");
  };

  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h1 className="text-xl font-bold">Update Order {order.id}</h1>
      <form onSubmit={submit} className="mt-4">
        <select className="p-2 border rounded" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="pending">pending</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
        <div className="mt-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
