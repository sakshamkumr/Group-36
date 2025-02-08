import React, { useState } from "react";
import "./PagesStylesheets/login.css";

const Login = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className={theme === "dark" ? "dark-container" : "light-container"}>
      <div className={theme === "dark" ? "dark-card" : "light-card"}>
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please log in to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={theme === "dark" ? "dark-input" : "light-input"}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={theme === "dark" ? "dark-input" : "light-input"}
            required
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p className="footer">
          Don't have an account? <a href="/register" className="link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
