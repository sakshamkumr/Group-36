import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/images.png';
import toggle_light from '../../assets/day.png';
import toggle_night from '../../assets/night.png';
import { useState, useEffect } from 'react';

const Navbar = ({ theme, setTheme }) => {
    const [user, setUser] = useState(null);
    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
        // console.log(user);
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("user");
        if (user.gl) {
            setUser(null);
            localStorage.removeItem("user");
            window.location.reload();
            return;
        }
        signOut(auth).then(() => {
            setUser(null);
            localStorage.removeItem("user");
            window.location.reload();
        });
    };

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={logo} alt="News Logo" className='logo' />
            </Link>

            <div className='navbar-items'>
                <ul>
                    <li><Link to="/headlines">All Headlines</Link></li>
                    <li><Link to="/country">Country</Link></li>
                    <li>{user?.email ? <Link onClick={handleLogout}>Logout ({user?.name})</Link> : <Link to="/login">Login</Link>}</li>
                </ul>

                {/* 🔹 Toggle Light/Dark Mode */}
                <img
                    onClick={toggle_mode}
                    src={theme === 'light' ? toggle_night : toggle_light}
                    alt="Toggle Theme"
                    className='toggle-icon'
                />
            </div>
        </div>
    );
};

export default Navbar;
