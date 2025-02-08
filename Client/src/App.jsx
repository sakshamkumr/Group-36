import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar/Navbar';
import AllNews from './pages/AllNews';
import AllHeadlines from './pages/Headlines';
import Country from './pages/Country';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');

  // Apply the theme to the body element

  useEffect(() => {
    document.body.className = theme;              // Dynamically set the class on the body
    localStorage.setItem('current_theme', theme); // saving last used theme in localStorage
  }, [theme]);

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<AllNews theme={theme} />} />
        <Route path="/Headlines" element={<AllHeadlines theme={theme} />} />
        <Route path="/Country" element={<Country theme={theme} />} />
        <Route path="/Login" element={<Login theme={theme} />} />
        <Route path="/Register" element={<Register theme={theme} />} />
      </Routes>
    </div>
  );
};

export default App;
