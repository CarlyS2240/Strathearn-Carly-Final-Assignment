/* Importing Navlink to route to other pages in the website*/
import {
    NavLink
} from "react-router-dom";

import { getAuth, onAuthStateChanged } from 'firebase/auth'; /* Importing auth so we can authenticate users*/
import { useEffect, useState} from 'react'; /*Importing useEffect and useState*/

import { Logout } from "../Logout" /*Importing the Logout component*/

import "./styles.css" /*Linking the stylesheet*/

export const Navbar = () => {

    /*Declaring useState to check if a user is logged into the website*/
    const [user, setUser] = useState(null);

    /*Checking to see if a user is logged into the website so we only show certain items in the navigation bar*/
    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    /*Set the user to true if a user is logged in*/
                    setUser(true);
                } else {
                    /*Set the user to false if a user is not logged in*/
                    setUser(false);
                }
            })
        }, []
    )
    
    /*Creating the navigation bar component from links and a non-functional search bar*/

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