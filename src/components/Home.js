import React, {useEffect, useState} from 'react';
import '../App.css'
import {createMovie, getActors, getLocations, getMovies, getRooms} from "../api"
import MovieRow from "./MovieRow/MovieRow";
import {Button} from "react-bootstrap";
import DropdownCreateMovie from "./DropdownCreateMovie";
import DropdownCreateMovieUsePropertyTitle from "./DropdownCreateMovieUsePropertyTitle";

const Home = () => {
    const [showForm, setShowForm] = useState(false)
    const [showNewMovieButton, setShowNewMovieButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState(null);
    const [selectedRoomId, selectRoomId] = useState(null);
    const [movieList, setMovieList] = useState({
        movies: [
            {
                actor: {
                    id: "",
                },
                character: {
                    hanzi: "",
                    pinyin: "",
                    meaning: ""
                },
                room: {
                    id: "",
                    title: ""
                },
                scene: "",
                imageUrl: "",
                location: {
                    id: "",
                    title: ""
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
                setShowNewMovieButton(true)
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
                                            title="actor"
                                            list={actorList.actors}
                                            selectId={selectActorId}
                                            selectedId={selectedActorId}
                                        />
                                    </div>
                                    <div className="mb-2 col-4">
                                        <DropdownCreateMovieUsePropertyTitle
                                            title="location"
                                            list={locationList.locations}
                                            selectId={selectLocationId}
                                            selectedId={selectedLocationId}
                                        />
                                    </div>
                                    <div className="mb-2 col-4">
                                        <DropdownCreateMovieUsePropertyTitle
                                            title="room"
                                            list={roomList.rooms}
                                            selectId={selectRoomId}
                                            selectedId={selectedRoomId}
                                        />
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
            </div>
        </div>
    )
}

export default Home;
