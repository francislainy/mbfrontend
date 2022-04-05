import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {deleteRoom} from "../api";

const RoomRow = ({rooms, showSuccessAlert, setShowSuccessAlert}) => {

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
        <div>
            {showSuccessAlert ? getAlert() : null}
            <div className="movieRow--listarea">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Pinyin</th>
                        <th>Delete room</th>
                    </tr>
                    </thead>
                    {rooms.length > 0 && rooms.map((room, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}}>
                            <td>{`${room.title}`} </td>
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

export default RoomRow;
