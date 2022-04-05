import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Navigation from "./components/Navigation";

function App() {

    return (
        <div>
            <Navigation/>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/movie/:id" exact element={<MovieDetail/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
