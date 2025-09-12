import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProductList from "./pages/Products/ProductList";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";

import CategoryList from "./pages/Categories/CategoryList";
import AddCategory from "./pages/Categories/AddCategory";

import SupplierList from "./pages/Suppliers/SupplierList";
import AddSupplier from "./pages/Suppliers/AddSupplier";

import OrderList from "./pages/Orders/OrderList";
import UpdateOrder from "./pages/Orders/UpdateOrder";

import StockList from "./pages/Stock/StockList";
import StockTransaction from "./pages/Stock/StockTransaction";

import Notifications from "./pages/Notifications/Notifications";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {user && <Sidebar />}
      <div className="flex-1">
        {user && <Navbar />}
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Products */}
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            {/* Categories */}
            <Route
              path="/categories"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/add"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AddCategory />
                </ProtectedRoute>
              }
            />
            {/* Suppliers */}
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <SupplierList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers/add"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AddSupplier />
                </ProtectedRoute>
              }
            />
            {/* Orders */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/update/:id"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            />
            {/* Stock */}
            <Route
              path="/stock"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <StockList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/transaction"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <StockTransaction />
                </ProtectedRoute>
              }
            />
            {/* Notifications */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Manager", "Staff"]}>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
