import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../utils/logo.gif';
import style from './navBar.module.css';


export default function NavBar() {
    return (
        <header className={style.navbar}>
            <div>
                <img id="logo" src={logo} width="60" height="30" alt="" />
            </div>
            <nav>
                <ul className={style.list}>
                    <li className={style.listItem}>
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/create" >Create a recipe</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

