import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Navigation from "./components/Navigation";
import Location from "./components/Location";
import Room from "./components/Room";
import Actor from "./components/Actor";

function App() {

    return (
        <div>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/movie/:id" exact element={<MovieDetail/>}/>
                    <Route path="/actor" exact element={<Actor/>}/>
                    <Route path="/location" exact element={<Location/>}/>
                    <Route path="/room" exact element={<Room/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
