import React, { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut } from '../firebase';
import "./PagesStylesheets/login.css";
import axios from 'axios';

const Login = ({ theme }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [log, setLog] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    setLog(true);
  };

  useEffect(() => {
    if (!log) {
      return;
    }
    async function verify() {
      const response = await axios.post(`http://localhost:3000/verify`, { email, password });
      if (response?.data.verified) {
        console.log(response);
        let data = {}
        data.email = email;
        data.name = response?.data.info.name;
        data.password = password;
        localStorage.setItem("user", JSON.stringify(data))
        window.location.href = '/';
      } else {
        alert("Invalid credentials");
      }
    } 
    verify();
  }, [log])

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
          <button type="submit" className="button" onClick={handleLogin}>
            Login
          </button>
        </form>

        <h4 style={{ margin: 10 }}>OR</h4>
        <button type="submit" className="button" onClick={handleLoginByGoogle}>
          Login By Google
        </button>
        <p className="footer">
          Don't have an account? <a href="/register" className="link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
