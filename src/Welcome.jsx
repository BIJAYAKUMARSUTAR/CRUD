// src/Welcome.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { RxSketchLogo } from "react-icons/rx";
import './Welcome.css'

const Welcome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || JSON.parse(localStorage.getItem("username")); // Default to "Guest" if no username is provided
    
    const handleLogout = () => {
        // Clear any user session or state if needed
        // Example: sessionStorage.removeItem('user'); // Uncomment if you have session storage logic
        navigate("/"); // Navigate back to the login page
        localStorage.removeItem("username")
    };
    useEffect(()=>{
        if(location?.state?.username){
            localStorage.setItem("username",JSON.stringify(location.state))
        }
    })

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">
                <span><span className='logo'><RxSketchLogo/>  <a href="#" class="navbar-brand"><span class="text-danger">D</span>EALSDRAY</a></span></span>
                
                    <NavLink className="navbar-brand" to="/Welcome" >Home</NavLink>
                    <NavLink className="nav-link" to="/EmployeeList">Employee List</NavLink>
                    <NavLink className="nav-link" to="/CreateEmployee">Add Employee</NavLink>
                    <span><h4>{username}<VscAccount/></h4></span>
                    <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
                </div>
            </nav>
            <div>
                <h1>Welcome, {username}!</h1>
            </div>
        </div>
    );
};

export default Welcome;
