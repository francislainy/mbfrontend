import React, {useEffect, useState} from 'react';
import '../../App.css'
import {createActor} from "../../api"
import {Button} from "react-bootstrap";

const CreateNewActor = ({showForm, setShowForm}) => {
    const [showNewActorButton, setShowNewActorButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [showForm]
    );

    function handleSubmit(e) {
        e.preventDefault()
        const {name, associatedPinyinSound, family, imageUrl} = e.target
        let values = {
            name: name.value,
            associatedPinyinSound: associatedPinyinSound.value,
            family: family.value,
            imageUrl: imageUrl.value,
        }

        const axiosParams = {
            payload: values
        }

        createActor(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
                setShowForm(false)
                setShowNewActorButton(true)
            })
    }

    function getAlert() {
        return <div className="alert alert-success" role="alert">
            <span>
                <strong>Actor created successfully</strong>
            </span>
        </div>;
    }

    const handleShowForm = () => {
        setShowForm(true)
        setShowNewActorButton(false)
    }

    const handleHideForm = () => {
        setShowForm(false)
        setShowNewActorButton(true)
    }

    return (
        <div>
            {showSuccessAlert ? getAlert() : null}
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
                            <div className="row">
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="name"
                                           placeholder="Name"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="name"
                                           placeholder="Associated Pinyin Sound"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="name"
                                           placeholder="Family"/>
                                </div>
                                <div className="mb-2 col-2">
                                    <input className="form-control" type="text" name="name"
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