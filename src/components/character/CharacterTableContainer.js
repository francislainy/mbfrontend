import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {deleteCharacter} from "../../api";
import CustomAlert from "../CustomAlert";

const CharacterTableContainer = ({characters, showSuccessAlert, setShowSuccessAlert}) => {

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

        deleteCharacter(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Character"}/> : null}
            <div className="movieRow--listarea">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Hanzi</th>
                        <th>Pinyin</th>
                        <th>Meaning</th>
                        <th>Delete character</th>
                    </tr>
                    </thead>
                    {characters.length > 0 && characters.map((character, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}}>
                            <td>{`${character.hanzi}`} </td>
                            <td>{`${character.pinyin}`} </td>
                            <td>{`${character.meaning}`} </td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={(e) => handleDelete(e, `${character.id}`)}/>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default CharacterTableContainer;
