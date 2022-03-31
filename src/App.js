import React, {useEffect, useState} from 'react';
import './App.css'
import {getMovies, createMovie} from "./api"
import MovieRow from "./components/MovieRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Button} from "react-bootstrap";

const App = () => {

    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    const [movieList, setMovieList] = useState({
            movies: [
                {
                    actor: {
                        id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
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
    }, [movieList]);

    useEffect(() => { //todo: timeout not closing popup. It works when small number (30)
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowSuccessAlert(false)
        }, 300)

        return () => {
            clearTimeout(timeId)
        }
    }, [movieList]);

    function handleSubmit(e) {
        e.preventDefault()
        const {character, pinyin, meaning, actor, location, room, scene} = e.target
        let values = {
            character: {
                hanzi: character.value,
                pinyin: pinyin.value,
                meaning: meaning.value,
            },
            actor: {
                id: actor.value,
            },
            location: {
                id: location.value,
            },
            room: {
                id: room.value,
            },
            scene: scene.value,
        }

        const axiosParams = {
            payload: values
        }

        createMovie(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
                setShowForm(false)
            })
    }

    function getAlert() {
        return <div className="alert alert-success" role="alert">
            <span>
                <strong>Movie created successfully</strong>
            </span>
        </div>;
    }

    return (
        <div className="page">
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean">
                <div className="container">
                    <a className="navbar-brand" href="#">Mandarin Movies</a>
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
            {showSuccessAlert ? getAlert() : null}
            <div className="container">
                <div className="button-container">
                    <Button className="new-movie-button shadow-none" onClick={() => setShowForm(true)}>New
                        Movie</Button>
                </div>
                {
                    showForm ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={() => setShowForm(false)}>X</Button>
                            </div>
                            <h2 style={{color: "#f5b615"}}>Create new movie</h2>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="character" placeholder="Character"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="pinyin" placeholder="Pinyin"/>
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" name="meaning" placeholder="Meaning"/>
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
                                <button className="btn btn-warning submit-button" type="submit"
                                        onSubmit={() => handleSubmit()}>Send
                                </button>
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
