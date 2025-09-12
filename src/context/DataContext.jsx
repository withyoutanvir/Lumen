import React, { createContext, useContext, useEffect, useState } from "react";
import productsSeed from "../data/products.json";
import categoriesSeed from "../data/categories.json";
import suppliersSeed from "../data/suppliers.json";
import ordersSeed from "../data/orders.json";
import notificationsSeed from "../data/notifications.json";

const DataContext = createContext();

const LS_KEYS = {
  products: "eims_products_v1",
  categories: "eims_categories_v1",
  suppliers: "eims_suppliers_v1",
  orders: "eims_orders_v1",
  notifications: "eims_notifications_v1"
};

function readOrSeed(key, seed) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
}

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() =>
    readOrSeed(LS_KEYS.products, productsSeed)
  );
  const [categories, setCategories] = useState(() =>
    readOrSeed(LS_KEYS.categories, categoriesSeed)
  );
  const [suppliers, setSuppliers] = useState(() =>
    readOrSeed(LS_KEYS.suppliers, suppliersSeed)
  );
  const [orders, setOrders] = useState(() =>
    readOrSeed(LS_KEYS.orders, ordersSeed)
  );
  const [notifications, setNotifications] = useState(() =>
    readOrSeed(LS_KEYS.notifications, notificationsSeed)
  );

  useEffect(() => {
    localStorage.setItem(LS_KEYS.products, JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.categories, JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.suppliers, JSON.stringify(suppliers));
  }, [suppliers]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.orders, JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.notifications, JSON.stringify(notifications));
  }, [notifications]);

  // --- Products CRUD ---
  const addProduct = (p) => {
    const newP = { ...p, id: Date.now().toString() };
    setProducts((s) => [newP, ...s]);
    return newP;
  };
  const updateProduct = (id, patch) =>
    setProducts((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const deleteProduct = (id) =>
    setProducts((s) => s.filter((it) => it.id !== id));

  // stock transaction: {productId, delta, note, user, timestamp}
  const addStockTransaction = ({ productId, delta, note, user }) => {
    setProducts((s) =>
      s.map((p) =>
        p.id === productId ? { ...p, stock: Number(p.stock) + Number(delta) } : p
      )
    );
    const tx = {
      id: "tx_" + Date.now(),
      productId,
      delta: Number(delta),
      note,
      user,
      timestamp: new Date().toISOString()
    };
    setNotifications((n) => [
      ...n,
      { id: "note_" + Date.now(), type: "transaction", text: `Stock transaction for product ${productId}`, timestamp: new Date().toISOString() }
    ]);
    return tx;
  };

  // --- Category CRUD ---
  const addCategory = (c) => {
    const newC = { ...c, id: Date.now().toString() };
    setCategories((s) => [newC, ...s]);
    return newC;
  };

  // --- Suppliers CRUD ---
  const addSupplier = (s) => {
    const newS = { ...s, id: Date.now().toString() };
    setSuppliers((cur) => [newS, ...cur]);
    return newS;
  };
  const updateSupplier = (id, patch) =>
    setSuppliers((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const deleteSupplier = (id) => setSuppliers((s) => s.filter((it) => it.id !== id));

  // --- Orders ---
  const addOrder = (order) => {
    const newO = { ...order, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setOrders((o) => [newO, ...o]);
    return newO;
  };
  const updateOrder = (id, patch) =>
    setOrders((o) => o.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  // --- Notifications ---
  const pushNotification = (notification) =>
    setNotifications((n) => [{ id: "note_" + Date.now(), ...notification }, ...n]);
  const clearNotification = (id) =>
    setNotifications((n) => n.filter((it) => it.id !== id));

  // --- Utility: low stock check ---
  const lowStockProducts = () =>
    products.filter((p) => Number(p.stock) <= Number(p.reorderPoint));

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        suppliers,
        orders,
        notifications,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addOrder,
        updateOrder,
        addStockTransaction,
        pushNotification,
        clearNotification,
        lowStockProducts
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
