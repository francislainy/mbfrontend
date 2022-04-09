import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {deleteLocation} from "../../api";
import CustomAlert from "../CustomAlert";

const LocationTableContainer = ({locations, showSuccessAlert, setShowSuccessAlert}) => {

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

        deleteLocation(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Location"}/> : null}
            <div className="movieRow--listarea">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Pinyin</th>
                        <th>Associated Pinyin Sound</th>
                        <th>Delete location</th>
                    </tr>
                    </thead>
                    {locations.length > 0 && locations.map((location, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}}>
                            <td>{`${location.title}`} </td>
                            <td>{`${location.associatedPinyinSound}`} </td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={(e) => handleDelete(e, `${location.id}`)}/>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default LocationTableContainer;