import React, {useEffect, useState} from 'react';
import './App.css'
import {createMovie, getActors, getLocations, getMovies, getRooms} from "./api"
import MovieRow from "./components/MovieRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import DropdownCreateMovie from "./components/DropdownCreateMovie";

const App = () => {
    const [showForm, setShowForm] = useState(false)
    const [showNewMovieButton, setShowNewMovieButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState();
    const [selectedRoomId, selectRoomId] = useState();
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
    })

    const [actorList, setActorList] = useState({
        actors: [
            {
                id: '',
                name: ''
            },
        ]
    })

    const [locationList, setLocationList] = useState({
        locations: [
            {
                id: '',
                title: ''
            },
        ]
    })

    const [roomList, setRoomList] = useState({
        rooms: [
            {
                id: '',
                title: ''
            },
        ]
    })

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        }
        ,
        [showForm]
    );

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovies().then(response => setMovieList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm]);

    useEffect(() => {
        const loadAll = async () => {
            try {
                getActors().then(response => setActorList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm]);

    useEffect(() => {
        const loadAll = async () => {
            try {
                getLocations().then(response => setLocationList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm])

    useEffect(() => {
        const loadAll = async () => {
            try {
                getRooms().then(response => setRoomList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm]);

    function handleSubmit(e) {
        e.preventDefault()
        const {character, pinyin, meaning, scene} = e.target
        let values = {
            character: {
                hanzi: character.value,
                pinyin: pinyin.value,
                meaning: meaning.value,
            },
            actor: {
                id: selectedActorId,
            },
            location: {
                id: selectedLocationId,
            },
            room: {
                id: selectedRoomId,
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

    const handleShowForm = () => {
        setShowForm(true)
        setShowNewMovieButton(false)
    }

    const handleHideForm = () => {
        setShowForm(false)
        setShowNewMovieButton(true)
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
                    {showNewMovieButton && <Button className="new-movie-button shadow-none" onClick={handleShowForm}>New
                        Movie</Button>
                    }
                </div>
                {
                    showForm ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={handleHideForm}>X</Button>
                            </div>
                            <h2 style={{color: "#f5b615"}}>Create new movie</h2>
                            <div className="a">
                                <div className="row">
                                    <div className="mb-2 col-2">
                                        <input className="form-control" type="text" name="character"
                                               placeholder="Character"/>
                                    </div>
                                    <div className="mb-2 col-2">
                                        <input className="form-control" type="text" name="pinyin" placeholder="Pinyin"/>
                                    </div>
                                    <div className="mb-2 col-8">
                                        <input className="form-control" type="text" name="meaning"
                                               placeholder="Meaning"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-2 col-4">
                                        <DropdownCreateMovie
                                            actors={actorList.actors}
                                            selectActorId={selectActorId}
                                            selectedActorId={selectedActorId}
                                        />
                                    </div>
                                    <div className="mb-2 col-4">
                                        <DropdownButton variant="success"
                                                        title={
                                                            selectedLocationId
                                                                ? locationList.locations.find((location) => location.id === selectedLocationId).title
                                                                : "Select location"
                                                        }
                                                        onSelect={(eventKey) => selectLocationId(eventKey)}>
                                            {locationList.locations.map((location, index) => {
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        eventKey={location.id}
                                                        active={location.id === selectedLocationId}>
                                                        {location.title}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                        </DropdownButton>
                                    </div>
                                    <div className="mb-2 col-4">
                                        <DropdownButton variant="success"
                                                        title={
                                                            selectedRoomId
                                                                ? roomList.rooms.find((room) => room.id === selectedRoomId).title
                                                                : "Select room"
                                                        }
                                                        onSelect={(eventKey) => selectRoomId(eventKey)}>
                                            {roomList.rooms.map((room, index) => {
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        eventKey={room.id}
                                                        active={room.id === selectedRoomId}>
                                                        {room.title}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                        </DropdownButton>
                                    </div>
                                </div>
                                <div className="mb-2 col-12">
                                <textarea className="form-control" name="scene" placeholder="Scene"
                                          rows="14"></textarea>
                                </div>
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

                <p>Actor id</p>
                <p>{selectedActorId} + "id"</p>
            </div>
        </div>
    )
}

export default App;
