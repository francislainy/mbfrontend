import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand bg-dark ">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Mandarin Movies</NavLink>
                    <div id="navcol-2" className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">My Movies</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/characters" className="nav-link">Characters</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/actors"} className="nav-link">Actors</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/locations"} className="nav-link">Locations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/rooms"} className="nav-link">Rooms</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Flashcards</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
