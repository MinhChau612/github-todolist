import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import './Header.css'


export default function Header() {
    return (


        <nav className="navbar navbar-expand-sm navbar-dark text-primary-emphasis">
            <NavLink className="navbar-brand text-primary-emphasis" to="/">Navbar</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link text-primary-emphasis" to="/" >Home <span className="visually-hidden">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-primary-emphasis" to="/todolist">Todolist</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-primary-emphasis" to="/todolistredux">Todolistredux</NavLink>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

