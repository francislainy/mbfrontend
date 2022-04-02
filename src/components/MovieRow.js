import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './MovieRow.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {deleteMovie} from "../api";

const MovieRow = ({movies}) => {

    let navigate = useNavigate();

    const handleClick = (event) => {
        // event.stopPropagation() todo: to avoid calling the click method for each individual table cell
        navigate('movie/someid')
    }

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
        [showSuccessAlert]
    );

    const handleDelete = (id) => {
        const axiosParams = {
            id: id
        }

        deleteMovie(axiosParams)
            .then((response) => {
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
                            <td onClick={handleClick}>{`${movie.character.pinyin}`} </td>
                            <td onClick={handleClick}>{`${movie.character.hanzi}`} </td>
                            <td onClick={handleClick}>{`${movie.character.meaning}`} </td>
                            <td onClick={handleClick}>{`${movie.actor.name}`} </td>
                            <td onClick={handleClick}>{`${movie.location.title}`} </td>
                            <td onClick={handleClick}>{`${movie.room.title}`} </td>
                            <td onClick={handleClick}>{`${movie.scene}`} </td>
                            <td onClick={handleClick}>{`${movie.imageUrl}`} </td>
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
