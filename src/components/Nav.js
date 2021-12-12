import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
    <>
        <div className="nav">
            <div className="logo">
            <Link to={`/`}>
                <img src="http://localhost:3000/logo_160.png" alt=""/>
            </Link>
            </div>
            <div className="user">
                <i className="fas fa-user"></i>
            </div>
        </div>
        
        <div className="title">Player List</div>
    </>
    );
};

export default Nav;
