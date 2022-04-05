import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {

    return (
        <div>
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Mandarin Movies</NavLink>
                    <div id="navcol-2" className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active">My Movies</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/actor"} className="nav-link">Actors</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/location"} className="nav-link">Locations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/room"} className="nav-link">Rooms</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
