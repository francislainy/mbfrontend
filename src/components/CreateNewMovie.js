import React, {useEffect, useState} from 'react';
import '../App.css'
import {createMovie} from "../api"
import {Button} from "react-bootstrap";
import NewMovieForm from "./NewMovieForm";

const CreateNewMovie = ({showForm, setShowForm}) => {
    const [showNewMovieButton, setShowNewMovieButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState(null);
    const [selectedRoomId, selectRoomId] = useState(null);

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
        <div>
            {showSuccessAlert ? getAlert() : null}
            <div>
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
                            <NewMovieForm
                                selectActorId={selectActorId}
                                selectedActorId={selectedActorId}
                                selectedLocationId={selectedLocationId}
                                selectLocationId={selectLocationId}
                                selectRoomId={selectRoomId}
                                selectedRoomId={selectedRoomId}
                            />
                            <div>
                                <button className="btn btn-warning submit-button" type="submit"
                                        onSubmit={() => handleSubmit()}>Send
                                </button>
                            </div>
                        </form>
                    </section> : null
                }
            </div>
        </div>
    )
}

export default CreateNewMovie;
