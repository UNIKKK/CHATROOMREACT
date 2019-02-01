import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <div>
            <button className="app__button"><Link to={"/"}>Index</Link></button>
            <button className="app__button" ><Link to={"/about"}>About</Link>
            </button>
        </div>
    )
};

export default Nav