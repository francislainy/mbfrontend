import React, {useEffect, useState} from 'react';
import {getActors} from "../../api";
import LocationTableContainer from "../location/LocationTableContainer";
import CreateNewActor from "./CreateNewActor";
import ActorTableContainer from "./ActorTableContainer";

const Actor = () => {
    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [actorList, setActorList] = useState({
        actors: [
            {
                id: "",
                name: "",
            }
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
    }, [showForm, showSuccessAlert])

    return (
        <div>
            <div className="container">
                <CreateNewActor
                    setShowForm={setShowForm}
                    showForm={showForm}
                />
                <section className="lists">
                    <ActorTableContainer actors={actorList.actors}
                                         showSuccessAlert={showSuccessAlert}
                                         setShowSuccessAlert={setShowSuccessAlert}/>
                </section>
            </div>
        </div>
    )
}

export default Actor;
