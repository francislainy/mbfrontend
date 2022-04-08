import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {deleteActor} from "../../api";

const ActorRow = ({actors, showSuccessAlert, setShowSuccessAlert}) => {

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

    function getAlert() { //make it into component
        return <div className="alert alert-success" role="alert">
            <span>
                <strong>Actor deleted successfully</strong>
            </span>
        </div>;
    }

    return (
        <div>
            {showSuccessAlert ? getAlert() : null}
            <div className="movieRow--listarea">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Associated Pinyin Sound</th>
                        <th>Family</th>
                        <th>Image Url</th>
                        <th>Delete actor</th>
                    </tr>
                    </thead>
                    {actors.length > 0 && actors.map((actor, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}}>
                            <td>{`${actor.name}`} </td>
                            <td>{`${actor.associatedPinyinSound}`} </td>
                            <td>{`${actor.family}`} </td>
                            <td>{`${actor.imageUrl}`} </td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={(e) => handleDelete(e, `${actor.id}`)}/>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default ActorRow;
