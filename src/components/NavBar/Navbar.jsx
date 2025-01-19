import React from 'react';
import './navbar.css';
import logo from '../../assets/images.png'
import toggle_light from '../../assets/day.png'
import toggle_night from '../../assets/night.png'
const Navbar = ({theme,setTheme}) => {
    const toggle_mode=()=>{
        theme=='light'?setTheme('dark'):setTheme('light')
    }
    return (
        <div className='navbar'>

        <img src={logo} alt=""  className='logo'/>
        <div className='navbar-items'>
        <ul>
            <li>All News</li>
            <li>Top Headlines</li>
            <li>Country</li>
        </ul>
        <img onClick={()=>{toggle_mode()}} src={theme=='light'?toggle_night:toggle_light} alt="" className='toggle-icon'/>
        </div>
        
        </div>
    );
};

export default Navbar;
