import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Movie from "./components/movie/Movie";
import MovieDetail from "./components/movie/MovieDetail/MovieDetail";
import Navigation from "./components/Navigation";
import Location from "./components/location/Location";
import Room from "./components/room/Room";
import Actor from "./components/actor/Actor";
import Character from "./components/character/Character";
import ActorDetail from "./components/actor/ActorDetail";

function App() {
    return (
        <div>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" exact element={<Movie/>}/>
                    <Route path="/movie/:id" exact element={<MovieDetail/>}/>
                    <Route path="/characters" exact element={<Character/>}/>
                    <Route path="/actors" exact element={<Actor/>}/>
                    <Route path="/actor/:id" exact element={<ActorDetail/>}/>
                    <Route path="/locations" exact element={<Location/>}/>
                    <Route path="/rooms" exact element={<Room/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
