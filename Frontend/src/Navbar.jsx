import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { HouseDoorFill, CartFill, PersonFill } from 'react-bootstrap-icons'


const MyNavbar = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><HouseDoorFill size={"1.5em"} color='black' className='m-2' /></Link>
            <button className="navbar-toggler" type="button" onClick={toggle} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link fw-bold mx-auto" to="/yugioh/cards">Yu-Gi-Oh</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold mx-auto" to="/pokemon/cards">Pokemon</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold mx-auto" to="/mtg/cards">Magic</Link>
                    </li>
                </ul>
            </div>
            {isLoggedIn ? (
                <div>
                    <Link className='btn btn-danger fw-bold m-2' to={"/logout"}>Logout</Link>
                    <Link className='navbar-brand m-2' to={`/${Cookies.get('username')}`}><PersonFill size={"1.5em"} color='black' className='m-2' /></Link>
                </div>
            ) : (
                <div>
                    <Link className='btn btn-info text-light fw-bold me-4' to={"/register"}>Register</Link>
                    <Link className='btn btn-secondary fw-bold me-4' to={"/login"}>Login</Link>
                </div>
            )}
            <Link className="navbar-brand" to="/cart"><CartFill size={"1.5em"} color='black' className='m-2' /></Link>
        </nav>
    );
}

export default MyNavbar;