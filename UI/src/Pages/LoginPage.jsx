import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      nav("/dashboard");
    } catch (err) {
      alert("Login failed (mock). Use admin@company / manager@company / staff@company, pass: pass");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4">Login</h2>
        <input {...register("email")} placeholder="Email" className="border p-2 w-full mb-3" />
        <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full mb-3" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
