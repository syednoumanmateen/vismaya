// Sidebar.js
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar bg-dark text-light">
            <h2 className="text-center mb-3">
                Vismaya
            </h2>
            <ul className="nav flex-column text-light">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/api">Api</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/forum">Forum</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/group">Group</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/user">User</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default memo(Sidebar)
