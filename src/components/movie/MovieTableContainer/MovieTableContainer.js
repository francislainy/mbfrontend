import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import './MovieTableContainer.css';
import {deleteMovie} from "../../../api";
import MovieTable from "../MovieTable";

const MovieTableContainer = ({movies, showSuccessAlert, setShowSuccessAlert}) => {

    let navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`movie/${id}`)
    }

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

        deleteMovie(axiosParams)
            .then((response) => {
                setShowSuccessAlert(true)
            })
    }

    return (
        <MovieTable
            movies={movies}
            showSuccessAlert={showSuccessAlert}
            handleClick={handleClick}
            handleDelete={handleDelete}/>
    )
}

export default MovieTableContainer;
