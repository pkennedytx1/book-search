import React from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './style.css';

function Navbar(props) {
    
    return(
        <nav className="navbar navbar-light bg-white">
            <span className="navbar-brand mb-0 h1"><h1 style={{fontSize: "65px", margin: "20px"}}><b>Google Books Search.</b></h1></span>
            <ul style={{margin: "0 20px 0 20px"}} className="nav nav-pills">
                <li className="nav-item">
                    <Link onClick={() => props.handlePageChange("Search")} className={props.currentPage === "Search" ? "nav-link active" : "nav-link"} to="/">Search</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={() => props.handlePageChange("Saved")} className={props.currentPage === "Saved" ? "nav-link active" : "nav-link"} to="/saved">Saved</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;