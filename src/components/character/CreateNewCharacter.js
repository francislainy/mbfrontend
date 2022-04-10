import React, {useEffect, useState} from 'react';
import '../../App.css'
import {createCharacter} from "../../api"
import {Button} from "react-bootstrap";
import CustomAlert from "../CustomAlert";

const CreateNewCharacter = ({showForm, setShowForm}) => {
    const [showNewCharacterButton, setShowNewCharacterButton] = useState(true)
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
        const {hanzi, pinyin, meaning} = e.target
        let values = {
            hanzi: hanzi.value,
            pinyin: pinyin.value,
            meaning: meaning.value
        }

        const axiosParams = {
            payload: values
        }

        createCharacter(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
                setShowForm(false)
                setShowNewCharacterButton(true)
            })
    }

    const handleShowForm = () => {
        setShowForm(true)
        setShowNewCharacterButton(false)
    }

    const handleHideForm = () => {
        setShowForm(false)
        setShowNewCharacterButton(true)
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Character"} action={"created"}/> : null}
            <div>
                <div className="button-container">
                    {showNewCharacterButton &&
                    <Button className="new-movie-button shadow-none" onClick={handleShowForm}>New
                        Character</Button>
                    }
                </div>
                {
                    showForm ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={handleHideForm}>X</Button>
                            </div>
                            <h2 style={{color: "#AAA"}}>Create new character</h2>
                            <div className="row">
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="hanzi"
                                           placeholder="Hanzi"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="pinyin"
                                           placeholder="Pinyin"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="meaning"
                                           placeholder="Meaning"/>
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

export default CreateNewCharacter;
