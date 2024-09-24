// Navbar.js
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ show, setShow }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>

                <button type="button" className='bg-dark' onClick={() => setShow(!show)}>
                    {show ? <span className="navbar-toggler-icon"></span> : <span className="navbar-toggler-icon"></span>}
                </button>
            </div>
        </nav>
    );
};

export default memo(Navbar)
