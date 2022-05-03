import React, {useEffect, useState} from 'react';
import '../../App.css'
import {createActor} from "../../api"
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import CustomAlert from "../CustomAlert";

const CreateNewActor = ({showForm, setShowForm}) => {
    const [showNewActorButton, setShowNewActorButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [error, setError] = useState(false)
    const [selectedFamily, setSelectedFamily] = useState("Select family")

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [showForm, error]
    );

    function handleSubmit(e) {
        e.preventDefault()
        const {name, associatedPinyinSound, imageUrl} = e.target
        let values = {
            name: name.value,
            associatedPinyinSound: associatedPinyinSound.value,
            family: selectedFamily,
            imageUrl: imageUrl.value,
        }

        const axiosParams = {
            payload: values
        }

        createActor(axiosParams)
            .then((response) => {
                setError(false)
                setShowSuccessAlert(true)
                setShowForm(false)
                setShowNewActorButton(true)
            })
            .catch((response) => {
                    setShowSuccessAlert(true)
                    setError(true)
                }
            )
    }

    const handleShowForm = () => {
        setShowForm(true)
        setShowNewActorButton(false)
    }

    const handleHideForm = () => {
        setShowForm(false)
        setShowNewActorButton(true)
    }

    const handleFamilyClick = (e) => {
        setSelectedFamily(e.target.textContent)
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Actor"} action={"created"} error={error}/> : null}
            <div>
                <div className="button-container">
                    {showNewActorButton && <Button className="new-movie-button shadow-none" onClick={handleShowForm}>New
                        Actor</Button>
                    }
                </div>
                {
                    showForm ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={handleHideForm}>X</Button>
                            </div>
                            <h2 style={{color: "#AAA"}}>Create new actor</h2>
                            <div className="row" style={{alignItems: "flex-end"}}>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="name"
                                           placeholder="Name"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <DropdownButton
                                        variant="custom" title={selectedFamily}>
                                        <Dropdown.Item onClick={handleFamilyClick}>FEMALE</Dropdown.Item>
                                        <Dropdown.Item onClick={handleFamilyClick}>MALE</Dropdown.Item>
                                        <Dropdown.Item onClick={handleFamilyClick}>GOD</Dropdown.Item>
                                        <Dropdown.Item onClick={handleFamilyClick}>FICTIONAL</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="associatedPinyinSound"
                                           placeholder="Associated Pinyin Sound"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="imageUrl"
                                           placeholder="Image Url"/>
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

export default CreateNewActor;
