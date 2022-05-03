import React, {useEffect} from 'react';
import {deleteActor} from "../../api";
import ActorTable from "./ActorTable";
import {useNavigate} from "react-router-dom";

const ActorTableContainer = ({actors, showSuccessAlert, setShowSuccessAlert}) => {
    let navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`../actor/${id}`)
    }

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

        deleteActor(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <ActorTable
            actors={actors}
            showSuccessAlert={showSuccessAlert}
            handleClick={handleClick}
            handleDelete={handleDelete}/>
    )
}

export default ActorTableContainer;
