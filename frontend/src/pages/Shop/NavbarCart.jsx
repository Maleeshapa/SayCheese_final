import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/Say Cheese 2.png';
import './Cart';
import { FaCartShopping } from "react-icons/fa6";

function NavbarCart() {
    return (

        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="navbar-brand" to="/"> <img src={logo} width="120" height="60" alt='logo' /> </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Category">Category</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link " to="/Gallery" tabindex="-1" aria-disabled="true">Gallery</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Booking">Booking</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/About">About</NavLink>
                        </li>


                    </ul>
                    <form className="d-flex">
                        <div className="me-3 mt-1">
                            <Link to="/Cart"> <FaCartShopping size={35} /> </Link>
                        </div>
                        
                    </form>

                </div>
            </div>
        </nav>
    );
}

export default NavbarCart;
