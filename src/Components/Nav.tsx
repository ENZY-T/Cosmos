import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props:{name:string, setName:(name:string) => void}) => {

    const logout = async() =>{
        await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        props.setName('')
    }

    let menu;

    if(props.name===undefined || props.name === ''){
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-disabled="true">Login</Link>
                </li>
            </ul>
        )
    }else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-disabled="true" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div>
                    {menu}
                </div>
            </div>
      </nav>
        </div>
    );
};

export default Nav;