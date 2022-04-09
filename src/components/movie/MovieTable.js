import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import CustomAlert from "../CustomAlert";

const MovieTable = ({movies, showSuccessAlert, handleDelete, handleClick}) => {
    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Movie"}/> : null}
            <div className="movieRow--listarea">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Pinyin</th>
                        <th>Character</th>
                        <th>Meaning</th>
                        <th>Actor</th>
                        <th>Location</th>
                        <th>Room</th>
                        <th>Scene</th>
                        <th>Image Url</th>
                        <th></th>
                    </tr>
                    </thead>
                    {movies.length > 0 && movies.map((movie, key) => (
                        <tbody className="table-light">
                        <tr style={{cursor: 'pointer'}} onClick={() => handleClick(`${movie.id}`)}>
                            <td>{`${movie.character.pinyin}`} </td>
                            <td>{`${movie.character.hanzi}`} </td>
                            <td>{`${movie.character.meaning}`} </td>
                            <td>{`${movie.actor.name}`} </td>
                            <td>{`${movie.location.title}`} </td>
                            <td>{`${movie.room.title}`} </td>
                            <td>{`${movie.scene}`} </td>
                            <td>{`${movie.imageUrl}`} </td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={(e) => handleDelete(e, `${movie.id}`)}/>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default MovieTable;
