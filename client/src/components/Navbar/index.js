import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style.css';

function Navbar() {
    return(
        <nav className="navbar navbar-light bg-white">
            <span className="navbar-brand mb-0 h1"><h1 style={{fontSize: "65px", margin: "20px"}}><b>Google Books Search.</b></h1></span>
            <ul style={{margin: "0 20px 0 20px"}} className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/saved">Saved</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;