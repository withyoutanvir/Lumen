import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function OrderList() {
  const { orders, suppliers, products } = useData();

  const supplierName = (id) => suppliers.find(s => s.id === id)?.name || "Unknown";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Orders</h1>
        {/* A simple add order button could be added */}
      </div>
      <table className="w-full mt-4 border">
        <thead className="bg-gray-100"><tr><th className="p-2">ID</th><th className="p-2">Supplier</th><th className="p-2">Status</th><th className="p-2">Items</th><th className="p-2">Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{supplierName(o.supplierId)}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">{o.items.map(it => `${it.quantity}x ${products.find(p=>p.id===it.productId)?.name || it.productId}`).join(", ")}</td>
              <td className="p-2"><Link to={`/orders/update/${o.id}`} className="text-blue-600">Update</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
