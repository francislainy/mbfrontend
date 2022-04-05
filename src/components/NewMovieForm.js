import React, {useEffect, useState} from 'react';
import DropdownCreateMovie from "./DropdownCreateMovie";
import DropdownCreateMovieUsePropertyTitle from "./DropdownCreateMovieUsePropertyTitle";
import {getActors, getLocations, getRooms} from "../api";

const NewMovieForm = ({ selectActorId, selectedActorId, selectLocationId, selectedLocationId, selectRoomId, selectedRoomId }) => {

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

    return (
        <div>
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
        </div>
    )
}

export default NewMovieForm;
