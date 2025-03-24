import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from '../firebase';
import "./PagesStylesheets/register.css";
import axios from 'axios';

const Register = ({ theme }) => {
  const [user, setUser] = useState(null);
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
    let data = {}
    data.email = email;
    data.name = name;
    data.password = password;
    setUser(data);
    
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    async function register() {
      const response = await axios.get(`http://localhost:3000/check-email?email=${user?.email}`);
      console.log(response)
      if (response?.data.exists) {
        console.log("User exists");
      } else {
        await axios.post(`http://localhost:3000/register`, user);
        console.log("User registered");
      }
      localStorage.setItem("user", JSON.stringify(user))
      window.location.href = '/';
    }
    register();

  }, [user])

  const handleLoginByGoogle = () => {
    // console.log(11)
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        let data = {}
        data.email = user.email;
        data.name = user.displayName;
        data.password = user.email.split('@')[0];
        setUser(data);
        // console.log(data)
        localStorage.setItem("user", JSON.stringify(data)); // Save user in local storage
        // console.log(result)


      })
      .catch((error) => console.error(error));
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
        <h4 style={{ margin: 10 }}>OR</h4>
        <button type="submit" className="button" onClick={handleLoginByGoogle}>
          Login By Google
        </button>
        <p className="footer">
          Already have an account? <a href="/login" className="link">Login</a>
        </p>

      </div>
    </div>
  );
};

export default Register;
