import React, {useEffect, useState} from 'react';
import '../../App.css'
import {createRoom} from "../../api"
import {Button} from "react-bootstrap";
import CustomAlert from "../CustomAlert";

const CreateNewRoom = ({showForm, setShowForm}) => {
    const [showNewRoomButton, setShowNewRoomButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

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
        const {title} = e.target
        let values = {
            title: title.value,
        }

        const axiosParams = {
            payload: values
        }

        createRoom(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
                setShowForm(false)
                setShowNewRoomButton(true)
            })
    }

    const handleShowForm = () => {
        setShowForm(true)
        setShowNewRoomButton(false)
    }

    const handleHideForm = () => {
        setShowForm(false)
        setShowNewRoomButton(true)
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Room"} action={"created"}/> : null}
            <div>
                <div className="button-container">
                    {showNewRoomButton && <Button className="new-movie-button shadow-none" onClick={handleShowForm}>New
                        Room</Button>
                    }
                </div>
                {
                    showForm ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={handleHideForm}>X</Button>
                            </div>
                            <h2 style={{color: "#AAA"}}>Create new room</h2>
                            <div className="row">
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="title"
                                           placeholder="Title"/>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary submit-button" type="submit"
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

export default CreateNewRoom;
