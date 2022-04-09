import React, {useEffect} from 'react';
import {deleteCharacter} from "../../api";
import CharacterTable from "./CharacterTable";

const CharacterTableContainer = ({characters, showSuccessAlert, setShowSuccessAlert}) => {

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

        deleteCharacter(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <CharacterTable
            characters={characters}
            showSuccessAlert={showSuccessAlert}
            handleDelete={handleDelete}/>
    )
}

export default CharacterTableContainer;
