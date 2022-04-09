import React, {useEffect} from 'react';
import {deleteLocation} from "../../api";
import LocationTable from "./LocationTable";

const LocationTableContainer = ({locations, showSuccessAlert, setShowSuccessAlert}) => {

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [showSuccessAlert]
    );

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [showSuccessAlert])

    const handleDelete = (e, id) => {
        e.stopPropagation();
        const axiosParams = {
            id: id
        }

        deleteLocation(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <LocationTable
            locations={locations}
            showSuccessAlert={showSuccessAlert}
            handleDelete={handleDelete}/>
    )
}

export default LocationTableContainer;
