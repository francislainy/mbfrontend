import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../CustomAlert";

const ActorTable = ({actors, showSuccessAlert, handleDelete}) => {
    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Actor"} action={"deleted"}/> : null}
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

export default ActorTable;
