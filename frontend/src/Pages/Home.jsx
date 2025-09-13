import React from "react";
import "./Home.css";

export default function HomePage({ role, email, onLogout }) {
  return (
    <div className="animated-bg">
      <div className="home-container">
        <div className="home-header">
          <h1>
            Welcome, <span className="home-username">{email}</span>! 👋
          </h1>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="dashboard-cards">
          {role === "user" ? (
            <>
              <div className="dashboard-card">
                <span className="card-icon">📦</span>
                <h2>Browse & Subscribe</h2>
                <p>Explore available plans and subscribe with a click.</p>
              </div>
              <div className="dashboard-card">
                <span className="card-icon">🔄</span>
                <h2>Manage Subscription</h2>
                <p>Upgrade, downgrade, cancel, or renew your plans anytime.</p>
              </div>
              <div className="dashboard-card">
                <span className="card-icon">🎁</span>
                <h2>Offers & Recommendations</h2>
                <p>Get personalized offers and plan recommendations.</p>
              </div>
            </>
          ) : (
            <>
              <div className="dashboard-card">
                <span className="card-icon">🛠️</span>
                <h2>Manage Plans</h2>
                <p>Add, edit, or remove subscription plans and pricing.</p>
              </div>
              <div className="dashboard-card">
                <span className="card-icon">💸</span>
                <h2>Discounts</h2>
                <p>Create and manage discounts for users.</p>
              </div>
              <div className="dashboard-card">
                <span className="card-icon">📊</span>
                <h2>Analytics</h2>
                <p>Track usage trends and optimize your offerings.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}