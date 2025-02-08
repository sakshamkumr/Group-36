import React, { useState } from "react";
import "./PagesStylesheets/register.css";

const Register = ({ theme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering user:", { name, email, password });
  };

  return (
    <div className={theme === "dark" ? "dark-container" : "light-container"}>
      <div className={theme === "dark" ? "dark-card" : "light-card"}>
        <h2 className="title">Create an Account</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={theme === "dark" ? "dark-input" : "light-input"}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={theme === "dark" ? "dark-input" : "light-input"}
            required
          />
          <button type="submit" className="button">
            Register
          </button>
        </form>

        <p className="footer">
          Already have an account? <a href="/login" className="link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
