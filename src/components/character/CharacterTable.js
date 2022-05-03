import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../CustomAlert";

const CharacterTable = ({characters, showSuccessAlert, handleDelete, handleClick}) => {
    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Character"} action={"deleted"}/> : null}
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
                        <tr style={{cursor: 'pointer'}} onClick={(a) => handleClick(character.movie.id)}>
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

export default CharacterTable;
