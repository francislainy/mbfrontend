import React, {useEffect, useState} from 'react';
import './MovieRow.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {deleteMovie} from "../api";

const MovieRow = ({movies}) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                // setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        }
        ,
        []
    );

    const handleDelete = (id) => {
        alert(id)

        const axiosParams = {
            id: id
        }

        deleteMovie(axiosParams)
            .then((response) => {
                // setShowSuccessAlert(true)
                // setShowForm(false)
                setShowSuccessAlert(true)
            })
    }

    function getAlert() {
        return <div className="alert alert-success" role="alert">
            <span>
                <strong>Movie deleted successfully</strong>
            </span>
        </div>;
    }

    return (
        <div>
            {showSuccessAlert ? getAlert() : null}
            <div className="movieRow--listarea">
                <table className="table table-bordered table-dark">
                    <thead>
                    <th>Pinyin</th>
                    <th>Character</th>
                    <th>Meaning</th>
                    <th>Actor</th>
                    <th>Location</th>
                    <th>Room</th>
                    <th>Scene</th>
                    <th>Image Url</th>
                    <th>Delete Movie</th>
                    </thead>
                    {movies.length > 0 && movies.map((movie, key) => (
                        <tbody className="table-light">
                        <tr>
                            <td>{`${movie.character.pinyin}`}</td>
                            <td>{`${movie.character.hanzi}`}</td>
                            <td>{`${movie.character.meaning}`}</td>
                            <td>{`${movie.actor.name}`}</td>
                            <td>{`${movie.location.title}`}</td>
                            <td>{`${movie.room.title}`}</td>
                            <td>{`${movie.scene}`}</td>
                            <td>{`${movie.imageUrl}`}</td>
                            <td><FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(`${movie.id}`)}/></td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default MovieRow;
