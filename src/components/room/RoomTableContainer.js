import React, {useEffect} from 'react';
import {deleteRoom} from "../../api";
import RoomTable from "./RoomTable";

const RoomTableContainer = ({rooms, showSuccessAlert, setShowSuccessAlert}) => {

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

        deleteRoom(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    function getAlert() { //make it into component
        return <div className="alert alert-success" role="alert">
            <span>
                <strong>Room deleted successfully</strong>
            </span>
        </div>;
    }

    return (
        <RoomTable
            rooms={rooms}
            showSuccessAlert={showSuccessAlert}
            handleDelete={handleDelete}/>
    )
}

export default RoomTableContainer;
