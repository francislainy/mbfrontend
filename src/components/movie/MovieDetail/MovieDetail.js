import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getActors, getLocations, getMovie, getRooms, updateMovie} from "../../../api";
import {Button} from "react-bootstrap";
import './MovieDetail.css'
import DropdownSelectWithTitle from "../../DropdownSelectWithTitle";
import sample_movie from './sample_movie.jpeg';
import DropdownSelectWithName from "../../DropdownSelectWithName";

const MovieDetail = () => {

    const {id} = useParams();

    const [data, setData] = useState()
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState(null);
    const [selectedRoomId, selectRoomId] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovie(id).then(response => {
                    setData(response.data)
                    selectActorId(response.data.actor.id)
                    selectLocationId(response.data.location.id)
                    selectRoomId(response.data.room.id)
                })
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
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

    const handleSave = (id) => {
        let values = {
            character: {
                id: data.character.id,
                hanzi: data.character.hanzi,
                pinyin: data.character.pinyin,
                meaning: data.character.meaning,
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
            scene: data.scene,
        }

        const axiosParams = {
            id,
            payload: values
        }

        try {
            updateMovie(axiosParams).then(response => setLocationList(response.data))
        } catch (e) {
            console.log(e + "error")
        }
    }

    return (
        <div>
            {data &&
            <div className="container" style={{background: "![](../../../sample_movie.jpeg)"}}>
                <div className="row" style={{marginTop: "15px"}}>
                    <div style={{textAlign: "end"}}>
                        <Button>See on Mandarin Blueprint</Button>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-6">
                                <div style={{marginTop: "60px", alignItems: "center"}}>
                                    <p style={{textAlign: "center", fontSize: "70px"}}>{data.character.pinyin}</p>
                                    <h1 style={{
                                        textAlign: "center",
                                        fontSize: "300px",
                                        marginTop: "-50px"
                                    }}>{data.character.hanzi}</h1>
                                    <textarea rows={4} cols={64}/>
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
                                        onClick={() => handleSave(`${id}`)}>Save</Button>
                                <Button className="btn-danger">Delete Movie</Button>
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
