import React, {useEffect, useState} from 'react';
import './App.css'
import {getMovies} from "./api"
import MovieRow from "./components/MovieRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Button} from "react-bootstrap";

const App = () => {

    const [show, setShow] = useState(false)

    const [movieList, setMovieList] = useState({
            movies: [
                {
                    actor: {
                        id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                        name: "Shakira"
                    },
                    character: {
                        hanzi: "西",
                        pinyin: "xi",
                        meaning: "West"
                    },
                    room: {
                        id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                        title: "Bedroom"
                    },
                    scene: "Kanye West talking to Shakira outside the front entrance",
                    imageUrl: "anyUrl",
                    location: {
                        id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                        title: "Childhood home"
                    }
                }
            ]
        }
    )

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovies().then(response => setMovieList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, []);

    // function getData(event) {
    //     setData(event.target.value)
    //     console.log(event.target.value)
    // }

    function handleSubmit(e) {
        e.preventDefault()
        const {character, pinyin, actor, location, room, scene} = e.target
        console.log({
            character: character.value,
            pinyin: pinyin.value,
            actor: actor.value,
            location: location.value,
            room: room.value,
            scene: scene
        })
    }

    return (
        <div className="page">
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean">
                <div className="container">
                    <a className="navbar-brand" href="#">Mandarim Movies</a>
                    <div id="navcol-2" className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active">My Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Actors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Locations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Rooms</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="button-container">
                    <Button className="new-movie-button shadow-none" onClick={() => setShow(true)}>New Movie</Button>
                </div>
                {
                    show ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <h2>Create new movie</h2>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="character" placeholder="Character"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="pinyin" placeholder="Pinyin"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="actor" placeholder="Actor"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="location" placeholder="Location"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="room" placeholder="Room"/>
                            </div>
                            <div className="mb-2">
                                <textarea className="form-control" name="scene" placeholder="Scene"
                                          rows="14"></textarea>
                            </div>
                            <div>
                                <button className="btn btn-warning submit-button" type="submit">Send</button>
                            </div>
                        </form>
                    </section> : null
                }
                <section className="lists">
                    <MovieRow movies={movieList.movies}/>
                </section>
            </div>
        </div>
    )
}

export default App;
