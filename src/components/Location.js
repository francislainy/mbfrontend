import React, {useEffect, useState} from 'react';
import {getLocations} from "../api";
import LocationRow from "./LocationRow";
import CreateNewLocation from "./CreateNewLocation";

const Location = () => {
    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [locationList, setLocationList] = useState({
        locations: [
            {
                id: "",
                title: "",
                associatedPinyinSound: "",
            }
        ]
    })

    useEffect(() => {
        const loadAll = async () => {
            try {
                getLocations().then(response => setLocationList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm, showSuccessAlert])

    return (
        <div>
            <div className="container">
                <CreateNewLocation
                    setShowForm={setShowForm}
                    showForm={showForm}
                />
                <section className="lists">
                    <LocationRow locations={locationList.locations}
                                 showSuccessAlert={showSuccessAlert}
                                 setShowSuccessAlert={setShowSuccessAlert}/>
                </section>
            </div>
        </div>
    )
}

export default Location;
