import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { HouseDoorFill, CartFill, PersonFill } from 'react-bootstrap-icons'


const MyNavbar = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <div className="container-fluid">
                <div className='d-flex'>
                    <Link className="navbar-brand" to="/"><HouseDoorFill size={"1.5em"} color='black' className='m-2' /></Link>
                    <button className="navbar-toggler " type="button" onClick={toggle} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <Link className="nav-link fw-bold mx-auto" to="/yugioh/cards">Yu-Gi-Oh</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className="nav-link fw-bold mx-auto" to="/pokemon/cards">Pokemon</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className="nav-link fw-bold mx-auto" to="/mtg/cards">Magic</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='d-flex'>
                    {isLoggedIn ? (
                        <ul className="navbar-nav d-flex flex-row">
                            <li className='nav-item my-auto'>
                                <Link className='btn btn-outline-danger fw-bold me-4 px-4' to={"/logout"} style={{ border: "none" }}>Logout</Link>
                            </li>
                            <li className='nav-item my-auto'>
                                <Link className='navbar-brand me-4' to={`/${Cookies.get('username')}`}><PersonFill size={"1.5em"} color='black' className='m-2' /></Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav d-flex flex-row">
                            <li className='nav-item my-auto'>
                                <Link className='btn btn-outline-primary fw-bold me-4 px-4' to={"/login"} style={{ border: "none" }}>Login</Link>
                            </li>
                            <li className='nav-item my-auto'>
                                <Link className='btn btn-outline-success fw-bold me-4 px-4' to={"/register"} style={{ border: "none" }}>Register</Link>
                            </li>
                        </ul>
                    )}
                    <Link className="navbar-brand" to="/cart"><CartFill size={"1.5em"} color='black' className='m-2' /></Link>
                </div>
            </div>
        </nav>
    );
}
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
    <div class="container-fluid">
        <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#">
                    <i class="fas fa-shopping-cart"></i>
                </a>
            </li>
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li class="nav-item me-3 me-lg-0 dropdown">
                <a
                    data-mdb-dropdown-init
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    aria-expanded="false"
                >
                    <i class="fas fa-user"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <a class="dropdown-item" href="#">Action</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
export default MyNavbar;