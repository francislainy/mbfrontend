import React, {useEffect, useState} from 'react';
import {getRooms} from "../../api";
import CreateNewRoom from "./CreateNewRoom";
import RoomTableContainer from "./RoomTableContainer";

const Room = () => {
    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [roomList, setRoomList] = useState({
        rooms: [
            {
                id: "",
                title: "",
                tone: ""
            }
        ]
    })

    useEffect(() => {
        const loadAll = async () => {
            try {
                getRooms().then(response => setRoomList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm, showSuccessAlert])

    return (
        <div>
            <div className="container">
                <CreateNewRoom
                    setShowForm={setShowForm}
                    showForm={showForm}
                />
                <section className="lists">
                    <RoomTableContainer rooms={roomList.rooms}
                                        showSuccessAlert={showSuccessAlert}
                                        setShowSuccessAlert={setShowSuccessAlert}/>
                </section>
            </div>
        </div>
    )
}

export default Room;
