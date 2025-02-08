import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/images.png';
import toggle_light from '../../assets/day.png';
import toggle_night from '../../assets/night.png';

const Navbar = ({ theme, setTheme }) => {
    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
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
                    <li><Link to="/login">Login</Link></li>
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
