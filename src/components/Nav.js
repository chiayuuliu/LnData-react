import React from 'react';


const Nav = () => {
    return (
    <>
        <div className="nav">
            <div className="logo">
                <img src="http://localhost:3000/logo_160.png" alt=""/>
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
