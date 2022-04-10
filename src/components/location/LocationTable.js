import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../CustomAlert";

const LocationTable = ({locations, showSuccessAlert, handleDelete}) => {
    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Location"} action={"deleted"}/> : null}
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

export default LocationTable;
