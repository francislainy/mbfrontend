import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../CustomAlert";

const RoomTable = ({rooms, showSuccessAlert, handleDelete}) => {
    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Room"}/> : null}
            <div className="movieRow--listarea">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Tone</th>
                        <th>Delete room</th>
                    </tr>
                    </thead>
                    {rooms.length > 0 && rooms.map((room, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}}>
                            <td>{`${room.title}`} </td>
                            <td>{`${room.tone}`} </td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={(e) => handleDelete(e, `${room.id}`)}/>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default RoomTable;
