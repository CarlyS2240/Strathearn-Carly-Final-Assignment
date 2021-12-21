import {
    NavLink
} from "react-router-dom";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';

import { Logout } from "../Logout"

import "./styles.css"

export const Navbar = () => {

    const [user, setUser] = useState(null);

    const [show, setShow] = useState(true); 

    const [showProfile, setShowProfile] = useState(true); 

    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(true);
                    setShow(false);
                    setShowProfile(true);
                } else {
                    setUser(false);
                    setShow(true);
                    setShowProfile(false);
                }
            })
        }, []
    )

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <input className="search" type="text" placeholder="Search..."></input>
                </li>
                
                
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/">Home</NavLink>
                </li>
                
                {user==true &&
                    <li>
                        <NavLink activeClassName="nav-selected" to="/me">My Profile</NavLink>
                    </li>
                }

                {user==false &&
                    <li>
                        <NavLink activeClassName="nav-selected" to="/login">Login</NavLink>
                    </li>
                }
                <li>
                    <Logout/>
                </li>
            </ul>
        </nav>
    )
}