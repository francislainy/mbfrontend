import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {deleteMovie, getActors, getLocations, getMovie, getRooms, updateMovie} from "../../../api";
import {Button} from "react-bootstrap";
import './MovieDetail.css'
import DropdownSelectWithTitle from "../../DropdownSelectWithTitle";
import sample_movie from './sample_movie.jpeg';
import DropdownSelectWithName from "../../DropdownSelectWithName";
import CustomAlert from "../../CustomAlert";

const MovieDetail = () => {
    const {id} = useParams();

    let navigate = useNavigate();

    const [movie, setMovie] = useState()
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState(null);
    const [selectedRoomId, selectRoomId] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [action, setAction] = useState()
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [movie]
    );

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                // navigate(`/`)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [isDeleted]
    );

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovie(id).then(response => {
                    setMovie(response.data)
                    selectActorId(response.data.actor.id)
                    selectLocationId(response.data.location.id)
                    selectRoomId(response.data.room.id)
                })
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then();
    }, [])

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
        const loadAll = async () => {
            try {
                getActors().then(response => setActorList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, []);

    useEffect(() => {
        const loadAll = async () => {
            try {
                getLocations().then(response => setLocationList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [])

    useEffect(() => {
        const loadAll = async () => {
            try {
                getRooms().then(response => setRoomList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, []);

    const handleSave = () => {
        let values = {
            character: {
                id: movie.character.id,
                hanzi: movie.character.hanzi,
                pinyin: movie.character.pinyin,
                meaning: movie.character.meaning,
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
            scene: movie.scene,
        }

        const axiosParams = {
            id,
            payload: values
        }

        try {
            updateMovie(axiosParams).then(response => {
                    setMovie(response.data)
                    setShowSuccessAlert(true)
                    setAction("Updated")
                }
            )

        } catch (e) {
            console.log(e + "error")
        }
    }

    const handleDelete = () => {
        const axiosParams = {
            id,
        }

        try {
            deleteMovie(axiosParams).then(() => {
                    setShowSuccessAlert(true)
                    setAction("Deleted")
                    setIsDeleted(true)
                }
            )

        } catch (e) {
            console.log(e + "error")
        }
    }

    return (
        <div>
            {movie &&
            <div className="container" style={{background: "![](../../../sample_movie.jpeg)"}}>
                {showSuccessAlert ? <CustomAlert item={"Movie"} action={action} error={null}/> : null}
                <div className="row" style={{marginTop: "15px"}}>
                    <div style={{textAlign: "end"}}>
                        <Button>See on Mandarin Blueprint</Button>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-6">
                                <div style={{marginTop: "60px", alignItems: "center"}}>
                                    <p style={{textAlign: "center", fontSize: "70px"}}>{movie.character.pinyin}</p>
                                    <h1 style={{
                                        textAlign: "center",
                                        fontSize: "300px",
                                        marginTop: "-50px"
                                    }}>{movie.character.hanzi}</h1>
                                    <textarea rows={4} cols={64}>
                                        {movie.scene}
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-6" style={{marginTop: "170px", width: "30%", height: "100px"}}>
                                <div className="dropdown">
                                    <DropdownSelectWithName
                                        title="actor"
                                        list={actorList.actors}
                                        selectId={selectActorId}
                                        selectedId={selectedActorId}
                                    />
                                </div>
                                <div className="dropdown">
                                    <DropdownSelectWithTitle
                                        title="location"
                                        list={locationList.locations}
                                        selectId={selectLocationId}
                                        selectedId={selectedLocationId}
                                    />
                                </div>
                                <div className="dropdown">
                                    <DropdownSelectWithTitle
                                        title="room"
                                        list={roomList.rooms}
                                        selectId={selectRoomId}
                                        selectedId={selectedRoomId}
                                    />
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                <Button className="btn-primary" style={{marginRight: "56px"}}
                                        onClick={handleSave}>Save</Button>
                                <Button className="btn-danger" onClick={handleDelete}>Delete Movie</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5" style={{marginTop: "150px"}}>
                        <img src={sample_movie} width={"100%"}/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
};


export default MovieDetail;
