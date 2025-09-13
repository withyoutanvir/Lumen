import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated authentication
    if (email && password) {
      if (onLoginSuccess) {
        onLoginSuccess({ email, role });
      }
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="company-info-panel">
        <h1>Subscription Management</h1>
        <p>
          Effortlessly manage your subscriptions, analyze usage, and streamline your billing process.
        </p>
        <span>Need help? Contact support</span>
      </div>
      <div className="auth-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">End User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}